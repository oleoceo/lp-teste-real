/**
 * REVITACAP PRO - TRATAMENTO & RECUPERAÇÃO CAPILAR
 * Script de Interatividade, Conversão e Diagnóstico
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initBeforeAfterSlider();
  initFAQ();
  initQuiz();
  initCheckoutModal();
  initSocialProof();
  initMobileMenu();
  initStickyCTA();
});

/* ==========================================================================
   1. CONTADOR REGRESSIVO DE URGÊNCIA (14:59)
   ========================================================================== */
function initCountdown() {
  const timerElements = document.querySelectorAll('.countdown-timer');
  if (!timerElements.length) return;

  let totalSeconds = 14 * 60 + 59; // 14 min 59 seg

  // Se já tiver no session, continua
  const savedTime = sessionStorage.getItem('revitacap_timer');
  if (savedTime && parseInt(savedTime, 10) > 0) {
    totalSeconds = parseInt(savedTime, 10);
  }

  function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    timerElements.forEach(el => {
      el.textContent = `${formattedMinutes}:${formattedSeconds}`;
    });

    if (totalSeconds > 0) {
      totalSeconds--;
      sessionStorage.setItem('revitacap_timer', totalSeconds);
    } else {
      totalSeconds = 15 * 60; // reinicia ciclo suave
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   2. COMPARADOR ANTES / DEPOIS INTERATIVO
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterBox');
  const overlay = document.getElementById('beforeAfterOverlay');
  const handle = document.getElementById('beforeAfterHandle');
  const rangeInput = document.getElementById('beforeAfterRange');

  if (!container || !overlay || !handle) return;

  function setSliderPosition(percent) {
    const clamped = Math.max(0, Math.min(100, percent));
    overlay.style.width = `${clamped}%`;
    handle.style.left = `${clamped}%`;
    if (rangeInput) rangeInput.value = clamped;
  }

  if (rangeInput) {
    rangeInput.addEventListener('input', (e) => {
      setSliderPosition(e.target.value);
    });
  }

  let isDragging = false;

  function handleMove(clientX) {
    const rect = container.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percent = (offsetX / rect.width) * 100;
    setSliderPosition(percent);
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    handleMove(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch para Celulares
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* ==========================================================================
   3. ACCORDION DE DÚVIDAS FREQUENTES (FAQ)
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      // Fecha outros itens
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
      // Alterna o atual
      if (!isOpen) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   4. DIAGNÓSTICO CAPILAR INTERATIVO (QUIZ EXPRESS)
   ========================================================================== */
function initQuiz() {
  const quizForm = document.getElementById('quizForm');
  const quizSteps = document.querySelectorAll('.quiz-step');
  const quizResult = document.getElementById('quizResult');
  const quizNextBtns = document.querySelectorAll('.quiz-next-btn');

  if (!quizForm || !quizSteps.length) return;

  let currentStep = 0;
  let answers = {
    intensidade: 'moderada',
    tempo: 'recente',
    objetivo: 'crescimento'
  };

  quizNextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepIndex = parseInt(btn.dataset.step, 10);
      const selectedOption = quizSteps[stepIndex].querySelector('input[type="radio"]:checked');

      if (!selectedOption) {
        alert('Por favor, selecione uma opção para continuar.');
        return;
      }

      answers[selectedOption.name] = selectedOption.value;

      // Avança de passo
      quizSteps[stepIndex].classList.add('hidden');
      if (stepIndex + 1 < quizSteps.length) {
        quizSteps[stepIndex + 1].classList.remove('hidden');
      } else {
        // Mostra o resultado calculado
        showQuizResult();
      }
    });
  });

  function showQuizResult() {
    if (!quizResult) return;
    quizResult.classList.remove('hidden');

    const recommendedPlanName = document.getElementById('quizPlanName');
    const recommendedPlanDesc = document.getElementById('quizPlanDesc');
    const recommendedBtn = document.getElementById('quizCtaBtn');

    // Se a intensidade for alta ou queda avançada, recomenda o completo
    const isAdvanced = answers.intensidade === 'alta' || answers.tempo === 'mais_1ano';

    if (isAdvanced) {
      recommendedPlanName.innerHTML = `<span class="text-rose-500 font-bold">Plano Completo</span> (R$ 37,00)`;
      recommendedPlanDesc.textContent = `Pelo seu nível de queda, recomendamos o Plano Completo para reativar folículos adormecidos e bloquear o DHT com acompanhamento VIP.`;
      recommendedBtn.onclick = () => openCheckout('Plano Completo', '37,00');
    } else {
      recommendedPlanName.innerHTML = `<span class="text-emerald-500 font-bold">Plano Básico</span> (R$ 19,00) ou <span class="text-rose-500 font-bold">Completo</span>`;
      recommendedPlanDesc.textContent = `Seus folículos estão em fase inicial de enfraquecimento. O Plano Básico já é suficiente para conter a queda, mas o Completo acelerará 3x seus resultados!`;
      recommendedBtn.onclick = () => openCheckout('Plano Básico', '19,00');
    }
  }
}

/* ==========================================================================
   5. MODAL DE CHECKOUT SIMULADO COMPLETO
   ========================================================================== */
let activePlan = { name: 'Plano Completo', price: '37,00' };

