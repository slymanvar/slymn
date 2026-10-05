(() => {
  const video=document.querySelector('video[data-film]');if(!video)return;
  const product=video.dataset.film,supported=['en','tr','de','fr','es','it','ja','ko'];
  let saved;try{saved=localStorage.getItem('slymnLang')}catch{}
  let lang=[new URLSearchParams(location.search).get('lang'),saved,...(navigator.languages||[navigator.language])].map(v=>String(v||'').toLowerCase().split(/[-_]/)[0]).find(v=>supported.includes(v))||'en';
  let content,active=-1;
  const filmLabels={en:['Watch the introduction','Silent design preview. These illustrations are not a recording of the working app.'],tr:['Tanıtımı izle','Sessiz tasarım önizlemesi. Bu görseller çalışan uygulamanın ekran kaydı değildir.'],de:['Einführung ansehen','Stumme Designvorschau. Diese Bilder sind keine Bildschirmaufnahme der laufenden App.'],fr:['Voir la présentation','Aperçu du design sans son. Ces illustrations ne sont pas un enregistrement de l’app en fonctionnement.'],es:['Ver la presentación','Vista previa del diseño sin sonido. No es una grabación de la app en funcionamiento.'],it:['Guarda la presentazione','Anteprima del design senza audio. Non è una registrazione dell’app in funzione.'],ja:['紹介動画を見る','音声のないデザインプレビューです。動作中のアプリの画面録画ではありません。'],ko:['소개 영상 보기','소리 없는 디자인 미리보기입니다. 작동 중인 앱의 화면 녹화가 아닙니다.']};
  function apply(){
    if(!content)return;const copy=content[lang]||content.en;
    document.querySelectorAll('[data-film-label]').forEach(el=>el.textContent=filmLabels[lang][Number(el.dataset.filmLabel)]);
    const old=video.querySelector('track');if(old)old.remove();
    const track=document.createElement('track');track.kind='captions';track.srclang=lang;track.label=document.querySelector('#language option[value="'+lang+'"]')?.textContent||lang;track.src='assets/'+product+'/'+lang+'.vtt';track.default=true;
    track.addEventListener('load',()=>{for(const t of video.textTracks)t.mode=t===track.track?'showing':'disabled'});video.append(track);track.track.mode='showing';
    const chapters=document.getElementById('filmChapters');if(chapters){chapters.replaceChildren(...copy.features.map(([title],i)=>{const b=document.createElement('button');b.type='button';b.textContent=title;b.setAttribute('aria-controls',video.id);b.addEventListener('click',()=>{video.currentTime=i*4+.35;video.play().catch(()=>{})});return b}));active=-1;update()}
  }
  function update(){const i=Math.min((content?.[lang]||content?.en)?.features.length-1,Math.floor(video.currentTime/4));if(i===active)return;active=i;document.querySelectorAll('#filmChapters button').forEach((b,j)=>b.setAttribute('aria-current',String(i===j)))}
  video.addEventListener('timeupdate',update);
  window.addEventListener('slymn:language',e=>{lang=supported.includes(e.detail)?e.detail:'en';apply()});
  fetch('assets/'+product+'/content.json').then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json()}).then(data=>{content=data;apply()}).catch(()=>{});
})();
