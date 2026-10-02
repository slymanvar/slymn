(() => {
  const supported=['en','tr','de','fr','es','it','ja','ko'];
  function match(value){const base=String(value||'').toLowerCase().split('-')[0];return supported.includes(base)?base:null;}
  function choose(query,saved,browser){return match(query)||match(saved)||(browser||[]).map(match).find(Boolean)||'en';}
  window.SVRL={choose};
  let dictionary={},language='en',step=-1,captionURL;
  const get=(key)=>key.split('.').reduce((value,k)=>value?.[k],dictionary[language]);
  const t=(key)=>get(key)??key.split('.').reduce((v,k)=>v?.[k],dictionary.en)??key;
  const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value;};
  function guide(){
    if(!document.getElementById('storyImage'))return;
    const index=Math.max(step,0);
    set('storyCount',step<0?'8':`${step+1} / 8`);
    set('storyTitle',step<0?t('guide'):t(`steps.${index}.0`));
    set('storyText',step<0?t('guideLead'):t(`steps.${index}.1`));
    const image=document.getElementById('storyImage');image.src=`assets/neutral-${index+1}.webp`;image.alt=t(`steps.${index}.0`);
    set('next',step<0?t('start'):step===7?t('restart'):t('next'));
    document.getElementById('back').hidden=step<=0;
  }
  function caption(){const video=document.getElementById('introVideo');if(!video)return;const i=Math.min(7,Math.max(0,Math.floor(video.currentTime/3)));set('videoCaption',t(`steps.${i}.0`)+' '+t(`steps.${i}.1`));}
  function tracks(){
    const video=document.getElementById('introVideo');if(!video)return;
    video.querySelectorAll('track').forEach(el=>el.remove());
    if(captionURL)URL.revokeObjectURL(captionURL);
    const time=seconds=>`00:00:${String(seconds).padStart(2,'0')}.000`;
    let vtt='WEBVTT\n\n';
    for(let i=0;i<8;i++)vtt+=`${i+1}\n${time(i*3)} --> ${time((i+1)*3)}\n${t(`steps.${i}.0`)}\n${t(`steps.${i}.1`)}\n\n`;
    captionURL=URL.createObjectURL(new Blob([vtt],{type:'text/vtt'}));
    const track=document.createElement('track');track.kind='subtitles';track.srclang=language;track.label=dictionary[language].name;track.default=true;track.src=captionURL;video.append(track);
    track.addEventListener('load',()=>{track.track.mode='showing';});caption();
  }
  function apply(next){
    language=next;document.documentElement.lang=language;
    document.querySelectorAll('[data-i18n]').forEach(el=>{el.textContent=t(el.dataset.i18n);});
    document.querySelectorAll('[data-i18n-alt]').forEach(el=>{el.alt=t(el.dataset.i18nAlt);});
    const select=document.getElementById('language');if(select){select.value=language;select.setAttribute('aria-label',t('nav.2'));}
    document.querySelectorAll('a[href]').forEach(a=>{const raw=a.getAttribute('href');if(raw.startsWith('#')||raw.startsWith('mailto:')||raw.startsWith('https:'))return;const url=new URL(raw,location.href);url.searchParams.set('lang',language);a.setAttribute('href',url.pathname.split('/').pop()+url.search+url.hash);});
    const page=document.body.dataset.page;document.title=(page==='product'?'SVRL PDF Scanner':t(page==='support'?'nav.1':page))+' — SLYMN';
    guide();tracks();document.documentElement.dataset.ready='true';window.SVRL.language=language;
  }
  fetch('assets/locales.json').then(response=>{if(!response.ok)throw Error('Translation file unavailable');return response.json();}).then(data=>{
    dictionary=data;let saved;try{saved=localStorage.getItem('svrl-language');}catch{}
    apply(choose(new URLSearchParams(location.search).get('lang'),saved,navigator.languages||[navigator.language]));
    document.getElementById('language')?.addEventListener('change',e=>{const value=match(e.target.value)||'en';try{localStorage.setItem('svrl-language',value);}catch{}apply(value);const url=new URL(location.href);url.searchParams.set('lang',value);history.replaceState(null,'',url);});
    document.getElementById('next')?.addEventListener('click',()=>{step=step===7?0:step+1;guide();});
    document.getElementById('back')?.addEventListener('click',()=>{if(step>0){step--;guide();}});
    document.getElementById('introVideo')?.addEventListener('timeupdate',caption);
    window.SVRL.apply=apply;
  }).catch(()=>{document.documentElement.dataset.ready='true';const notice=document.getElementById('languageError');if(notice)notice.hidden=false;});
  document.getElementById('feedbackForm')?.addEventListener('submit',e=>{
    e.preventDefault();const types=['Review','Question','Feature request','Bug report'];const type=types[Number(document.getElementById('kind').value)]||types[0];
    const url=new URL('https://github.com/slymanvar/slymn/issues/new');url.searchParams.set('title','[SVRL '+type+'] '+document.getElementById('subject').value.trim());url.searchParams.set('body',document.getElementById('message').value.trim());location.assign(url.toString());
  });
})();
