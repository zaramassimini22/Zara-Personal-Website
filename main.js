// Scroll reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }});
},{threshold:.12, rootMargin:'0px 0px -8% 0px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Count-up stats
const countEls = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el=e.target, target=parseFloat(el.dataset.count), suf=el.dataset.suffix||'';
    let cur=0, step=target/45;
    const tick=()=>{ cur+=step; if(cur>=target){el.textContent=target+suf;} else {el.textContent=Math.floor(cur)+suf; requestAnimationFrame(tick);} };
    tick(); cio.unobserve(el);
  });
},{threshold:.5});
countEls.forEach(el=>cio.observe(el));

// Mobile nav
const burger=document.querySelector('.burger');
const links=document.querySelector('.nav-links');
if(burger){ burger.addEventListener('click',()=>links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open'))); }
