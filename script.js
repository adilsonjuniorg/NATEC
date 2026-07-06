'use strict';

/* =========================================================
   MENU E NAVEGAÇÃO
========================================================= */

const nav = document.getElementById('main-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

function closeMenu() {
  nav?.classList.remove('open');
  nav?.classList.remove('is-open');

  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Abrir menu');
}

menuToggle?.addEventListener('click', () => {
  if (!nav) return;

  const willOpen = !nav.classList.contains('open');

  nav.classList.toggle('open', willOpen);
  nav.classList.toggle('is-open', willOpen);

  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute(
    'aria-label',
    willOpen ? 'Fechar menu' : 'Abrir menu'
  );
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1100) {
    closeMenu();
  }
});

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (firstEntry, secondEntry) =>
            secondEntry.intersectionRatio -
            firstEntry.intersectionRatio
        )[0];

      if (!visibleEntry) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') ===
            `#${visibleEntry.target.id}`
        );
      });
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5]
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

/* =========================================================
   CARROSSEL DO EVENTO
========================================================= */

const eventSlides = [
  ...document.querySelectorAll('.event-slide')
];

const eventPrevButton = document.getElementById('event-prev');
const eventNextButton = document.getElementById('event-next');

const eventSlideStatus =
  document.getElementById('event-slide-status');

const eventCarousel =
  document.getElementById('event-carousel');

let currentEventSlide = 0;

function renderEventCarousel() {
  if (!eventSlides.length) return;

  eventSlides.forEach((slide, index) => {
    const isActive = index === currentEventSlide;

    slide.classList.toggle('active', isActive);
    slide.hidden = !isActive;
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  if (eventSlideStatus) {
    eventSlideStatus.textContent =
      `${currentEventSlide + 1} de ${eventSlides.length}`;
  }

  const hasMultipleSlides = eventSlides.length > 1;

  if (eventPrevButton) {
    eventPrevButton.disabled = !hasMultipleSlides;
  }

  if (eventNextButton) {
    eventNextButton.disabled = !hasMultipleSlides;
  }
}

function changeEventSlide(direction) {
  if (eventSlides.length < 2) return;

  currentEventSlide =
    (
      currentEventSlide +
      direction +
      eventSlides.length
    ) % eventSlides.length;

  renderEventCarousel();
}

eventPrevButton?.addEventListener('click', () => {
  changeEventSlide(-1);
});

eventNextButton?.addEventListener('click', () => {
  changeEventSlide(1);
});

eventCarousel?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    changeEventSlide(-1);
  }

  if (event.key === 'ArrowRight') {
    changeEventSlide(1);
  }
});

renderEventCarousel();

/* =========================================================
   JORNADA DO NUPI
========================================================= */

const journeyData = [
  {
    name: 'Resgate',

    tutor:
      'Doutora, resgatei o Nupi faz uns dias, mas ele vive assustado. O antigo dono deixava ele trancado numa gaiola minúscula e só dava cenoura.',

    vet:
      'Calma, vamos examiná-lo. O pessoal cai muito nesses mitos e acha que coelho é bicho de pelúcia. Gaiola estressa muito o animal e cenoura direto faz mal. É por isso que ele cresceu doente e com medo de tudo.',

    learning:
      'No resgate, o coelho precisa de segurança, alimentação adequada e um ambiente tranquilo para reduzir o estresse.'
  },

  {
    name: 'Cuidados',

    tutor:
      'Sério? Eu achava que a cenoura era suficiente! O que eu preciso mudar na alimentação e no ambiente dele para melhorar?',

    vet:
      'Primeiro, esqueça a gaiola. Ele precisa de um espaço cercado ou de um cômodo seguro para correr. Também precisa de uma toca, brinquedos próprios para roer, feno disponível o dia todo e ração em porções controladas.',

    learning:
      'Os cuidados envolvem alimentação rica em fibras, espaço para movimento, esconderijos, enriquecimento ambiental e manejo respeitoso.'
  },

  {
    name: 'Nova rotina',

    tutor:
      'Agora o Nupi está explorando o espaço, usando a toca e se alimentando melhor. Ele parece mais tranquilo e está começando a confiar em mim.',

    vet:
      'Isso mostra como a rotina faz diferença. Continue observando o comportamento dele, respeitando seu tempo e procurando orientação veterinária quando perceber alguma alteração.',

    learning:
      'Uma rotina previsível e gentil ajuda o coelho a se adaptar, reduz o medo e fortalece o vínculo com o tutor.'
  }
];

