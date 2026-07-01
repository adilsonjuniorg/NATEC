document.addEventListener("DOMContentLoaded", () => {
  const telas = Array.from(document.querySelectorAll(".tela"));

  const botaoComecar = document.getElementById("btn-comecar");
  const botaoVoltar = document.getElementById("btn-voltar");
  const botaoAvancar = document.getElementById("btn-avancar");
  const botaoDesafio = document.getElementById("btn-desafio");

  let indiceAtual = telas.findIndex((tela) =>
    tela.classList.contains("ativa")
  );

  // Caso nenhuma tela esteja marcada como ativa.
  if (indiceAtual === -1) {
    indiceAtual = 0;
  }

  const indiceTelaInicial = telas.findIndex(
    (tela) => tela.id === "tela_00"
  );

  const indicePrimeiraConversa = telas.findIndex(
    (tela) => tela.id === "tela_01"
  );

  const indiceUltimaConversa = telas.findIndex(
    (tela) => tela.id === "tela_06"
  );

  /*
   * Futuramente, a primeira tela do desafio deverá possuir
   * a classe "tela-desafio".
   */
  const encontrarPrimeiroDesafio = () =>
    telas.findIndex((tela) =>
      tela.classList.contains("tela-desafio")
    );

  function mostrarTela(novoIndice) {
    if (novoIndice < 0 || novoIndice >= telas.length) {
      return;
    }

    telas.forEach((tela, indice) => {
      const estaAtiva = indice === novoIndice;

      tela.classList.toggle("ativa", estaAtiva);
      tela.setAttribute("aria-hidden", String(!estaAtiva));
    });

    indiceAtual = novoIndice;

    atualizarBotoes();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  function atualizarBotoes() {
    const telaAtual = telas[indiceAtual];

    if (!telaAtual) {
      return;
    }

    const estaNaTelaInicial =
      indiceAtual === indiceTelaInicial;

    const estaNaUltimaConversa =
      indiceAtual === indiceUltimaConversa;

    const indicePrimeiroDesafio =
      encontrarPrimeiroDesafio();

    if (botaoVoltar) {
      botaoVoltar.disabled = estaNaTelaInicial;
    }

    if (botaoAvancar) {
      botaoAvancar.disabled =
        estaNaTelaInicial || estaNaUltimaConversa;
    }

    if (botaoDesafio) {
      /*
       * O desafio só será habilitado na última conversa
       * e quando suas telas existirem no HTML.
       */
      botaoDesafio.disabled =
        !estaNaUltimaConversa ||
        indicePrimeiroDesafio === -1;
    }
  }

  if (botaoComecar) {
    botaoComecar.addEventListener("click", () => {
      mostrarTela(indicePrimeiraConversa);
    });
  }

  if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
      mostrarTela(indiceAtual - 1);
    });
  }

  if (botaoAvancar) {
    botaoAvancar.addEventListener("click", () => {
      if (indiceAtual < indiceUltimaConversa) {
        mostrarTela(indiceAtual + 1);
      }
    });
  }

  if (botaoDesafio) {
    botaoDesafio.addEventListener("click", () => {
      const indicePrimeiroDesafio =
        encontrarPrimeiroDesafio();

      if (indicePrimeiroDesafio !== -1) {
        mostrarTela(indicePrimeiroDesafio);
      }
    });
  }

  mostrarTela(indiceAtual);
});
