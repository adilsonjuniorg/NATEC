document.addEventListener("DOMContentLoaded", () => {
  const desafios = Array.from(
    document.querySelectorAll(".tela-desafio")
  );

  const botaoVoltar = document.getElementById(
    "btn-voltar-desafio"
  );

  const botaoAvancar = document.getElementById(
    "btn-avancar-desafio"
  );

  const imagensNupi = {
    curioso: "img/nupi_curioso.png",
    atencao: "img/nupi_atencao.png",
    explicando: "img/nupi_explicando.png"
  };

  let indiceAtual = desafios.findIndex((desafio) =>
    desafio.classList.contains("ativa")
  );

  if (indiceAtual === -1) {
    indiceAtual = 0;
  }

  /**
   * Exibe somente o desafio correspondente ao índice informado.
   */
  function mostrarDesafio(novoIndice) {
    if (
      novoIndice < 0 ||
      novoIndice >= desafios.length
    ) {
      return;
    }

    desafios.forEach((desafio, indice) => {
      const estaAtivo = indice === novoIndice;

      desafio.classList.toggle("ativa", estaAtivo);
      desafio.setAttribute(
        "aria-hidden",
        String(!estaAtivo)
      );
    });

    indiceAtual = novoIndice;

    atualizarControles();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /**
   * Atualiza a imagem e o texto alternativo do Nupi.
   */
  function atualizarNupi(
    desafio,
    estado
  ) {
    const imagemNupi = desafio.querySelector(
      ".imagem-nupi"
    );

    if (!imagemNupi) {
      return;
    }

    if (estado === "atencao") {
      imagemNupi.src = imagensNupi.atencao;
      imagemNupi.alt =
        "Nupi preocupado, oferecendo uma orientação";
      return;
    }

    if (estado === "explicando") {
      imagemNupi.src = imagensNupi.explicando;
      imagemNupi.alt =
        "Nupi alegre, explicando a resposta correta";
      return;
    }

    imagemNupi.src = imagensNupi.curioso;
    imagemNupi.alt =
      "Nupi curioso, aguardando a resposta";
  }

  /**
   * Esconde todos os feedbacks da etapa.
   */
  function esconderFeedbacks(desafio) {
    const feedbacks = desafio.querySelectorAll(
      ".feedback"
    );

    feedbacks.forEach((feedback) => {
      feedback.hidden = true;
    });
  }

  /**
   * Remove o destaque de todas as opções da etapa.
   */
  function limparSelecao(desafio) {
    const opcoes = desafio.querySelectorAll(
      ".opcao-desafio"
    );

    opcoes.forEach((opcao) => {
      opcao.classList.remove(
        "opcao-selecionada",
        "opcao-incorreta-selecionada",
        "opcao-correta-selecionada"
      );

      opcao.setAttribute(
        "aria-pressed",
        "false"
      );
    });
  }

  /**
   * Bloqueia todas as opções depois da resposta correta.
   */
  function bloquearOpcoes(desafio) {
    const opcoes = desafio.querySelectorAll(
      ".opcao-desafio"
    );

    opcoes.forEach((opcao) => {
      opcao.disabled = true;
    });
  }

  /**
   * Exibe o feedback correspondente à opção clicada.
   */
  function mostrarFeedback(
    desafio,
    idFeedback
  ) {
    esconderFeedbacks(desafio);

    const mensagemInicial = desafio.querySelector(
      ".mensagem-inicial"
    );

    if (mensagemInicial) {
      mensagemInicial.hidden = true;
    }

    const feedbackSelecionado =
      document.getElementById(idFeedback);

    if (feedbackSelecionado) {
      feedbackSelecionado.hidden = false;
    }
  }

  /**
   * Processa a opção escolhida pelo usuário.
   */
  function selecionarOpcao(
    desafio,
    opcao
  ) {
    if (
      desafio.dataset.concluido === "true"
    ) {
      return;
    }

    const resposta =
      opcao.dataset.resposta;

    const idFeedback =
      opcao.dataset.feedback;

    limparSelecao(desafio);

    opcao.classList.add(
      "opcao-selecionada"
    );

    opcao.setAttribute(
      "aria-pressed",
      "true"
    );

    mostrarFeedback(
      desafio,
      idFeedback
    );

    if (resposta === "correta") {
      opcao.classList.add(
        "opcao-correta-selecionada"
      );

      desafio.dataset.concluido = "true";

      atualizarNupi(
        desafio,
        "explicando"
      );

      bloquearOpcoes(desafio);
      atualizarControles();

      return;
    }

    opcao.classList.add(
      "opcao-incorreta-selecionada"
    );

    atualizarNupi(
      desafio,
      "atencao"
    );

    atualizarControles();
  }

  /**
   * Atualiza os estados dos botões Voltar e Avançar.
   */
  function atualizarControles() {
    const desafioAtual =
      desafios[indiceAtual];

    const estaConcluido =
      desafioAtual?.dataset.concluido === "true";

    const estaNoPrimeiro =
      indiceAtual === 0;

    const estaNoUltimo =
      indiceAtual === desafios.length - 1;

    if (botaoVoltar) {
      botaoVoltar.disabled =
        estaNoPrimeiro;
    }

    if (botaoAvancar) {
      botaoAvancar.disabled =
        !estaConcluido;

      botaoAvancar.textContent =
        estaNoUltimo
          ? "Concluir desafio"
          : "Avançar";
    }
  }

  /**
   * Configura os cliques nas opções de todas as etapas.
   */
  desafios.forEach((desafio) => {
    desafio.dataset.concluido = "false";

    const opcoes = desafio.querySelectorAll(
      ".opcao-desafio"
    );

    opcoes.forEach((opcao) => {
      opcao.setAttribute(
        "aria-pressed",
        "false"
      );

      opcao.addEventListener(
        "click",
        () => {
          selecionarOpcao(
            desafio,
            opcao
          );
        }
      );
    });

    atualizarNupi(
      desafio,
      "curioso"
    );
  });

  /**
   * Retorna ao desafio anterior.
   */
  if (botaoVoltar) {
    botaoVoltar.addEventListener(
      "click",
      () => {
        mostrarDesafio(
          indiceAtual - 1
        );
      }
    );
  }

  /**
   * Avança somente depois que a resposta correta for escolhida.
   */
  if (botaoAvancar) {
    botaoAvancar.addEventListener(
      "click",
      () => {
        const desafioAtual =
          desafios[indiceAtual];

        const estaConcluido =
          desafioAtual?.dataset.concluido === "true";

        if (!estaConcluido) {
          return;
        }

        const estaNoUltimo =
          indiceAtual === desafios.length - 1;

        if (estaNoUltimo) {
          window.location.href =
            "natec.html";

          return;
        }

        mostrarDesafio(
          indiceAtual + 1
        );
      }
    );
  }

  mostrarDesafio(indiceAtual);
});