let currentJourneyStep = 0;

const journeyName =
  document.getElementById('journey-current-name');

const journeyProgressTitle =
  document.getElementById('journey-progress-title');

const tutorText =
  document.getElementById('tutor-text');

const vetText =
  document.getElementById('vet-text');

const learningText =
  document.getElementById('learning-text');

const stepButtons = [
  ...document.querySelectorAll('.step-item')
];

const journeyDots = [
  ...document.querySelectorAll('.step-dots .dot')
];

const previousStepButton =
  document.getElementById('prev-step');

const nextStepButton =
  document.getElementById('next-step');

function renderJourney() {
  const step = journeyData[currentJourneyStep];

  if (!step) return;

  if (journeyName) {
    journeyName.textContent = step.name;
  }

  if (journeyProgressTitle) {
    journeyProgressTitle.textContent =
      `Etapa ${currentJourneyStep + 1} de ${journeyData.length}`;
  }

  if (tutorText) {
    tutorText.textContent = step.tutor;
  }

  if (vetText) {
    vetText.textContent = step.vet;
  }

  if (learningText) {
    learningText.textContent = step.learning;
  }

  stepButtons.forEach((button, index) => {
    const isActive = index === currentJourneyStep;

    button.classList.toggle('active', isActive);

    button.setAttribute(
      'aria-current',
      isActive ? 'step' : 'false'
    );
  });

  journeyDots.forEach((dot, index) => {
    dot.classList.toggle(
      'active',
      index <= currentJourneyStep
    );
  });

  if (previousStepButton) {
    previousStepButton.disabled =
      currentJourneyStep === 0;
  }

  if (nextStepButton) {
    nextStepButton.textContent =
      currentJourneyStep === journeyData.length - 1
        ? 'Explorar situações →'
        : 'Próxima etapa →';
  }
}

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const requestedStep = Number(button.dataset.step);

    if (!Number.isInteger(requestedStep)) return;

    if (
      requestedStep < 0 ||
      requestedStep >= journeyData.length
    ) {
      return;
    }

    currentJourneyStep = requestedStep;
    renderJourney();
  });
});

previousStepButton?.addEventListener('click', () => {
  currentJourneyStep = Math.max(
    0,
    currentJourneyStep - 1
  );

  renderJourney();
});

nextStepButton?.addEventListener('click', () => {
  if (
    currentJourneyStep ===
    journeyData.length - 1
  ) {
    document
      .getElementById('situacoes')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    return;
  }

  currentJourneyStep += 1;
  renderJourney();
});

renderJourney();

/* =========================================================
   LEITURA EM VOZ ALTA
========================================================= */

const audioButtons = [
  ...document.querySelectorAll('.audio-button')
];

let activeAudioButton = null;

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  activeAudioButton?.classList.remove('speaking');
  activeAudioButton = null;
}

audioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.speakTarget;

    const target = targetId
      ? document.getElementById(targetId)
      : null;

    const text =
      target?.textContent?.trim() || '';

    if (!text) return;

    if (!('speechSynthesis' in window)) {
      window.alert(
        'Este navegador não oferece leitura de texto automática.'
      );

      return;
    }

    if (
      activeAudioButton === button &&
      window.speechSynthesis.speaking
    ) {
      stopSpeech();
      return;
    }

    stopSpeech();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    utterance.pitch = 1;

    activeAudioButton = button;
    button.classList.add('speaking');

    utterance.onend = stopSpeech;
    utterance.onerror = stopSpeech;

    window.speechSynthesis.speak(utterance);
  });
});

window.addEventListener('beforeunload', stopSpeech);

/* =========================================================
   SITUAÇÕES DE CUIDADO

   Não existem respostas certas ou erradas.
   O usuário observa todas as situações e compara
   as consequências.
========================================================= */

