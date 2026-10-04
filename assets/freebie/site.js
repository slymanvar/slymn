(() => {
  const supported = ['en','tr','de','fr','es','it','ja','ko'];
  const languageNames = {en:'Language',tr:'Dil',de:'Sprache',fr:'Langue',es:'Idioma',it:'Lingua',ja:'言語',ko:'언어'};
  const normalise = value => String(value || '').toLowerCase().split(/[-_]/)[0];
  let saved; try { saved = localStorage.getItem('slymnLang'); } catch {}
  const requested = new URLSearchParams(location.search).get('lang');
  const candidates = [requested,saved,...(navigator.languages || [navigator.language])].map(normalise);
  let lang = candidates.find(candidate => supported.includes(candidate)) || 'en';
  const select = document.getElementById('language');
  if(select) { select.value = lang; select.setAttribute('aria-label',languageNames[lang]); }
  const localLink = link => {
    const raw = link.getAttribute('href');
    if (!raw || !/^freebie(?:-(privacy|terms|support))?\.html(?:\?|$)/.test(raw)) return;
    const url = new URL(raw,location.href); url.searchParams.set('lang',lang);
    link.setAttribute('href',url.pathname.split('/').pop()+url.search+url.hash);
  };
  fetch('assets/freebie/content.json').then(response => {
    if(!response.ok) throw new Error('Content unavailable');
    return response.json();
  }).then(content => {
    const apply = () => {
      const copy = content[lang] || content.en;
      const page = document.body.dataset.freebiePage;
      if(page) document.documentElement.lang = lang;
      document.querySelectorAll('[data-label]').forEach(el => el.textContent = copy.labels[Number(el.dataset.label)]);
      document.querySelectorAll('[data-freebie-copy]').forEach(el => el.textContent = copy[el.dataset.freebieCopy]);
      document.querySelectorAll('[data-feature-title]').forEach(el => el.textContent = copy.features[Number(el.dataset.featureTitle)][0]);
      document.querySelectorAll('[data-feature-description]').forEach(el => el.textContent = copy.features[Number(el.dataset.featureDescription)][1]);
      document.querySelectorAll('[data-freebie-lead]').forEach(el => el.textContent = copy.lead);
      document.querySelectorAll('[data-freebie-soon]').forEach(el => el.textContent = copy.labels[4]);
      const container = document.getElementById('legalSections');
      if(container && Array.isArray(copy[page])) {
        const fragment = document.createDocumentFragment();
        copy[page].forEach(([title,paragraph]) => {
          const section = document.createElement('section');
          const heading = document.createElement('h2'); heading.textContent = title;
          const text = document.createElement('p'); text.textContent = paragraph;
          section.append(heading,text); fragment.append(section);
        });
        container.replaceChildren(fragment);
      }
      if(page) {
        const key = {about:0,privacy:1,terms:2,support:3}[page];
        document.title = 'K-POP FREEBIE — '+copy.labels[key]+' · SLYMN';
        const description = document.querySelector('meta[name="description"]');
        if(description) description.content = copy.lead;
      }
      if(select) { select.value = lang; select.setAttribute('aria-label',languageNames[lang]); }
      document.querySelectorAll('a').forEach(localLink);
    };
    apply();
    if(select) select.addEventListener('change',() => {
      lang = supported.includes(select.value) ? select.value : 'en';
      try { localStorage.setItem('slymnLang',lang); } catch {}
      const url = new URL(location.href); url.searchParams.set('lang',lang);
      history.replaceState(null,'',url); apply();
    });
  }).catch(() => {
    // Static English content stays readable if loading fails.
    if(select) { select.value = 'en'; select.disabled = true; }
  });
})();
