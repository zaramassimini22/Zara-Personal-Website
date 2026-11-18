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

// Industrial Design: open project cards in a pop-up
const modals=document.querySelectorAll('.proj-modal');
if(modals.length){
  const miniModal=document.getElementById('mini-modal');
  const openModal=(id,card)=>{
    let dlg=document.getElementById(id);
    if(!(dlg instanceof HTMLDialogElement)){
      card=card||document.querySelector(`a.mini[href="#${id}"]`);
      if(!card||!miniModal) return false;
      miniModal.querySelector('.num').textContent=card.querySelector('.cat').textContent;
      miniModal.querySelector('h2').textContent=card.querySelector('.t').textContent;
      const src=card.querySelector('img'), img=miniModal.querySelector('.proj-cover img');
      img.src=src.src; img.alt=src.alt;
      miniModal.querySelector('.lead').textContent=card.querySelector('.d').textContent;
      dlg=miniModal;
    }
    if(!dlg.open) dlg.showModal();
    dlg.scrollTop=0;
    dlg.querySelectorAll('video').forEach(v=>v.play().catch(()=>{}));
    history.replaceState(null,'',`#${id}`);
    return true;
  };
  document.querySelectorAll('a.mini[href^="#"]').forEach(card=>card.addEventListener('click',e=>{
    if(openModal(card.getAttribute('href').slice(1),card)) e.preventDefault();
  }));
  modals.forEach(dlg=>{
    dlg.querySelector('.modal-close').addEventListener('click',()=>dlg.close());
    dlg.addEventListener('click',e=>{ if(e.target===dlg) dlg.close(); });
    dlg.addEventListener('close',()=>{
      dlg.querySelectorAll('video').forEach(v=>v.pause());
      history.replaceState(null,'',location.pathname+location.search);
    });
  });
  // Links from the home page (e.g. work.html#adracard) open that project
  if(location.hash) openModal(decodeURIComponent(location.hash.slice(1)));
}
