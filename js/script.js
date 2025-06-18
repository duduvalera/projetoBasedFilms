const inputHiddenPesquisa = document.querySelector("#categoria");

function filterMovies(category) {
  let arrayFilmesGenero = listaFilmes.filter((filme) => {
    if (category === "todos") {
      return filme;
    } else {
      return filme.genero === category;
    }
  });

  return arrayFilmesGenero;
}

function initMovieFilter() {
  const menuItens = document.querySelectorAll(".menu-principal .item");

  menuItens.forEach((menuItem) => {
    menuItem.addEventListener("click", function (event) {
      event.preventDefault();

      const movieCategory = event.target.dataset.category;
      inputHiddenPesquisa.value = movieCategory;

      let arrayFiltrado = filterMovies(movieCategory);
      carregarFilmes(arrayFiltrado);
    });
  });
}

function initAccordion() {
  const titulosFilme = document.querySelectorAll(".titulo h3");

  if (titulosFilme.length) {
    titulosFilme[0].classList.add("ativo");
    titulosFilme[0].parentElement.nextElementSibling.classList.add("ativo");

    function mostrarDescricao(tituloFilme) {
      this.classList.toggle("ativo");
      this.parentElement.nextElementSibling.classList.toggle("ativo");
    }

    titulosFilme.forEach((tituloFilme) => {
      tituloFilme.addEventListener("click", mostrarDescricao);
    });
  }
}

function initSoftScroll() {
  const movieItens = document.querySelectorAll(".filmes .filme");
  const windowHeight = window.innerHeight * 0.6;

  function scrollItens() {
    movieItens.forEach((movieItem) => {
      const movieTop = movieItem.getBoundingClientRect().top;

      const isSectionVisible = movieTop - windowHeight < 0;
      if (isSectionVisible) {
        movieItem.classList.add("ativo");
      } else {
        movieItem.classList.remove("ativo");
        movieItem.querySelector(".titulo > h3").classList.contains("ativo")
          ? movieItem.querySelector(".titulo h3").classList.remove("ativo")
          : "";
        movieItem.querySelector(".descricao").classList.contains("ativo")
          ? movieItem.querySelector(".descricao").classList.remove("ativo")
          : "";
      }
    });
  }

  scrollItens();

  window.addEventListener("scroll", scrollItens);
}

const divFilmes = document.querySelector(".filmes");
function carregarFilmes(listaFilmes) {
  divFilmes.innerHTML = "";
  divFilmes.innerHTML = listaFilmes
    .map((filme) => {
      let imgClassificacao;
      switch (filme.classificacao) {
        case 10:
          imgClassificacao = "./img/nr10-auto.png";
          break;
        case 12:
          imgClassificacao = "./img/Classind_A12.svg.png";
          break;
        case 14:
          imgClassificacao = "./img/nr14-auto.png";
          break;
        case 16:
          imgClassificacao = "./img/nr16-auto.png";
          break;
        case 18:
          imgClassificacao = "./img/nr18-auto.png";
          break;
        default:
          imgClassificacao = "./img/classificacao-livre-logo.png";
          break;
      }

      return `
   <div class="filme ${filme.genero}">
            <div class="nota">
              <img src="./img/IMDB_Logo_2016.svg.png" width="42" alt="">

              <span>${filme.nota}</span>
            </div>
            <div class="imagem">
              <img src="${filme.capa}" width="300" height="450" height="450" alt="">
            </div>
            <div class="titulo">
              <h3>${filme.titulo}</h3>
            </div>
            <div class="descricao">
              <img src="${imgClassificacao}" width="20" alt="">
              <span>${filme.duracao}</span>
              <span>${filme.ano}</span>
            </div>
          </div>
   `;
    })
    .join("");

  initSoftScroll();
}

function verificarCarregamentodaPagina() {
  window.addEventListener("load", () => {
    console.log("Carregamento concluído");
    carregarFilmes(listaFilmes);
    initMovieFilter();
    initAccordion();
  });
}

verificarCarregamentodaPagina();

const inputPesquisa = document.querySelector("#pesquisa");

inputPesquisa.addEventListener("keyup", function (event) {
  let inputPesquisaValor = event.target.value;
  let resultadoPesquisa = listaFilmes.filter((filme) => {
    return filme.titulo
      .toLowerCase()
      .includes(inputPesquisaValor.toLowerCase());
  });

  carregarFilmes(resultadoPesquisa);
  initAccordion();
});

const barraPesquisa = document.querySelector("#form-pesquisa");

barraPesquisa.addEventListener("submit", function (event) {
  event.preventDefault();
  inputHiddenPesquisa.value = "todos";
  let inputPesquisa = event.target.children.pesquisa;
  let inputPesquisaValor = inputPesquisa.value;
  let resultadoPesquisa = listaFilmes.filter((filme) => {
    return filme.titulo
      .toLowerCase()
      .includes(inputPesquisaValor.toLowerCase());
  });

  carregarFilmes(resultadoPesquisa);
  initAccordion();
});

const filtrosPesquisa = document.querySelector("#filtros-pesquisa");

