(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Theme toggle (remembers the choice, otherwise follows the system setting)
  var themeBtn = document.getElementById('theme-btn');
  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', currentTheme());
  themeBtn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn');
  var links = document.getElementById('nav-links');
  function closeMenu() {
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
  menuBtn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Nav background and back-to-top button on scroll
  var nav = document.getElementById('nav');
  var toTop = document.getElementById('to-top');
  function onScroll() {
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  // Highlight the nav link of the section in view
  var navLinks = Array.prototype.slice.call(links.querySelectorAll('a'));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
    var home = document.getElementById('home');
    if (home) spy.observe(home);

    // Reveal elements as they scroll into view
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { reveal.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }

  // Rotating research areas in the hero
  var words = ['Human-Computer Interaction', 'Human-AI Interaction', 'LLM Agents', 'Agentic AI'];
  var rot = document.getElementById('rotator');
  if (rot && !reduceMotion) {
    var wi = 0, ci = words[0].length, deleting = true;
    function tick() {
      if (deleting) {
        ci--;
        if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; }
      } else {
        ci++;
      }
      rot.textContent = words[wi].slice(0, Math.max(ci, 0)) || '\u00a0';
      var delay = deleting ? 45 : 85;
      if (!deleting && ci >= words[wi].length) { deleting = true; delay = 1900; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 2200);
  }

  // Project filter
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.toggle('active', b === btn); });
      var f = btn.getAttribute('data-filter');
      projects.forEach(function (p) {
        var cats = p.getAttribute('data-cat').split(' ');
        var show = f === 'all' || cats.indexOf(f) !== -1;
        p.classList.toggle('hide', !show);
        if (show) p.classList.add('visible');
      });
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
