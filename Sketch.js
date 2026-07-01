document.addEventListener("DOMContentLoaded", () => {
  const telas = Array.from(document.querySelectorAll(".tela"));

  const botaoComecar = document.getElementById("btn-comecar");
  const botaoVoltar = document.getElementById("btn-voltar");
  const botaoAvancar = document.getElementById("btn-avancar");
  const botaoDesafio = document.getElementById("btn-desafio");

  const indiceTelaInicial = telas.findIndex(
    (tela) => tela.id === "tela_00"
  );

  const indicePrimeiraConversa = telas.findIndex(
    (tela) => tela.id === "tela_01"
  );

  const indiceUltimaConversa = telas.findIndex(
    (tela) => tela.id === "tela_06"
  );

  let indiceAtual = telas.findIndex((tela) =>
    tela.classList.contains("ativa")
  );

  if (indiceAtual === -1) {
    indiceAtual = indiceTelaInicial >= 0 ? indiceTelaInicial : 0;
  }

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
    const estaNaTelaInicial =
      indiceAtual === indiceTelaInicial;

    const estaNaUltimaConversa =
      indiceAtual === indiceUltimaConversa;

    if (botaoVoltar) {
      botaoVoltar.disabled = estaNaTelaInicial;
    }

    if (botaoAvancar) {
      botaoAvancar.disabled =
        estaNaTelaInicial || estaNaUltimaConversa;
    }

    if (botaoDesafio) {
      botaoDesafio.disabled = !estaNaUltimaConversa;
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
      window.location.href = "desafio.html";
    });
  }

  mostrarTela(indiceAtual);
});