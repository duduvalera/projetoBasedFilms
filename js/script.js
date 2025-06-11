function initMovieFilter() {
  const menuItens = document.querySelectorAll(".menu-principal .item");

  function filterMovies(category) {
    const arrayFilmesGenero = listaFilmes.filter((filme) => {
      if (category === "todos") {
        return filme;
      } else {
        return filme.genero === category;
      }
    });
    carregarFilmes(arrayFilmesGenero);
  }

  menuItens.forEach((menuItem) => {
    menuItem.addEventListener("click", function (event) {
      event.preventDefault();

      const movieCategory = event.target.dataset.category;
      filterMovies(movieCategory);
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
  initMovieFilter();
  initSoftScroll();
}

function verificarCarregamentodaPagina() {
  window.addEventListener("load", () => {
    console.log("Carregamento concluído");
    carregarFilmes(listaFilmes);
  });
}

verificarCarregamentodaPagina();

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
    "2h",
    16,
    "drama"
  ),
  new Filmes(
    "O Cavaleiro das trevas",
    "./img/batmanct1.jpg",
    9.4,
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
    "2h",
    16,
    "fantasia"
  ),
  new Filmes(
    "O Mentiroso",
    "./img/umsonhodeliberdade.jpg",
    9.4,
    1976,
    "2h30m",
    14,
    "comedia"
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
  new Filmes(
    "O Cavaleiro das trevas",
    "./img/batmanct1.jpg",
    9.4,
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
