document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;

  // Header: fica mais sólido ao rolar
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  var menu = document.querySelector('[data-menu]');
  var openBtn = document.querySelector('[data-menu-open]');
  function closeMenu() { if (!menu) return; menu.classList.remove('open'); body.classList.remove('no-scroll'); }
  if (menu && openBtn) {
    openBtn.addEventListener('click', function () { menu.classList.add('open'); body.classList.add('no-scroll'); });
    menu.querySelectorAll('[data-menu-close], a').forEach(function (el) { el.addEventListener('click', closeMenu); });
  }

  // Animações ao aparecer na tela
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Filtros de projetos
  var filters = document.querySelectorAll('[data-filter]');
  var empty = document.querySelector('[data-empty]');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
      var f = btn.getAttribute('data-filter'), shown = 0;
      document.querySelectorAll('[data-categories]').forEach(function (card) {
        var ok = f === 'todos' || card.getAttribute('data-categories').split(' ').indexOf(f) > -1;
        card.classList.toggle('project-hidden', !ok);
        if (ok) shown++;
      });
      if (empty) empty.classList.toggle('show', shown === 0);
    });
  });

  // Janela de detalhes dos projetos
  var opened = null, origin = null;
  function openModal(id, from) {
    var m = document.querySelector('[data-modal="' + id + '"]');
    if (!m) return;
    m.classList.add('open'); body.classList.add('no-scroll');
    opened = m; origin = from;
    var c = m.querySelector('[data-modal-close]'); if (c) c.focus();
  }
  function closeModal() {
    if (!opened) return;
    opened.classList.remove('open'); body.classList.remove('no-scroll');
    opened = null; if (origin) origin.focus();
  }
  document.querySelectorAll('[data-project]').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      openModal(card.getAttribute('data-project'), card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.getAttribute('data-project'), card); }
    });
  });
  document.querySelectorAll('[data-modal]').forEach(function (m) {
    m.addEventListener('click', function (e) { if (e.target === m || e.target.closest('[data-modal-close]')) closeModal(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeModal(); closeMenu(); } });

  // Formulário de contato: monta a mensagem e abre o WhatsApp
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var txt = 'Olá, Rodrigo! Vim pelo site.\n\n' +
        '*Nome:* ' + d.get('nome') + '\n' +
        '*E-mail:* ' + d.get('email') + '\n' +
        (d.get('empresa') ? '*Empresa:* ' + d.get('empresa') + '\n' : '') +
        '*Tipo de projeto:* ' + d.get('tipo') + '\n\n' +
        d.get('mensagem');
      window.open('https://wa.me/5527996386305?text=' + encodeURIComponent(txt), '_blank', 'noopener');
    });
  }

  // Ano no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
