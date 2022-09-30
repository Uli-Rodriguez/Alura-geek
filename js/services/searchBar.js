const searchBar = document.querySelector(".navbar__nav__search");

searchBar.addEventListener("submit", async e => {
    e.preventDefault();

    /* Algunas conversiones de posibles inputs a categorias / Some convertions from posible inputs to categories */
    const userInput = document.querySelector(".navbar__nav__search__input").value;
    const categoryQueries = {
        "star wars": "star-wars",
        "consolas": "consoles",
        "consola": "consoles",
        "diversos": "other" 
    }
    const query = categoryQueries[userInput.toLowerCase()] ? categoryQueries[userInput.toLowerCase()] : userInput;

    /* Guarda la busqueda / Save what we want to search */
    document.cookie = `query = ${encodeURIComponent(query)};`;
    location.href = "all-products.html";
})