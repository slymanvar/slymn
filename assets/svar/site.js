(() => {
  const supported=['en','tr','de','fr','es','it','ja','ko'];
  let saved;try{saved=localStorage.getItem('slymnLang')}catch{}
  const normalise=v=>String(v||'').toLowerCase().split(/[-_]/)[0];
  let lang=[new URLSearchParams(location.search).get('lang'),saved,...(navigator.languages||[navigator.language])].map(normalise).find(v=>supported.includes(v))||'en';
  const select=document.getElementById('language');
  fetch('assets/svar/content.json').then(r=>{if(!r.ok)throw Error('Content unavailable');return r.json()}).then(all=>{
    function apply(){
      const copy=all[lang]||all.en;document.documentElement.lang=lang;if(select)select.value=lang;
      document.querySelectorAll('[data-ui]').forEach(el=>el.textContent=copy.ui[Number(el.dataset.ui)]);
      document.querySelectorAll('[data-feature-title]').forEach(el=>el.textContent=copy.features[Number(el.dataset.featureTitle)][0]);
      document.querySelectorAll('[data-feature-description]').forEach(el=>el.textContent=copy.features[Number(el.dataset.featureDescription)][1]);
      const questions=document.getElementById('questions');if(questions){questions.replaceChildren(...copy.faq.map(([q,a])=>{const d=document.createElement('details'),s=document.createElement('summary'),p=document.createElement('p');s.textContent=q;p.textContent=a;d.append(s,p);return d}))}
      const page=document.body.dataset.svarPage,legal=document.getElementById('legalSections');
      if(legal&&copy[page])legal.replaceChildren(...copy[page].map(([h,t])=>{const s=document.createElement('section'),title=document.createElement('h2'),p=document.createElement('p');title.textContent=h;p.textContent=t;s.append(title,p);return s}));
      const titles={about:0,support:7,privacy:8,terms:9};document.title='SVAR — '+copy.ui[titles[page]||0]+' · SLYMN';
      document.querySelectorAll('a').forEach(a=>{const raw=a.getAttribute('href');if(!raw||!/^svar(?:-(support|privacy|terms))?\.html(?:\?|$)/.test(raw))return;const u=new URL(raw,location.href);u.searchParams.set('lang',lang);a.href=u.pathname.split('/').pop()+u.search+u.hash});
      window.dispatchEvent(new CustomEvent('slymn:language',{detail:lang}));
    }
    apply();if(select)select.addEventListener('change',()=>{lang=supported.includes(select.value)?select.value:'en';try{localStorage.setItem('slymnLang',lang)}catch{}const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);apply()});
  }).catch(()=>{if(select){select.value='en';select.disabled=true}});
})();
