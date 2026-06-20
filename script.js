const header=document.getElementById('header');const burger=document.getElementById('burger');const nav=document.querySelector('.nav');window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40));burger?.addEventListener('click',()=>nav.classList.toggle('open'));
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.addEventListener('mousemove',e=>{const art=document.querySelector('.hero-art');if(!art)return;const x=(e.clientX/window.innerWidth-.5)*18;const y=(e.clientY/window.innerHeight-.5)*-18;art.style.transform=`rotateY(${x/3}deg) rotateX(${y/3}deg)`});

const calculators=document.querySelectorAll('[data-calculator]');
const calcData={
  type:{keychain:{base:6,label:'Брелок',icon:'◆'},magnet:{base:5,label:'Магнит',icon:'●'},medal:{base:18,label:'Медаль',icon:'◎'},stand:{base:22,label:'Подставка',icon:'▰'},organizer:{base:32,label:'Органайзер',icon:'▣'},figurine:{base:45,label:'Статуэтка',icon:'♜'}},
  material:{pla:1,petg:1.18,abs:1.28,carbon:1.65,wood:1.45},
  size:{small:1,medium:1.55,large:2.25,xl:3.4}
};
function formatBYN(n){return Math.max(20,Math.round(n/5)*5).toLocaleString('ru-RU')}
calculators.forEach(calc=>{
  const fields=calc.querySelectorAll('[data-field]');
  const price=calc.querySelector('[data-price]');
  const days=calc.querySelector('[data-days]');
  const label=calc.querySelector('[data-product-label]');
  const visual=calc.querySelector('[data-visual]');
  const result=calc.querySelector('.calc-result');
  const submit=calc.querySelector('.calc-submit');
  function update(){
    const type=calc.querySelector('[data-field="type"]').value;
    const material=calc.querySelector('[data-field="material"]').value;
    const size=calc.querySelector('[data-field="size"]').value;
    const qty=Math.min(1000,Math.max(1,Number(calc.querySelector('[data-field="qty"]').value)||1));
    const paint=calc.querySelector('[data-field="paint"]').checked?2.5*qty:0;
    const logo=calc.querySelector('[data-field="logo"]').checked?1.2*qty+35:0;
    const pack=calc.querySelector('[data-field="pack"]').checked?3*qty:0;
    const discount=qty>=500?.62:qty>=250?.7:qty>=100?.8:qty>=50?.88:1;
    const total=(calcData.type[type].base*calcData.material[material]*calcData.size[size]*qty*discount)+paint+logo+pack;
    price.textContent=formatBYN(total);
    days.textContent=qty>500?'10–14 дней':qty>150?'7–10 дней':'5–7 дней';
    label.textContent=calcData.type[type].label;
    visual.textContent=calcData.type[type].icon;
    submit.href='mailto:andrew.buka90@gmail.com?subject='+encodeURIComponent('Запрос КП Printastic')+'&body='+encodeURIComponent(`Здравствуйте! Прошу подготовить КП.\nТип: ${calcData.type[type].label}\nМатериал: ${material.toUpperCase()}\nРазмер: ${calc.querySelector('[data-field="size"] option:checked').textContent}\nКоличество: ${qty}\nОриентировочная стоимость: ${formatBYN(total)} BYN`);
    result.classList.remove('flash'); void result.offsetWidth; result.classList.add('flash');
  }
  fields.forEach(f=>f.addEventListener('input',update));
  update();
});
