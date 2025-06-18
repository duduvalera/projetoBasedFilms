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
      const inputHiddenPesquisa = (document.querySelector("#categoria").value =
        movieCategory);

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

initAccordion();

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
              <img src="./img/nr16-auto.png" width="20" alt="">
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
  });
}

verificarCarregamentodaPagina();

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
    "Rocky: Um Lutador",
    "./img/rocky.jpg",
    8.1,
    1976,
    "2h",
    16,
    "drama"
  ),
  new Filmes(
    "Um Sonho de Liberdade",
    "./img/umsonhodeliberdade.jpg",
    9.4,
    1976,
    "2h30m",
    14,
    "drama"
  ),
  new Filmes(
    "Interestelar",
    "./img/interestelar.jpg",
    8.1,
    1976,
    "2h40m",
    0,
    "drama"
  ),
  new Filmes(
    "O Cavaleiro das trevas",
    "./img/batmanct1.jpg",
    8.8,
    1976,
    "2h30m",
    14,
    "suspense"
  ),
  new Filmes(
    "O Senhor dos Anéis: A Sociedade do Anel",
    "./img/rocky.jpg",
    8.1,
    1976,
    "3h",
    16,
    "fantasia"
  ),
  new Filmes(
    "O Mentiroso",
    "./img/umsonhodeliberdade.jpg",
    9.4,
    1976,
    "1h40m",
    14,
    "comedia"
  ),
  new Filmes(
    "Interestelar",
    "./img/interestelar.jpg",
    8.1,
    1976,
    "1h20m",
    16,
    "drama"
  ),
  new Filmes(
    "Seven",
    "./img/batmanct1.jpg",
    7.7,
    1976,
    "2h30m",
    14,
    "suspense"
  ),
  new Filmes(
    "Interestelar",
    "./img/interestelar.jpg",
    8.1,
    1976,
    "2h",
    16,
    "drama"
  ),
];
