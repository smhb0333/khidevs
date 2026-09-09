(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  if (window.lucide) lucide.createIcons();
  $('#year').textContent = new Date().getFullYear();

  // Header + scroll progress
  const header = $('#siteHeader');
  const progress = $('.scroll-progress span');
  const updateScrollUI = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = max > 0 ? `${Math.min(100, (y / max) * 100)}%` : '0%';
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });

  // Lenis smooth scroll (desktop / non-reduced motion)
  let lenis;
  if (!reducedMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .92, touchMultiplier: 1.15 });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  // Smooth anchor behavior with fixed header offset
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 74;
      if (lenis) lenis.scrollTo(top); else window.scrollTo({ top, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });

  // Cursor
  if (canHover && !reducedMotion) {
    const dot = $('.cursor-dot');
    const ring = $('.cursor-ring');
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = `${mx}px`; dot.style.top = `${my}px`; });
    const tick = () => {
      rx += (mx - rx) * .16; ry += (my - ry) * .16;
      ring.style.left = `${rx}px`; ring.style.top = `${ry}px`;
      requestAnimationFrame(tick);
    };
    tick();
    $$('a,button,.project-card,.service-row').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('active'));
      el.addEventListener('mouseleave', () => ring.classList.remove('active'));
    });
  }

  // Magnetic buttons
  if (canHover && !reducedMotion) {
    $$('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * .08}px,${y * .08}px)`;
      });
      el.addEventListener('mouseleave', () => el.style.transform = 'translate(0,0)');
    });
  }

  // Services hover / tap state
  const serviceRows = $$('.service-row');
  serviceRows.forEach(row => {
    row.addEventListener('mouseenter', () => { if (canHover) { serviceRows.forEach(r => r.classList.remove('active')); row.classList.add('active'); } });
    row.addEventListener('click', () => { if (!canHover) { serviceRows.forEach(r => r.classList.remove('active')); row.classList.add('active'); } });
  });

  // Portfolio filters
  const filterButtons = $$('.work-filter button');
  const cards = $$('.project-card');
  filterButtons.forEach(btn => btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !show);
    });
    window.ScrollTrigger?.refresh();
  }));

  // Case-study modal data (demo content only)
  const projects = {
    ops: { kicker:'Web platform / AI', title:'Operations Intelligence', challenge:'Complex operational data needs to be understandable at a glance across desktop and tablet contexts.', approach:'A modular command-center UI with prioritised alerts, trends, workflow states and AI-assisted summaries.', system:'Design tokens, responsive analytics modules, progressive disclosure and keyboard-aware interaction.', note:'Concept case study — replace with verified KHIDevs client work before publishing as a commercial claim.' },
    health: { kicker:'Mobile product', title:'Care Companion', challenge:'Healthcare journeys often fragment appointments, records, reminders and communication across too many surfaces.', approach:'A calm mobile-first product hierarchy that makes the next useful action clear without overwhelming the user.', system:'Touch-first navigation, accessible type scale, reusable clinical cards, secure-state patterns and low-friction booking flows.', note:'Concept case study — replace with verified KHIDevs client work before publishing as a commercial claim.' },
    commerce: { kicker:'Commerce / web', title:'Editorial Commerce', challenge:'Premium product catalogs need to retain brand character without sacrificing shopping clarity and speed.', approach:'An editorial grid system that treats browsing as discovery while keeping pricing, product information and checkout paths obvious.', system:'Responsive art direction, CSS grid, performance-aware media behavior and modular product storytelling.', note:'Concept case study — replace with verified KHIDevs client work before publishing as a commercial claim.' },
    assistant: { kicker:'AI product', title:'Workspace Copilot', challenge:'Teams need AI answers grounded in internal knowledge rather than generic model output.', approach:'A source-aware assistant with visible retrieval states, citations, action boundaries and clear confidence cues.', system:'RAG-ready interaction architecture, streaming response patterns, source panels and permission-aware states.', note:'Concept case study — replace with verified KHIDevs client work before publishing as a commercial claim.' },
    fintech: { kicker:'Fintech / responsive web', title:'Portfolio Command Center', challenge:'Financial interfaces must expose complexity while preserving hierarchy, trust and quick scanability.', approach:'A dense but calm responsive dashboard that separates signal, allocation and movement into a repeatable visual grammar.', system:'Responsive data cards, accessible chart treatment, system statuses and composable financial components.', note:'Concept case study — replace with verified KHIDevs client work before publishing as a commercial claim.' }
  };
  const modalEl = $('#projectModal');
  const modalBody = $('#projectModalBody');
  const modal = window.bootstrap ? new bootstrap.Modal(modalEl) : null;
  const openProject = card => {
    const p = projects[card.dataset.project]; if (!p || !modal) return;
    modalBody.innerHTML = `
      <div class="case-kicker">${p.kicker}</div>
      <h2 class="case-title" id="projectModalTitle">${p.title}</h2>
      <div class="case-grid">
        <div class="case-block"><span>THE CHALLENGE</span><h4>Make complexity useful.</h4><p>${p.challenge}</p></div>
        <div class="case-block"><span>THE APPROACH</span><h4>Design around decisions.</h4><p>${p.approach}</p></div>
        <div class="case-block"><span>THE SYSTEM</span><h4>Built to stay coherent.</h4><p>${p.system}</p></div>
        <div class="case-block"><span>ENGAGEMENT MODEL</span><h4>Strategy → design → build.</h4><p>Use this modal for verified project context, team role, timeline, technologies and measurable outcomes once real portfolio data is available.</p></div>
      </div>
      <div class="case-disclaimer">${p.note}</div>`;
    modal.show();
  };
  cards.forEach(card => {
    card.addEventListener('click', () => openProject(card));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(card); } });
  });

  // Contact form: mailto fallback so static hosting still works
  const form = $('#projectForm');
  const success = $('#formSuccess');
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.classList.add('was-validated');
    if (!form.checkValidity()) return;
    const data = new FormData(form);
    const services = data.getAll('service').join(', ') || 'Not specified';
    const subject = encodeURIComponent(`New KHIDevs project inquiry — ${data.get('company') || data.get('name')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany/Product: ${data.get('company') || '-'}\nServices: ${services}\n\nProject brief:\n${data.get('message')}`);
    success.classList.add('show');
    window.location.href = `mailto:hello@khidevs.com?subject=${subject}&body=${body}`;
  });

  // GSAP motion layer
  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-title .title-line > span', { yPercent: 120, duration: 1.1, ease: 'power4.out', stagger: .09, delay: .1 });
    gsap.from('.hero .reveal-up', { y: 30, opacity: 0, duration: .8, ease: 'power3.out', stagger: .08, delay: .4 });
    gsap.from('.hero-stage', { y: 40, scale: .985, opacity: 0, duration: 1, ease: 'power3.out', delay: .55 });

    $$('.reveal-up:not(.hero .reveal-up)').forEach(el => {
      gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 88%', once:true }, y:34, opacity:0, duration:.72, ease:'power3.out' });
    });
    $$('.reveal-scale:not(.hero-stage)').forEach(el => {
      gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 88%', once:true }, scale:.95, opacity:0, duration:.85, ease:'power3.out' });
    });
    $$('.split-text').forEach(el => {
      gsap.from(el, { scrollTrigger:{ trigger:el, start:'top 88%', once:true }, y:42, opacity:0, duration:.88, ease:'power3.out' });
    });

    gsap.to('.radar', { rotation:360, duration:36, ease:'none', repeat:-1 });
    gsap.to('.radar-core', { rotation:-360, duration:36, ease:'none', repeat:-1 });
    gsap.to('.orbit span,.orbit i', { rotation:-360, duration:36, ease:'none', repeat:-1 });
    gsap.to('.tech-cloud', { rotation:3, duration:8, ease:'sine.inOut', yoyo:true, repeat:-1 });
    gsap.to('.tech', { rotation:-3, duration:8, ease:'sine.inOut', yoyo:true, repeat:-1 });

    gsap.to('.rail-progress span', { height:'100%', ease:'none', scrollTrigger:{ trigger:'.process-rail', start:'top 62%', end:'bottom 70%', scrub:true } });
    gsap.to('.hero-glow-one', { y:180, x:-80, ease:'none', scrollTrigger:{ trigger:'.hero', start:'top top', end:'bottom top', scrub:true } });
    gsap.to('.process-bg', { x:-140, ease:'none', scrollTrigger:{ trigger:'.process', start:'top bottom', end:'bottom top', scrub:true } });
  }

  // Protect against accidental horizontal overflow from third-party/bootstrap components.
  const clampOverflow = () => {
    const vw = document.documentElement.clientWidth;
    $$('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width > vw * 1.4 && getComputedStyle(el).position !== 'fixed') {
        // Intentionally oversized decorative elements are handled by section overflow rules.
        const allowed = el.classList.contains('marquee-track') || el.classList.contains('marquee-line') || el.classList.contains('process-bg');
        if (!allowed && !el.closest('.marquee-wrap')) el.style.maxWidth = '100%';
      }
    });
  };
  window.addEventListener('load', clampOverflow, { once:true });
})();
