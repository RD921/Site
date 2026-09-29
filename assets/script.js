document.addEventListener('DOMContentLoaded', function () {
  var openBtn = document.querySelector('[data-menu-open]');
  var closeBtn = document.querySelector('[data-menu-close]');
  var overlay = document.querySelector('[data-menu-overlay]');
  if (openBtn && overlay) {
    openBtn.addEventListener('click', function () { overlay.classList.add('open'); });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', function () { overlay.classList.remove('open'); });
  }
  if (overlay) {
    overlay.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () { overlay.classList.remove('open'); });
    });
  }

  // ERP PREVIEW TABS
  var erpTabs = document.querySelectorAll('[data-erp-tab]');
  if (erpTabs.length) {
    erpTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        erpTabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var target = tab.getAttribute('data-erp-tab');
        document.querySelectorAll('[data-erp-panel]').forEach(function (panel) {
          panel.hidden = panel.getAttribute('data-erp-panel') !== target;
        });
      });
    });
  }

  // ERP PREVIEW — ASSISTENTE VIRTUAL (demo, respostas fixas)
  var chatForm = document.querySelector('[data-chat-form]');
  var chatInput = document.querySelector('[data-chat-input]');
  var chatLog = document.querySelector('[data-chat-log]');
  var chatReplies = [
    'Consegui localizar isso pra você — no ERP completo essa resposta viria com base nos seus dados reais.',
    'Boa pergunta! No sistema completo eu já teria essa informação puxada automaticamente do seu painel.',
    'Essa é uma prévia do assistente. Na versão real eu acesso pedidos, estoque e financeiro em tempo real pra te responder.'
  ];
  if (chatForm && chatInput && chatLog) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text) return;
      var userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = text;
      chatLog.appendChild(userBubble);
      chatInput.value = '';
      chatLog.scrollTop = chatLog.scrollHeight;
      setTimeout(function () {
        var botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        botBubble.textContent = chatReplies[Math.floor(Math.random() * chatReplies.length)];
        chatLog.appendChild(botBubble);
        chatLog.scrollTop = chatLog.scrollHeight;
      }, 500);
    });
  }
});
// MODAL DE PROJETO: clicar no card abre os detalhes; "Ver projeto" continua abrindo o link
document.addEventListener('DOMContentLoaded', function () {
  var aberto = null, origem = null;
  function abrir(id, card) {
    var modal = document.querySelector('[data-project-modal="' + id + '"]');
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    aberto = modal; origem = card;
    var btn = modal.querySelector('[data-project-close]');
    if (btn) btn.focus();
  }
  function fechar() {
    if (!aberto) return;
    aberto.classList.remove('open');
    document.body.classList.remove('modal-open');
    aberto = null;
    if (origem) origem.focus();
  }
  document.querySelectorAll('[data-project]').forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      abrir(card.getAttribute('data-project'), card);
    });
    card.addEventListener('keydown', function (e) {
      if (e.target !== card) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(card.getAttribute('data-project'), card); }
    });
  });
  document.querySelectorAll('[data-project-modal]').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-project-close]')) fechar();
    });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(); });
});