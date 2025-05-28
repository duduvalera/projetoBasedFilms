function initMovieFilter() {
  const menuItens = document.querySelectorAll(".menu-principal .item");

  function filterMovies(category) {
    const movieItens = document.querySelectorAll(".filme");
    movieItens.forEach((movieItem) => {
      if (movieItem.classList.contains(category) || category === "todos") {
        movieItem.classList.remove("hide");

        setTimeout(() => {
          movieItem.classList.remove("hidden");
        }, 300);
      } else {
        movieItem.classList.add("hide");

        setTimeout(() => {
          movieItem.classList.add("hidden");
        }, 300);
      }
    });
  }

  menuItens.forEach((menuItem) => {
    menuItem.addEventListener("click", function (event) {
      event.preventDefault();

      const movieCategory = event.target.dataset.category;
      filterMovies(movieCategory);
    });
  });
}

initMovieFilter();

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