const situationsData = [
  {
    category:
      '🥕 Cenário 1 de 3 – Alimentação',

    title:
      'O Tutor está organizando a alimentação do Nupi. Observe as três situações e descubra o que acontece em cada uma delas.',

    observation:
      'Compare o alimento oferecido, a frequência e os efeitos que cada situação pode trazer para a rotina do Nupi.',

    initialMediatorTitle:
      'Orientação do Nupi',

    initialMediatorText:
      'Observe como cada alimento participa da rotina. O efeito não depende apenas do que é oferecido, mas também da quantidade e da frequência.',

    initialMediatorImage:
      'assets/nupi-thinking.png',

    initialMediatorAlt:
      'Nupi pensando sobre as opções de alimentação',

    summaryTitle:
      'A alimentação é formada pelo conjunto das escolhas',

    summary:
      'Ao comparar as cenas, é possível perceber que o feno de capim precisa permanecer disponível durante todo o dia, enquanto a ração deve ser oferecida em porções controladas e a cenoura participa apenas como petisco ocasional.',

    options: [
      {
        label:
          'Cenoura como alimento principal',

        image:
          'assets/option-cenoura.jpg',

        alt:
          'Nupi diante de uma alimentação baseada em cenoura',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Quando a cenoura ocupa o lugar principal da alimentação, o Nupi recebe muito açúcar e pouca fibra. Ela não oferece tudo de que ele precisa no cotidiano.',

        mediatorTitle:
          'O Nupi observa',

        mediatorText:
          'A cenoura pode aparecer em pequenas quantidades, mas não substitui os alimentos que sustentam a rotina diária.',

        mediatorImage:
          'assets/nupi-thinking.png',

        mediatorAlt:
          'Nupi refletindo sobre o consumo de cenoura'
      },

      {
        label:
          'Feno disponível durante o dia',

        image:
          'assets/option-feno.jpg',

        alt:
          'Nupi com feno disponível para alimentação',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Com feno de capim disponível durante todo o dia, o Nupi pode se alimentar aos poucos, receber fibras e desgastar os dentes enquanto mastiga.',

        mediatorTitle:
          'A Veterinária relaciona',

        mediatorText:
          'O feno participa da alimentação, da digestão e do desgaste dentário. Por isso, ele precisa estar acessível continuamente.',

        mediatorImage:
          'assets/story-vet.png',

        mediatorAlt:
          'Veterinária explicando a importância do feno'
      },

      {
        label:
          'Ração sempre disponível',

        image:
          'assets/option-racao.jpg',

        alt:
          'Nupi diante de um recipiente cheio de ração',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Com a ração disponível o tempo todo, o Nupi pode consumir mais alimento concentrado do que precisa e diminuir a ingestão de feno. Isso pode afetar a digestão e o desgaste natural dos dentes.',

        mediatorTitle:
          'A Veterinária explica',

        mediatorText:
          'A ração faz parte da alimentação, mas sua quantidade precisa ser controlada para não substituir o consumo de feno.',

        mediatorImage:
          'assets/story-vet.png',

        mediatorAlt:
          'Veterinária explicando o controle da ração'
      }
    ]
  },

  {
    category:
      '♡ Cenário 2 de 3 – Manejo',

    title:
      'O Tutor precisa se aproximar e cuidar do Nupi. Observe como diferentes formas de interação afetam o comportamento dele.',

    observation:
      'Observe a velocidade da aproximação, o apoio dado ao corpo do coelho e se o tempo do Nupi está sendo respeitado.',

    initialMediatorTitle:
      'Orientação da Veterinária',

    initialMediatorText:
      'O manejo não envolve apenas segurar o coelho. A forma de se aproximar, apoiar o corpo e respeitar seus sinais também interfere na confiança.',

    initialMediatorImage:
      'assets/story-vet.png',

    initialMediatorAlt:
      'Veterinária orientando sobre o manejo do Nupi',

    summaryTitle:
      'O manejo modifica a forma como o Nupi se sente',

    summary:
      'As cenas mostram que movimentos rápidos podem provocar medo e tentativa de fuga. Uma aproximação calma, com sustentação adequada do corpo e respeito ao tempo do coelho, favorece segurança e confiança.',

    options: [
      {
        label:
          'Pegar o Nupi rapidamente',

        image:
          'assets/option-rapido.jpg',

        alt:
          'Tutor tentando pegar o Nupi rapidamente',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Quando o Tutor tenta pegar o Nupi de maneira rápida, ele pode se assustar, se debater e relacionar a aproximação humana a uma experiência de ameaça.',

        mediatorTitle:
          'O Nupi demonstra',

        mediatorText:
          'Para um coelho assustado, uma aproximação repentina pode parecer a chegada de um predador.',

        mediatorImage:
          'assets/nupi-thinking.png',

        mediatorAlt:
          'Nupi refletindo sobre uma aproximação repentina'
      },

      {
        label:
          'Apoiar o corpo com segurança',

        image:
          'assets/option-seguro.jpg',

        alt:
          'Tutor segurando o Nupi com apoio adequado ao corpo',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Quando o corpo e as patas recebem apoio, o Nupi se sente mais estável. O manejo cuidadoso reduz o risco de quedas, movimentos bruscos e lesões.',

        mediatorTitle:
          'A Veterinária orienta',

        mediatorText:
          'O coelho precisa sentir que o corpo está sustentado. Segurar com firmeza não significa apertar, mas oferecer apoio seguro.',

        mediatorImage:
          'assets/story-vet.png',

        mediatorAlt:
          'Veterinária orientando como sustentar o corpo do coelho'
      },

      {
        label:
          'Esperar o Nupi se aproximar',

        image:
          'assets/option-esperar.jpg',

        alt:
          'Tutor aguardando o Nupi se aproximar no próprio ritmo',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Ao permanecer próximo e permitir que o Nupi explore no próprio ritmo, o Tutor oferece espaço para que ele reconheça o ambiente e construa confiança gradualmente.',

        mediatorTitle:
          'O Nupi percebe',

        mediatorText:
          'Quando meus sinais são respeitados, consigo explorar, me aproximar e participar da interação com menos medo.',

        mediatorImage:
          'assets/nupi-thinking.png',

        mediatorAlt:
          'Nupi observando uma aproximação tranquila'
      }
    ]
  },

  {
    category:
      '⌂ Cenário 3 de 3 – Ambiente',

    title:
      'O Tutor está preparando o espaço do Nupi. Observe como cada ambiente interfere no movimento, no descanso e na segurança.',

    observation:
      'Compare o tamanho do espaço, a presença de uma toca, a possibilidade de movimento e os estímulos que podem gerar estresse.',

    initialMediatorTitle:
      'Orientação do Nupi',

    initialMediatorText:
      'O ambiente participa do comportamento. Espaço, esconderijos, barulho e possibilidade de movimento mudam a forma como o coelho explora e descansa.',

    initialMediatorImage:
      'assets/nupi-thinking.png',

    initialMediatorAlt:
      'Nupi pensando sobre diferentes ambientes',

    summaryTitle:
      'O ambiente também comunica segurança ou ameaça',

    summary:
      'Ao observar o conjunto, percebe-se que uma gaiola pequena limita o movimento e que o barulho constante aumenta a insegurança. Um espaço protegido, amplo e com toca permite explorar, descansar e se esconder quando necessário.',

    options: [
      {
        label:
          'Permanecer em uma gaiola pequena',

        image:
          'assets/option-gaiola.jpg',

        alt:
          'Nupi dentro de uma gaiola pequena',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Em um espaço muito pequeno, o Nupi tem menos possibilidade de correr, explorar e escolher onde descansar. A limitação contínua pode aumentar o estresse.',

        mediatorTitle:
          'A Veterinária observa',

        mediatorText:
          'O espaço precisa permitir movimentos e comportamentos naturais. A gaiola não deve organizar toda a vida do coelho.',

        mediatorImage:
          'assets/story-vet.png',

        mediatorAlt:
          'Veterinária explicando os efeitos de uma gaiola pequena'
      },

      {
        label:
          'Ambiente com barulho constante',

        image:
          'assets/option-barulho.jpg',

        alt:
          'Nupi assustado em um ambiente com muito barulho',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Em um ambiente com ruídos e sustos frequentes, o Nupi pode permanecer mais alerta, esconder-se por mais tempo e ter dificuldade para descansar.',

        mediatorTitle:
          'A Veterinária relaciona',

        mediatorText:
          'Coelhos percebem sons e movimentos com muita atenção. Um espaço previsível e tranquilo contribui para a adaptação.',

        mediatorImage:
          'assets/story-vet.png',

        mediatorAlt:
          'Veterinária explicando os efeitos do barulho'
      },

      {
        label:
          'Espaço amplo, protegido e com toca',

        image:
          'assets/hero-nupi.png',

        alt:
          'Nupi em um ambiente acolhedor com espaço, toca e alimentação',

        consequenceTitle:
          'Consequência observada',

        consequence:
          'Com espaço para se movimentar e uma toca disponível, o Nupi pode alternar exploração, descanso e proteção conforme se sente naquele momento.',

        mediatorTitle:
          'O Nupi mostra',

        mediatorText:
          'A toca oferece um lugar seguro. Quando me sinto tranquilo, posso sair para explorar o restante do ambiente.',

        mediatorImage:
          'assets/hero-nupi.png',

        mediatorAlt:
          'Nupi tranquilo em um ambiente acolhedor'
      }
    ]
  }
];

