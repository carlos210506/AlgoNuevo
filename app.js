(()=>{'use strict';const routes=['inicio','atlas','estrellas','notas','recuerdos','carta'];const frame=document.getElementById('page-frame');const nav=document.querySelectorAll('[data-nav]');const menu=document.getElementById('mobile-nav');const menuBtn=document.getElementById('menu-btn');let current='inicio';function route(){const name=decodeURIComponent(location.hash.slice(1))||'inicio';const page=routes.includes(name)?name:'inicio';nav.forEach(a=>a.classList.toggle('active',a.dataset.nav===page));document.title=(page==='inicio'?'Un universo para Ana':({atlas:'El atlas',estrellas:'Tu constelación',notas:'Notas para Ana',recuerdos:'Álbum de recuerdos',carta:'Una carta para Ana'})[page])+' ♡';if(page!==current||!frame.src.endsWith('/'+page+'.html')){current=page;frame.style.minHeight='600px';frame.src='pages/'+page+'.html';window.scrollTo({top:0,behavior:'instant'})}menu.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}window.addEventListener('hashchange',route);window.addEventListener('message',e=>{if(e.source!==frame.contentWindow||!e.data||!String(e.data.type).startsWith('ana:'))return;if(e.data.type==='ana:height'){const value=Math.max(450,Math.min(12000,Number(e.data.value)||600));frame.style.height=value+'px'}if(e.data.type==='ana:go'&&routes.includes(e.data.page))location.hash=e.data.page});menuBtn.addEventListener('click',()=>{const v=menu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(v))});route();
// Reproductor SoundCloud persistente: no se recarga al navegar entre páginas.
const sheet=document.getElementById('player-sheet');
const notice=document.getElementById('notice');
const musicBtn=document.getElementById('music-play');
const soundFrame=document.getElementById('soundcloud-player');
let widget=null, playing=false;
function updateButton(){musicBtn.textContent=playing?'Ⅱ':'♫';musicBtn.setAttribute('aria-label',playing?'Pausar Pied Piper':'Reproducir Pied Piper');musicBtn.title=playing?'Pausar Pied Piper':'Reproducir Pied Piper';}
function showPlayer(){sheet.hidden=false;}
if(window.SC && window.SC.Widget){
  widget=window.SC.Widget(soundFrame);
  widget.bind(window.SC.Widget.Events.PLAY,()=>{playing=true;updateButton();notice.classList.remove('show')});
  widget.bind(window.SC.Widget.Events.PAUSE,()=>{playing=false;updateButton()});
  widget.bind(window.SC.Widget.Events.FINISH,()=>{playing=false;updateButton()});
  widget.bind(window.SC.Widget.Events.ERROR,()=>{playing=false;updateButton();showPlayer()});
}
musicBtn.addEventListener('click',()=>{
  if(widget){if(playing)widget.pause();else widget.play();}
  else showPlayer();
});
document.getElementById('music-toggle').addEventListener('click',()=>{sheet.hidden=!sheet.hidden});
document.getElementById('close-sheet').addEventListener('click',()=>{sheet.hidden=true});
window.addEventListener('load',()=>{
 notice.classList.add('show');setTimeout(()=>notice.classList.remove('show'),6500);
});
})();