function converterDuracaoParaMinutos(duracao) {
  const horasMatch = duracao.match(/(\d+)h/);
  const minutosMatch = duracao.match(/(\d+)m/);

  const horas = horasMatch ? parseInt(horasMatch[1], 10) : 0;
  const minutos = minutosMatch ? parseInt(minutosMatch[1], 10) : 0;

  return horas * 60 + minutos;
}

filtrosPesquisa.addEventListener("submit", function (event) {
  event.preventDefault();
  const dadosFormulario = new FormData(filtrosPesquisa);
  let ordemAlfabetica = dadosFormulario.get("ordem-alfabetica");
  let ordemAvaliacao = dadosFormulario.get("nota");
  let ordemDuracao = dadosFormulario.get("duracao");
  let ordemClassificacao = dadosFormulario.get("classificacao");
  let arrayFormulario = filterMovies(dadosFormulario.get("categoria"));
  // const filmeCurto = ordemDuracao
  if (ordemAlfabetica === "asc") {
    arrayFormulario.sort((a, b) => {
      if (a.titulo < b.titulo) return -1;
      if (a.titulo > b.titulo) return 1;
      return 0;
    });
  } else {
    arrayFormulario.sort((a, b) => {
      if (a.titulo > b.titulo) return -1;
      if (a.titulo < b.titulo) return 1;
      return 0;
    });
  }
  if (ordemAvaliacao === "mais-avaliados") {
    arrayFormulario.sort((a, b) => {
      if (a.nota > b.nota) return -1;
      if (a.nota < b.nota) return 1;
      return 0;
    });
  } else {
    arrayFormulario.sort((a, b) => {
      if (a.nota < b.nota) return -1;
      if (a.nota > b.nota) return 1;
      return 0;
    });
  }

  arrayFormulario = arrayFormulario.filter((filme) => {
    let duracaoEmMinutos = converterDuracaoParaMinutos(filme.duracao);
    if (ordemDuracao === "curto") return duracaoEmMinutos <= 99;
    else if (ordemDuracao === "medio")
      return duracaoEmMinutos >= 100 && duracaoEmMinutos <= 140;
    else return duracaoEmMinutos > 140;
  });

  arrayFormulario = arrayFormulario.filter((filme) => {
    if (ordemClassificacao === "livre") {
      return filme.classificacao === 0;
    }
    return +ordemClassificacao === filme.classificacao;
  });
  console.log(arrayFormulario);
  carregarFilmes(arrayFormulario);
  initAccordion();
});

function Filmes(titulo, capa, nota, ano, duracao, classificacao, genero) {
  this.titulo = titulo;
  this.capa = capa;
  this.nota = nota;
  this.ano = ano;
  this.duracao = duracao;
  this.classificacao = classificacao;
  this.genero = genero;
}

const listaFilmes = [
  new Filmes(
    "Rocky - Um Lutador",
    "./img/rocky.jpg",
    8.1,
    1976,
    "2h",
    12,
    "drama"
  ),
  new Filmes(
    "Um Sonho de Liberdade",
    "./img/umsonhodeliberdade.jpg",
    9.3,
    1976,
    "2h22m",
    16,
    "drama"
  ),

  new Filmes(
    "Rocky III - O desafio supremo",
    "./img/rocky3.jpg",
    6.9,
    1982,
    "1h39m",
    12,
    "drama"
  ),

  new Filmes(
    "Interestelar",
    "./img/interestelar.jpg",
    8.7,
    2014,
    "2h49m",
    10,
    "drama"
  ),
  new Filmes(
    "Rocky Balboa",
    "./img/rockybalboa.jpg",
    7.1,
    2006,
    "1h42m",
    12,
    "drama"
  ),

  new Filmes(
    "Batman: O Cavaleiro das trevas",
    "./img/batmanct1.jpg",
    9.0,
    2008,
    "2h32m",
    12,
    "suspense"
  ),
  new Filmes(
    "Rocky II - A revanche",
    "./img/rocky2.jpg",
    7.3,
    1979,
    "1h59m",
    12,
    "drama"
  ),
  new Filmes(
    "O Senhor dos Anéis: A Sociedade do Anel",
    "./img/senhordosaneis.jpg",
    8.9,
    2001,
    "2h58m",
    12,
    "fantasia"
  ),
  new Filmes(
    "O Mentiroso",
    "./img/mentiroso.jpg",
    6.9,
    1997,
    "1h27m",
    0,
    "comedia"
  ),
  new Filmes(
    "Gata em Teto de Zinco Quente",
    "./img/gata.jpg",
    7.9,
    1958,
    "1h48m",
    14,
    "drama"
  ),
  new Filmes("Rocky IV", "./img/rocky4.jpg", 6.9, 1985, "1h31m", 14, "drama"),
  new Filmes("Rocky V", "./img/rocky5.jpg", 5.4, 1990, "1h51m", 14, "drama"),
  new Filmes(
    "Seven - Os Sete Crimes Capitais",
    "./img/seven.jpg",
    8.6,
    1995,
    "2h07m",
    14,
    "suspense"
  ),
  new Filmes(
    "O Pentelho",
    "./img/pentelho.jpg",
    6.1,
    1996,
    "1h36m",
    0,
    "comedia"
  ),
  new Filmes(
    "Ace Ventura - Um Detetive Diferente",
    "./img/aceventura.jpg",
    6.9,
    1994,
    "1h26m",
    14,
    "comedia"
  ),
];