let currentScenario = 0;
let activeSituationIndex = null;
let finalOverviewShown = false;

const observedSituations =
  situationsData.map(() => new Set());

const revealedSummaries =
  situationsData.map(() => false);

const scenarioCategory =
  document.getElementById('scenario-category');

const observedCount =
  document.getElementById('observed-count');

const situationsBar =
  document.getElementById('situations-bar');

const scenarioNumber =
  document.getElementById('scenario-number');

const scenarioText =
  document.getElementById('scenario-text');

const situationsOptions =
  document.getElementById('situations-options');

const consequenceBox =
  document.getElementById('consequence-box');

const observationBox =
  document.getElementById('observation-box');

const mediatorImage =
  document.getElementById('mediator-image');

const mediatorTitle =
  document.getElementById('mediator-title');

const mediatorText =
  document.getElementById('mediator-text');

const situationSummary =
  document.getElementById('situation-summary');

const summaryTitle =
  document.getElementById('summary-title');

const summaryText =
  document.getElementById('summary-text');

const reviewScenarioButton =
  document.getElementById('review-scenario');

const nextScenarioButton =
  document.getElementById('next-scenario');

const situationsProgressBar =
  situationsBar?.closest('.bar');

function updateMediator(
  title,
  text,
  image,
  alt
) {
  if (mediatorTitle) {
    mediatorTitle.textContent = title;
  }

  if (mediatorText) {
    mediatorText.textContent = text;
  }

  if (mediatorImage) {
    mediatorImage.src = image;

    mediatorImage.alt =
      alt || 'Personagem orientando a observação';
  }
}

