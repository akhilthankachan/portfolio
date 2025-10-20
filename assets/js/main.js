// Theme toggle persistence
(function () {
  var themeToggle = document.getElementById('themeToggle');
  var saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var isLight = document.documentElement.getAttribute('data-theme') === 'light';
      document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
      localStorage.setItem('theme', isLight ? 'dark' : 'light');
      themeToggle.textContent = isLight ? '🌙' : '☀️';
    });
  }
})();

// Mobile nav toggle
(function () {
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  if (!navToggle || !navMenu) return;
  navToggle.addEventListener('click', function () {
    var open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
})();

// Smooth scroll
(function () {
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').startsWith('#')) {
      var id = target.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
})();

// Typewriter for hero subtitle
(function () {
  function typeText(el, texts, speed, pause) {
    if (!el || !texts || !texts.length) return;
    var idx = 0;
    var pos = 0;
    var forward = true;
    function step() {
      var current = texts[idx];
      if (forward) {
        pos++;
        if (pos > current.length) { forward = false; setTimeout(step, pause); return; }
      } else {
        pos--;
        if (pos < 0) { forward = true; idx = (idx + 1) % texts.length; setTimeout(step, 400); return; }
      }
      el.textContent = current.slice(0, Math.max(0, pos));
      setTimeout(step, forward ? speed : Math.max(40, speed - 20));
    }
    step();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var el = document.getElementById('typedSubtitle');
      typeText(el, [
        'PHP/JavaScript Developer • 2.5 years experience',
        'CodeIgniter & basic Laravel • REST APIs',
        'MySQL performance • WordPress development'
      ], 60, 1100);
    });
  } else {
    var el = document.getElementById('typedSubtitle');
    typeText(el, [
      'PHP/JavaScript Developer • 2.5 years experience',
      'CodeIgniter & basic Laravel • REST APIs',
      'MySQL performance • WordPress development'
    ], 60, 1100);
  }
})();

// Load projects (static for now, can be wired to backend later)
(function () {
  var projectGrid = document.getElementById('projectGrid');
  if (!projectGrid) return;
  var projects = [
    { title: 'REST API Integration', desc: 'PHP + cURL + JSON with auth and caching.', img: 'assets/img/placeholder-1.svg', url: '#', code: '#' },
    { title: 'WordPress Theme Tweaks', desc: 'Custom fields, shortcodes, and blocks.', img: 'assets/img/placeholder-2.svg', url: '#', code: '#' },
    { title: 'CI/Laravel Features', desc: 'CRUD, validation, pagination, and queues.', img: 'assets/img/placeholder-3.svg', url: '#', code: '#' }
  ];
  projectGrid.innerHTML = projects.map(function (p) {
    return (
      '<article class="project-card">' +
      '<img src="' + p.img + '" alt="' + p.title + ' preview" />' +
      '<div class="content">' +
      '<h3>' + p.title + '</h3>' +
      '<p>' + p.desc + '</p>' +
      '</div>' +
      '<div class="actions">' +
      '<a href="' + p.url + '" class="btn primary" target="_blank" rel="noopener">Live</a>' +
      '<a href="' + p.code + '" class="btn" target="_blank" rel="noopener">Code</a>' +
      '</div>' +
      '</article>'
    );
  }).join('');
  // Reinitialize reveals after dynamic content
  if (window.__initReveals) window.__initReveals();
})();

// Contact form handling for static hosting (uses mailto)
(function () {
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (!form || !status) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = (document.getElementById('name') || {}).value || '';
    var email = (document.getElementById('email') || {}).value || '';
    var message = (document.getElementById('message') || {}).value || '';
    var subject = encodeURIComponent('Portfolio Contact from ' + name);
    var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    // Replace with your email address
    var to = 'mailto:youremail@example.com?subject=' + subject + '&body=' + body;
    status.textContent = 'Opening your email client...';
    window.location.href = to;
  });
})();

// Scroll reveal using IntersectionObserver
(function () {
  function initReveals() {
    var revealTargets = [];
    var sectionBlocks = Array.prototype.slice.call(document.querySelectorAll('.section'));
    var timelineItems = Array.prototype.slice.call(document.querySelectorAll('.timeline li'));
    var projectCards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
    var heroBlock = document.querySelector('.hero .container');
    if (heroBlock) revealTargets.push(heroBlock);
    revealTargets = revealTargets.concat(sectionBlocks, timelineItems, projectCards);

    revealTargets.forEach(function (el, idx) {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-visible')) {
        el.classList.add('reveal');
        el.style.setProperty('--d', (idx * 80) + 'ms');
      }
    });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealTargets.forEach(function (el) { io.observe(el); });
    } else {
      // Fallback: show immediately
      revealTargets.forEach(function (el) { el.classList.add('reveal-visible'); });
    }
  }

  window.__initReveals = initReveals;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveals);
  } else {
    initReveals();
  }
})();


