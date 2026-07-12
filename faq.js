(function () {
  if (window.__meridianFaq) return;
  window.__meridianFaq = true;
  document.addEventListener('click', function (e) {
    var q = e.target.closest && e.target.closest('[data-faq-q]');
    if (!q) return;
    var item = q.closest('[data-faq-item]');
    var ans = item.querySelector('[data-faq-a]');
    var isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';
    document.querySelectorAll('[data-faq-item]').forEach(function (it) {
      var a = it.querySelector('[data-faq-a]');
      var ic = it.querySelector('[data-faq-icon]');
      if (a) { a.style.maxHeight = '0px'; a.style.opacity = '0'; }
      if (ic) { ic.style.transform = 'rotate(0deg)'; }
    });
    if (!isOpen) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
      ans.style.opacity = '1';
      var icon = item.querySelector('[data-faq-icon]');
      if (icon) { icon.style.transform = 'rotate(45deg)'; }
    }
  });
})();
