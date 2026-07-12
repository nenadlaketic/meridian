(function () {
  if (window.__meridianCopy) return;
  window.__meridianCopy = true;

  function flash(el) {
    var main = el.querySelector('[data-copy-text]');
    var done = el.querySelector('[data-copy-done]');
    if (!main || !done) return;
    main.style.display = 'none';
    done.style.display = 'inline-flex';
    clearTimeout(el.__copyTimer);
    el.__copyTimer = setTimeout(function () {
      main.style.display = '';
      done.style.display = 'none';
    }, 1600);
  }

  function fallback(text, el) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      flash(el);
    } catch (e) {}
  }

  function copy(text, el) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { flash(el); }).catch(function () { fallback(text, el); });
    } else {
      fallback(text, el);
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('[data-copy]');
    if (!el) return;
    e.preventDefault();
    copy(el.getAttribute('data-copy'), el);
  });
})();