function updateSituationProgress() {
  const scenario = situationsData[currentScenario];

  if (!scenario) return;

  const observedTotal =
    observedSituations[currentScenario].size;

  const optionsTotal =
    scenario.options.length;

  const percentage = optionsTotal
    ? (observedTotal / optionsTotal) * 100
    : 0;

  if (observedCount) {
    observedCount.textContent =
      `${observedTotal} de ${optionsTotal} observadas`;
  }

  if (situationsBar) {
    situationsBar.style.width = `${percentage}%`;
  }

  if (situationsProgressBar) {
    situationsProgressBar.setAttribute(
      'aria-valuemin',
      '0'
    );

    situationsProgressBar.setAttribute(
      'aria-valuemax',
      String(optionsTotal)
    );

    situationsProgressBar.setAttribute(
      'aria-valuenow',
      String(observedTotal)
    );

    situationsProgressBar.setAttribute(
      'aria-label',
      `${observedTotal} de ${optionsTotal} situações observadas neste cenário`
    );
  }

  if (!nextScenarioButton) return;

  const allObserved =
    observedTotal === optionsTotal;

  if (finalOverviewShown) {
    nextScenarioButton.textContent =
      'Observação concluída';

    nextScenarioButton.disabled = true;
    return;
  }

  nextScenarioButton.disabled = !allObserved;

  if (!allObserved) {
    nextScenarioButton.textContent =
      'Observe todas as situações';
  } else if (!revealedSummaries[currentScenario]) {
    nextScenarioButton.textContent =
      'Ver o cenário completo →';
  } else if (
    currentScenario <
    situationsData.length - 1
  ) {
    nextScenarioButton.textContent =
      'Próximo cenário →';
  } else {
    nextScenarioButton.textContent =
      'Concluir observação →';
  }
}