function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const closeBtns = document.querySelectorAll('.close-checkout');
  const planButtons = document.querySelectorAll('[data-buy-plan]');

  if (!modal) return;

  planButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-buy-plan');
      const planPrice = btn.getAttribute('data-price');
      openCheckout(planName, planPrice);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });

  // Fechar ao clicar fora
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  // Alternância de Abas PIX / Cartão
  const tabPix = document.getElementById('tabPix');
  const tabCard = document.getElementById('tabCard');
  const viewPix = document.getElementById('viewPix');
  const viewCard = document.getElementById('viewCard');

  if (tabPix && tabCard && viewPix && viewCard) {
    tabPix.addEventListener('click', () => {
      tabPix.classList.add('border-emerald-500', 'text-emerald-600', 'bg-emerald-50');
      tabPix.classList.remove('border-transparent', 'text-slate-500');
      tabCard.classList.remove('border-emerald-500', 'text-emerald-600', 'bg-emerald-50');
      tabCard.classList.add('border-transparent', 'text-slate-500');

      viewPix.classList.remove('hidden');
      viewCard.classList.add('hidden');
    });

    tabCard.addEventListener('click', () => {
      tabCard.classList.add('border-emerald-500', 'text-emerald-600', 'bg-emerald-50');
      tabCard.classList.remove('border-transparent', 'text-slate-500');
      tabPix.classList.remove('border-emerald-500', 'text-emerald-600', 'bg-emerald-50');
      tabPix.classList.add('border-transparent', 'text-slate-500');

      viewCard.classList.remove('hidden');
      viewPix.classList.add('hidden');
    });
  }

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Simulando pagamento...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        document.getElementById('checkoutContent').classList.add('hidden');
        document.getElementById('checkoutSuccess').classList.remove('hidden');
      }, 1600);
    });
  }
}

function openCheckout(planName, price) {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  activePlan = { name: planName, price: price };

  const nameEl = document.getElementById('modalPlanName');
  const priceEl = document.getElementById('modalPlanPrice');
  const totalEl = document.getElementById('modalOrderTotal');

  if (nameEl) nameEl.textContent = planName;
  if (priceEl) priceEl.textContent = `R$ ${price}`;
  if (totalEl) totalEl.textContent = `R$ ${price}`;

  // Reseta visualização
  const contentEl = document.getElementById('checkoutContent');
  const successEl = document.getElementById('checkoutSuccess');
  if (contentEl) contentEl.classList.remove('hidden');
  if (successEl) successEl.classList.add('hidden');

  modal.classList.remove('hidden');
}

// Expõe globalmente caso seja chamado inline
window.openCheckout = openCheckout;

/* ==========================================================================
   6. NOTIFICAÇÕES DE PROVA SOCIAL FLUTUANTE
   ========================================================================== */
function initSocialProof() {
  const toast = document.getElementById('social-proof-toast');
  const toastName = document.getElementById('toast-customer');
  const toastAction = document.getElementById('toast-action');
  const toastTime = document.getElementById('toast-time');
  const toastCity = document.getElementById('toast-city');

  if (!toast) return;

  const sampleNotifications = [
    { name: 'Patrícia Rocha', city: 'São Paulo, SP', plan: 'Plano Completo (R$ 37)', time: 'há 2 minutos' },
    { name: 'Rodrigo Medeiros', city: 'Curitiba, PR', plan: 'Plano Básico (R$ 19)', time: 'há 4 minutos' },
    { name: 'Mariana Duarte', city: 'Belo Horizonte, MG', plan: 'Plano Completo (R$ 37)', time: 'há 1 minuto' },
    { name: 'Lucas Silveira', city: 'Rio de Janeiro, RJ', plan: 'Plano Completo (R$ 37)', time: 'há 6 minutos' },
    { name: 'Fernanda Albuquerque', city: 'Campinas, SP', plan: 'Plano Completo (R$ 37)', time: 'há 3 minutos' },
    { name: 'Julio Cesar Vaz', city: 'Porto Alegre, RS', plan: 'Plano Básico (R$ 19)', time: 'há 8 minutos' }
  ];

  let index = 0;

  function showNextNotification() {
    const item = sampleNotifications[index];
    index = (index + 1) % sampleNotifications.length;

    if (toastName) toastName.textContent = item.name;
    if (toastCity) toastCity.textContent = item.plan;
    if (toastAction) toastAction.textContent = `Adquiriu de ${item.city}`;
    if (toastTime) toastTime.textContent = item.time;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Primeira exibição aos 4 segundos, depois a cada 16 segundos
  setTimeout(() => {
    showNextNotification();
    setInterval(showNextNotification, 16000);
  }, 4000);
}

/* ==========================================================================
   7. MENU MOBILE RESPONSIVO
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ==========================================================================
   8. BARRA CTA FIXA AO ROLAR (STICKY BAR)
   ========================================================================== */
function initStickyCTA() {
  const stickyBar = document.getElementById('stickyBottomBar');
  if (!stickyBar) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Aparece após 450px de rolagem
    if (scrollY > 450) {
      stickyBar.classList.remove('translate-y-full');
      stickyBar.classList.add('translate-y-0');
    } else {
      stickyBar.classList.add('translate-y-full');
      stickyBar.classList.remove('translate-y-0');
    }
  });
}
