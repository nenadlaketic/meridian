(function () {
  if (window.__mNavInit) return;
  window.__mNavInit = true;
  // Inject styles once
  function injectCSS() {
    if (document.getElementById('m-nav-css')) return;
    var css = document.createElement('style');
    css.id = 'm-nav-css';
    css.textContent = [
      '.m-burger{display:none;position:relative;z-index:1300}',
      '.m-drawer{display:none}',
      '@media(max-width:768px){',
      '  header nav{display:none!important}',
      '  header > a[href*="Zakazivanje"]{display:none!important}',
      '  .m-burger{display:flex!important;flex-direction:column;justify-content:center;align-items:center;gap:5px;width:44px;height:44px;padding:0;background:none;border:none;cursor:pointer;flex-shrink:0}',
      '  .m-burger span{display:block;width:24px;height:2px;background:#1A1A1A;border-radius:2px;transition:transform .3s ease,opacity .25s ease}',
      '  .m-burger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}',
      '  .m-burger.open span:nth-child(2){opacity:0}',
      '  .m-burger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}',
      '  .m-drawer{display:flex!important;flex-direction:column;position:fixed;inset:0;z-index:1200;background:#F3EDE4;padding:100px 32px 40px;box-sizing:border-box;transform:translateY(-100%);opacity:0;visibility:hidden;transition:transform .38s cubic-bezier(.16,.7,.3,1),opacity .3s ease,visibility 0s linear .38s}',
      '  .m-drawer.open{transform:none;opacity:1;visibility:visible;transition:transform .38s cubic-bezier(.16,.7,.3,1),opacity .3s ease}',
      '  .m-drawer-nav{display:flex!important;flex-direction:column;gap:0}',
      '  .m-drawer-nav a{font-family:"Newsreader",Georgia,serif;font-size:30px;font-weight:400;letter-spacing:-.01em;color:#1A1A1A;padding:16px 0;border-bottom:1px solid rgba(26,26,26,.1)}',
      '  .m-drawer-cta{margin-top:auto;background:#2F4738;color:#F3EDE4!important;text-align:center;padding:18px 24px;font-size:15px;font-weight:600;border-radius:2px}',
      '  header{position:fixed;top:0;left:0;right:0;z-index:2000;background:#F3EDE4;transition:transform .32s cubic-bezier(.16,.7,.3,1);will-change:transform}',
      '  header.m-hide{transform:translateY(-100%)}',
      '  body{padding-top:var(--m-hh,62px)}',
      '}',
      // Filled image slots must not trap page scroll on touch — touch-action:none
      // inside the shadow root is only needed while reframing (desktop, editable).
      'image-slot:not([data-reframe])::part(image){touch-action:pan-y!important}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(css);
  }
  injectCSS();

  // Fixed header needs a matching top-spacer so content isn't hidden beneath
  // it on mobile. Measure the header and expose its height as --m-hh (used by
  // the body padding rule inside the mobile media query).
  function setHeaderHeight() {
    var h = document.querySelector('header');
    if (h) document.documentElement.style.setProperty('--m-hh', h.offsetHeight + 'px');
  }
  setHeaderHeight();
  window.addEventListener('resize', setHeaderHeight);
  window.addEventListener('load', setHeaderHeight);
  var _hhTries = 0;
  (function pollHH() { setHeaderHeight(); if (_hhTries++ < 20) setTimeout(pollHH, 150); })();

  function closeAll() {
    var d = document.querySelector('.m-drawer');
    var b = document.querySelector('.m-burger');
    if (d) d.classList.remove('open');
    if (b) b.classList.remove('open');
    document.body.style.overflow = '';
  }

  // The drawer ships inside <header>, but a sticky header creates its own
  // stacking context that traps a fixed child below scrolled page content.
  // Relocate the drawer to <body> so its z-index counts against the root.
  function relocateDrawer() {
    var d = document.querySelector('.m-drawer');
    if (d && d.parentElement && d.parentElement.tagName === 'HEADER') {
      document.body.appendChild(d);
    }
    return d;
  }

  document.addEventListener('click', function (e) {
    var burger = e.target.closest && e.target.closest('.m-burger');
    if (burger) {
      var drawer = relocateDrawer();
      if (!drawer) return;
      var willOpen = !drawer.classList.contains('open');
      drawer.classList.toggle('open', willOpen);
      burger.classList.toggle('open', willOpen);
      document.body.style.overflow = willOpen ? 'hidden' : '';
      var header = document.querySelector('header');
      if (header && willOpen) header.classList.remove('m-hide');
      return;
    }
    if (e.target.closest && e.target.closest('.m-drawer a')) {
      closeAll();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  // Hide the header when scrolling down, reveal it the instant you scroll up
  // (mobile only — the CSS transform rule is gated to <=768px).
  function scrollY() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  var lastY = scrollY();
  window.addEventListener('scroll', function () {
    var y = scrollY();
    var header = document.querySelector('header');
    if (header && !document.querySelector('.m-drawer.open')) {
      if (y <= 80) header.classList.remove('m-hide');
      else if (y > lastY + 4) header.classList.add('m-hide');
      else if (y < lastY - 2) header.classList.remove('m-hide');
    }
    lastY = y;
  }, { passive: true });
})();