function renderSituationOptions() {
  const scenario = situationsData[currentScenario];

  if (!scenario || !situationsOptions) return;

  situationsOptions.innerHTML = '';

  scenario.options.forEach((option, index) => {
    const isObserved =
      observedSituations[currentScenario].has(index);

    const isActive =
      activeSituationIndex === index;

    const card =
      document.createElement('button');

    card.type = 'button';
    card.className = 'situation-option';

    card.dataset.situationIndex =
      String(index);

    card.setAttribute(
      'aria-pressed',
      String(isActive)
    );

    card.setAttribute(
      'aria-label',
      isObserved
        ? `${option.label}. Situação já observada. Clique para rever a consequência.`
        : `${option.label}. Clique para observar esta situação.`
    );

    if (isObserved) {
      card.classList.add('observed');
    }

    /*
      Compatibilidade com as duas versões de CSS:
      .active e .selected.
    */
    if (isActive) {
      card.classList.add(
        'active',
        'selected'
      );
    }

    const image =
      document.createElement('img');

    image.src = option.image;
    image.alt = option.alt;
    image.loading = 'lazy';

    const label =
      document.createElement('strong');

    label.textContent = option.label;

    card.append(image, label);

    if (isObserved) {
      const badge =
        document.createElement('span');

      badge.className = 'observed-badge';
      badge.textContent = 'Observada';

      badge.setAttribute(
        'aria-hidden',
        'true'
      );

      card.appendChild(badge);
    }

    card.addEventListener('click', () => {
      observeSituation(index);
    });

    situationsOptions.appendChild(card);
  });
}

function showSelectedConsequence(option) {
  if (consequenceBox) {
    consequenceBox.innerHTML = '';

    const title =
      document.createElement('strong');

    title.textContent =
      option.consequenceTitle;

    const text =
      document.createElement('p');

    text.textContent =
      option.consequence;

    consequenceBox.append(title, text);
  }

  updateMediator(
    option.mediatorTitle,
    option.mediatorText,
    option.mediatorImage,
    option.mediatorAlt
  );
}

function observeSituation(index) {
  const scenario =
    situationsData[currentScenario];

  const option =
    scenario?.options[index];

  if (!option) return;

  activeSituationIndex = index;

  observedSituations[currentScenario]
    .add(index);

  showSelectedConsequence(option);
  renderSituationOptions();
  updateSituationProgress();
}

