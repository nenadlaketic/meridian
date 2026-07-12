(function () {
  if (window.__meridianReveal) return;
  window.__meridianReveal = true;
  var root = document.documentElement;
  root.classList.add('js-reveal');

  // Safety net: reveal EVERYTHING within a short window regardless of the
  // observer path. The DC runtime renders the template asynchronously (React
  // from CDN), so the observer setup in init() can race the render and, on
  // slower connections, leave content stuck at opacity:0. Re-querying the
  // live DOM here guarantees nothing stays hidden. The scroll animation still
  // plays when the observer wins the race; this only backstops it.
  function revealAll() {
    var e = document.querySelectorAll('[data-reveal]');
    for (var i = 0; i < e.length; i++) e[i].classList.add('in');
  }
  setTimeout(revealAll, 1500);
  window.addEventListener('load', function () { setTimeout(revealAll, 300); });

  function reveal(el) { el.classList.add('in'); }

  function init() {
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return false;
    els.forEach(function (el) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = (parseInt(d, 10) / 1000) + 's';
    });
    if (!('IntersectionObserver' in window)) {
      els.forEach(reveal);
      return true;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) { reveal(el); }
      else { io.observe(el); }
    });
    // failsafe: never leave anything hidden
    setTimeout(function () { els.forEach(reveal); }, 5000);
    return true;
  }

  var tries = 0;
  function boot() {
    if (init()) return;
    if (tries++ > 120) return;
    requestAnimationFrame(boot);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
