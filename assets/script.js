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