function showScenarioSummary() {
  const scenario =
    situationsData[currentScenario];

  if (!scenario) return;

  revealedSummaries[currentScenario] = true;
  activeSituationIndex = null;

  if (situationSummary) {
    situationSummary.hidden = false;
  }

  if (summaryTitle) {
    summaryTitle.textContent =
      scenario.summaryTitle;
  }

  if (summaryText) {
    summaryText.textContent =
      scenario.summary;
  }

  if (consequenceBox) {
    consequenceBox.innerHTML = '';

    const title =
      document.createElement('strong');

    title.textContent =
      'Situações comparadas';

    const text =
      document.createElement('p');

    text.textContent =
      'Você observou todas as possibilidades deste cenário. A síntese abaixo reúne as relações entre elas.';

    consequenceBox.append(title, text);
  }

  updateMediator(
    'Visão do todo',

    'Agora as cenas podem ser compreendidas em conjunto. Cada consequência ajuda a perceber como as escolhas se relacionam no cuidado diário.',

    'assets/hero-nupi.png',

    'Nupi em um ambiente acolhedor após a comparação das situações'
  );

  renderSituationOptions();
  updateSituationProgress();

  situationSummary?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

function renderScenario() {
  const scenario =
    situationsData[currentScenario];

  if (!scenario) return;

  activeSituationIndex = null;

  if (scenarioCategory) {
    scenarioCategory.textContent =
      scenario.category;
  }

  if (scenarioNumber) {
    scenarioNumber.textContent =
      String(currentScenario + 1);
  }

  if (scenarioText) {
    scenarioText.textContent =
      scenario.title;
  }

  if (observationBox) {
    observationBox.innerHTML = '';

    const title =
      document.createElement('strong');

    title.textContent =
      '◉ O que observar';

    const text =
      document.createElement('p');

    text.textContent =
      scenario.observation;

    observationBox.append(title, text);
  }

  if (consequenceBox) {
    consequenceBox.innerHTML = '';

    const title =
      document.createElement('strong');

    title.textContent =
      'Observe uma situação.';

    const text =
      document.createElement('p');

    text.textContent =
      'A consequência da cena escolhida será apresentada aqui.';

    consequenceBox.append(title, text);
  }

  updateMediator(
    scenario.initialMediatorTitle,
    scenario.initialMediatorText,
    scenario.initialMediatorImage,
    scenario.initialMediatorAlt
  );

  const summaryAlreadyRevealed =
    revealedSummaries[currentScenario];

  if (situationSummary) {
    situationSummary.hidden =
      !summaryAlreadyRevealed;
  }

  if (summaryAlreadyRevealed) {
    if (summaryTitle) {
      summaryTitle.textContent =
        scenario.summaryTitle;
    }

    if (summaryText) {
      summaryText.textContent =
        scenario.summary;
    }
  } else {
    if (summaryTitle) {
      summaryTitle.textContent =
        'O cenário completo';
    }

    if (summaryText) {
      summaryText.textContent = '';
    }
  }

  renderSituationOptions();
  updateSituationProgress();
}

function resetCurrentScenario() {
  observedSituations[currentScenario].clear();

  revealedSummaries[currentScenario] = false;

  activeSituationIndex = null;
  finalOverviewShown = false;

  renderScenario();
}

function showFinalOverview() {
  finalOverviewShown = true;
  activeSituationIndex = null;

  if (situationSummary) {
    situationSummary.hidden = false;
  }

  if (summaryTitle) {
    summaryTitle.textContent =
      'Alimentação, manejo e ambiente fazem parte do mesmo cuidado';
  }

  if (summaryText) {
    summaryText.textContent =
      'Ao observar todos os cenários, percebe-se que o bem-estar do Nupi é construído pelo conjunto da rotina: alimentação adequada, aproximação respeitosa, manejo seguro e um ambiente que permita movimento, descanso e proteção.';
  }

  if (consequenceBox) {
    consequenceBox.innerHTML = '';

    const title =
      document.createElement('strong');

    title.textContent =
      'Percurso de observação concluído';

    const text =
      document.createElement('p');

    text.textContent =
      'As situações não foram tratadas apenas como respostas certas ou erradas. Elas foram comparadas pelas consequências que produzem na vida do Nupi.';

    consequenceBox.append(title, text);
  }

  updateMediator(
    'Percurso concluído',

    'Você observou as consequências, comparou as situações e reuniu os elementos do cuidado em uma visão mais ampla.',

    'assets/hero-nupi.png',

    'Nupi tranquilo em um ambiente acolhedor após a conclusão do percurso'
  );

  renderSituationOptions();
  updateSituationProgress();

  situationSummary?.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

reviewScenarioButton?.addEventListener(
  'click',
  resetCurrentScenario
);

nextScenarioButton?.addEventListener(
  'click',
  () => {
    const scenario =
      situationsData[currentScenario];

    if (!scenario) return;

    const allObserved =
      observedSituations[currentScenario].size ===
      scenario.options.length;

    if (!allObserved) return;

    if (!revealedSummaries[currentScenario]) {
      showScenarioSummary();
      return;
    }

    if (
      currentScenario <
      situationsData.length - 1
    ) {
      currentScenario += 1;
      finalOverviewShown = false;

      renderScenario();
      return;
    }

    if (!finalOverviewShown) {
      showFinalOverview();
    }
  }
);

renderScenario();

/* =========================================================
   COPIAR INSTAGRAM
========================================================= */

async function copyText(text) {
  if (
    navigator.clipboard &&
    window.isSecureContext
  ) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryInput =
    document.createElement('textarea');

  temporaryInput.value = text;

  temporaryInput.setAttribute(
    'readonly',
    ''
  );

  temporaryInput.style.position = 'fixed';
  temporaryInput.style.opacity = '0';
  temporaryInput.style.pointerEvents = 'none';

  document.body.appendChild(temporaryInput);

  temporaryInput.select();

  const copied =
    document.execCommand('copy');

  temporaryInput.remove();

  if (!copied) {
    throw new Error(
      'Não foi possível copiar o texto.'
    );
  }
}

function setupCopyInstagram(
  buttonId,
  statusId
) {
  const button =
    document.getElementById(buttonId);

  const status =
    document.getElementById(statusId);

  let statusTimer = null;

  button?.addEventListener(
    'click',
    async () => {
      window.clearTimeout(statusTimer);

      try {
        await copyText('@natec.ufc');

        if (status) {
          status.textContent =
            'Instagram copiado: @natec.ufc';
        }
      } catch (error) {
        if (status) {
          status.textContent =
            'Instagram: @natec.ufc';
        }
      }

      statusTimer = window.setTimeout(
        () => {
          if (status) {
            status.textContent = '';
          }
        },
        4000
      );
    }
  );
}

setupCopyInstagram(
  'copy-instagram',
  'copy-status'
);

setupCopyInstagram(
  'copy-instagram-event',
  'copy-status-event'
);