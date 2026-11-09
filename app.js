/* kredit-maliki: Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id. Lisensi MIT + wajib atribusi (lihat LICENSE). */
(() => {
  // Terapkan config.js ke elemen [data-cfg], [data-cfg-href], [data-count-cfg]
  const C = window.SITE || {};
  document.querySelectorAll('[data-cfg]').forEach((el) => { if (C[el.dataset.cfg] != null) el.textContent = C[el.dataset.cfg]; });
  document.querySelectorAll('[data-count-cfg]').forEach((el) => { if (C[el.dataset.countCfg] != null) { el.dataset.count = C[el.dataset.countCfg]; el.textContent = C[el.dataset.countCfg]; } });
  const hrefs = { wa: 'https://wa.me/' + C.wa + '?text=' + encodeURIComponent(C.waPesan || ''), email: 'mailto:' + C.email, instagram: 'https://instagram.com/' + C.instagram, situs: 'https://' + C.situs, video: C.video };
  document.querySelectorAll('[data-cfg-href]').forEach((el) => { const h = hrefs[el.dataset.cfgHref]; if (h) el.href = h; });
  document.querySelectorAll('[data-cfg-ig]').forEach((el) => (el.textContent = '@' + C.instagram));
  // Logo & foto dari config.js (logo, foto, guru, galeri)
  const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const inisial = (C.singkat || C.nama || 'S').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  if (C.logo) {
    document.querySelectorAll('svg[data-logo]').forEach((sv) => {
      const im = new Image(); im.alt = ''; im.className = 'logo-img'; im.src = C.logo;
      im.onerror = () => { const s = document.createElement('span'); s.className = 'logo-inisial'; s.textContent = inisial; im.replaceWith(s); };
      sv.replaceWith(im);
    });
    const ic = document.querySelector('link[rel="icon"]'); if (ic) { ic.href = C.logo; ic.removeAttribute('type'); }
  }
  const F = C.foto || {};
  document.querySelectorAll('[data-foto]').forEach((ph) => {
    const [k, i] = ph.dataset.foto.split('.'); const src = i == null ? F[k] : (F[k] || [])[+i];
    if (!src) return;
    const im = new Image(); im.alt = ''; im.className = 'ph__foto'; im.loading = 'lazy'; im.decoding = 'async';
    im.onload = () => ph.classList.add('ph--foto'); im.onerror = () => im.remove(); im.src = src; ph.appendChild(im);
  });
  if (F.hero) { const h = document.querySelector('.hero'); if (h) { h.style.setProperty('--hero-foto', 'url("' + encodeURI(F.hero) + '")'); h.classList.add('hero--foto'); } }
  const guru = C.guru || [], galeri = C.galeri || [];
  if (guru.length || galeri.length) {
    document.getElementById('guru').hidden = false;
    document.querySelector('[data-guru]').innerHTML = guru.map((g) => '<li class="gr"><img src="' + esc(g.foto) + '" alt="Foto ' + esc(g.nama) + '" width="600" height="750" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'gr__ini\',textContent:this.alt.slice(5,7).toUpperCase()}))"><b>' + esc(g.nama) + '</b><span>' + esc(g.peran || '') + '</span></li>').join('');
    document.querySelector('[data-galeri]').innerHTML = galeri.map((src, i) => '<img src="' + esc(src) + '" alt="Foto kegiatan ' + (i + 1) + '" width="800" height="600" loading="lazy" onerror="this.remove()">').join('');
  }
  if (C.nama) document.title = C.nama + ' · Sekolah Qur\'ani Terpadu';

  const loader = document.querySelector('.loader');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  // Menu HP
  const burger = document.querySelector('.nav__burger');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setMenu(false); });

  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Jadwal salat (kota dari config.js) (Kemenag via Aladhan); angka bawaan dipakai bila gagal
  const names = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];
  const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const list = document.querySelector('[data-times]');
  const tick = () => {
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const items = [...list.children];
    let idx = items.findIndex((li) => { const [h, m] = li.querySelector('b').textContent.split(':'); return h * 60 + +m > mins; });
    const tomorrow = idx === -1;
    if (tomorrow) idx = 0;
    items.forEach((li, i) => li.classList.toggle('is-next', i === idx));
    const [h, m] = items[idx].querySelector('b').textContent.split(':');
    let diff = h * 3600 + m * 60 - (mins * 60 + now.getSeconds());
    if (tomorrow) diff += 86400;
    const hh = Math.floor(diff / 3600), mm = Math.floor(diff % 3600 / 60), ss = diff % 60;
    document.querySelector('[data-next-name]').textContent = names[idx];
    document.querySelector('[data-next-in]').textContent = (hh ? hh + ' j ' : '') + mm + ' mnt ' + String(ss).padStart(2, '0') + ' dtk';
  };
  tick();
  setInterval(tick, 1000);
  const kota = C.kota || 'Jakarta';
  fetch('https://api.aladhan.com/v1/timingsByCity?city=' + encodeURIComponent(kota) + '&country=Indonesia&method=20')
    .then((r) => r.json())
    .then(({ data }) => {
      [...list.children].forEach((li, i) => (li.querySelector('b').textContent = data.timings[keys[i]].slice(0, 5)));
      document.querySelector('[data-pray-date]').textContent = kota + ' · Kemenag';
      tick();
    })
    .catch(() => {});

  if (!hasGsap || reduce) { loader && loader.remove(); return; }

  gsap.registerPlugin(ScrollTrigger);

  // Pembuka: bunga mekar, lalu kubah naik dari bawah
  let introDone = false;
  let heroTl;
  const startHero = () => {
    if (introDone) return;
    introDone = true;
    heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(loader, { opacity: 0, duration: .5, onComplete: () => loader.remove() })
      .from('.hero__panel', { scale: .94, borderRadius: 60, duration: 1.4, ease: 'expo.inOut' }, 0)
      .from('.hero__dome', { scaleY: 0, scaleX: .6, duration: 1.6, ease: 'expo.inOut' }, .15)
      .from('.hero__fl', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.6)' }, .9)
      .from('.hero__title .w', { y: 70, opacity: 0, rotateX: -60, transformOrigin: '50% 100%', duration: 1.1, stagger: .07 }, 1)
      .from('.hero__sub, .hero__ctas', { y: 24, opacity: 0, duration: .8, stagger: .1 }, 1.4)
      .from('.sp', { scale: 0, duration: .8, stagger: .1, ease: 'back.out(3)' }, 1.3)
      .from('.nav', { y: -40, opacity: 0, duration: .8 }, 1.2);
  };
  gsap.timeline({ onComplete: startHero })
    .fromTo('.loader__fl', { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: .9, ease: 'back.out(1.8)' })
    .from('.loader p', { opacity: 0, y: 10, duration: .5 }, '-=.3')
    .to({}, { duration: .25 });
  // Pengaman: tab tersembunyi menahan requestAnimationFrame, jadi lompat ke akhir
  setTimeout(() => {
    startHero();
    if (document.contains(loader)) { heroTl.progress(1); loader.remove(); }
  }, 3500);

  // Kilau berkedip & bunga berputar pelan
  gsap.utils.toArray('.sp').forEach((s, i) => gsap.to(s, { scale: .4, opacity: .5, rotate: 90, duration: 1.4 + i * .3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 + i * .2 }));
  gsap.to('.hero__fl', { rotate: 360, duration: 30, repeat: -1, ease: 'none', delay: 2.5 });

  // Gulir keluar hero: kubah membesar, judul naik
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
    .to('.hero__dome', { scale: 1.25, ease: 'none' }, 0)
    .to('.hero__inner', { y: -80, opacity: .2, ease: 'none' }, 0)
    .to('.hero__lattice', { y: 60, ease: 'none' }, 0);

  // Tentang
  gsap.from('.about__img', { clipPath: 'inset(0 100% 0 0 round 22px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.about', start: 'top 70%' } });
  gsap.fromTo('.about__img .ph', { yPercent: -8 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.about__quote', { y: 80, opacity: 0, rotate: 4, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.about', start: 'top 55%' } });
  gsap.from('.about__text > *, .about__pts div', { y: 40, opacity: 0, duration: .9, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: '.about__text', start: 'top 80%' } });

  // Warisan: foto melebar, badge berputar, panel mihrab naik
  gsap.from('.heritage__img .ph', { clipPath: 'inset(0 50% 0 50% round 20px)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.heritage', start: 'top 70%' } });
  gsap.from('.spin', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.heritage', start: 'top 60%' } });
  gsap.to('.spin > svg:first-child', { rotate: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%' });
  gsap.from('.mihrab', { yPercent: 30, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.heritage', start: 'top 65%' } });
  gsap.from('.heritage h2', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.heritage', start: 'top 75%' } });

  // Orbit: cincin tergambar, titik mengitari, gelembung muncul
  const ring = document.querySelector('.orbit__ring circle');
  gsap.from(ring, { strokeDashoffset: 1194, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: '.orbit', start: 'top 70%' } });
  gsap.to('.orbit__dot', { rotate: 360, svgOrigin: '200 200', duration: 14, repeat: -1, ease: 'none' });
  gsap.from('.orbit__img', { scale: .6, opacity: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.orbit', start: 'top 70%' } });
  gsap.from('.bub', { scale: 0, duration: .9, stagger: .15, ease: 'back.out(2)', scrollTrigger: { trigger: '.orbit', start: 'top 55%' } });
  gsap.utils.toArray('.bub').forEach((b, i) => gsap.to(b, { y: i % 2 ? 10 : -10, duration: 2.4 + i * .3, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
  gsap.from('.orbit__text > *', { y: 40, opacity: 0, stagger: .1, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: '.orbit', start: 'top 75%' } });

  // Angka berhitung
  document.querySelectorAll('[data-count]').forEach((el) => {
    const n = { v: 0 };
    gsap.to(n, { v: +el.dataset.count, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => (el.textContent = Math.round(n.v)) });
  });

  // Program: kartu naik bergiliran, foto mihrab terbuka
  gsap.from('.program__head > *', { y: 40, opacity: 0, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.program', start: 'top 75%' } });
  gsap.from('.pc', { y: 120, opacity: 0, rotate: (i) => (i % 2 ? 3 : -3), stagger: .12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.cards', start: 'top 85%' } });

  // Kisah: garis tergambar, lingkaran tahun muncul
  const tl = document.querySelector('.tl');
  gsap.fromTo(tl, { '--p': 0 }, { '--p': 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 75%', end: 'top 35%', scrub: true } });
  gsap.from('.tl li', { y: 50, opacity: 0, stagger: .15, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: tl, start: 'top 80%' } });
  gsap.from('.tl__yr', { scale: 0, stagger: .15, duration: .8, ease: 'back.out(2)', scrollTrigger: { trigger: tl, start: 'top 75%' } });
  gsap.from('.story__head > *', { y: 40, opacity: 0, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.story', start: 'top 80%' } });

  // Fasilitas: kubah naik
  gsap.from('.dm__img', { yPercent: 40, opacity: 0, stagger: .12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.domes', start: 'top 85%' } });
  gsap.from('.pray', { x: 60, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.domes', start: 'top 80%' } });
  gsap.from('.facil__head > *', { y: 40, opacity: 0, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.facil', start: 'top 85%' } });

  // CTA: latar paralaks, kartu terangkat
  gsap.fromTo('.cta__bg .ph', { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.cta', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.cta__card', { y: 100, scale: .9, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.cta', start: 'top 70%' } });

  // Tombol magnetis
  if (matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn').forEach((b) => {
      b.addEventListener('mousemove', (e) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .2, y: (e.clientY - r.top - r.height / 2) * .3, duration: .4 }); });
      b.addEventListener('mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1, .4)' }));
    });
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
