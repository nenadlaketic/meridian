(function () {
  if (window.__meridianTest) return;
  window.__meridianTest = true;

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animateScroll(el, to, duration) {
    var start = el.scrollLeft;
    var change = to - start;
    var max = el.scrollWidth - el.clientWidth;
    if (to < 0) to = 0;
    if (to > max) to = max;
    change = to - start;
    var startTime = null;
    if (el.__anim) cancelAnimationFrame(el.__anim);
    function step(now) {
      if (startTime === null) startTime = now;
      var t = Math.min(1, (now - startTime) / duration);
      el.scrollLeft = start + change * easeInOutCubic(t);
      if (t < 1) el.__anim = requestAnimationFrame(step);
    }
    el.__anim = requestAnimationFrame(step);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-tslide]');
    if (!btn) return;
    var track = document.querySelector('[data-tslider]');
    if (!track) return;
    var card = track.querySelector('[data-tcard]');
    var step = card ? card.getBoundingClientRect().width + 28 : 400;
    var dir = btn.getAttribute('data-tslide') === 'next' ? 1 : -1;
    animateScroll(track, track.scrollLeft + dir * step, 750);
  });
})();
