import { loadProduct } from "../controllers/loadProducts.js"

/* Muestra los productos del inicio / Show the home products */
const showIndexProducts = async(sectionId, sectionDB) => {
    try {

        /* Selecciona la lista de los productos (por categoria) / Select the products list (by category) */
        const productsList = document.querySelector(`#${sectionId}`);

        /* Consigue los productos desde la base de datos / Get the products from the database */
        const products = await loadProduct(sectionDB, true, 6);

        /* Muestra los productos en su respectiva lista / Show the products on it's own list */
        for(let i = 0; i < products.length; i++) {
            if(i >= (products.length - 2)) {
                products[i].classList.add("products__card-mobile")
            }
            productsList.appendChild(products[i]);
        }

        /* Muestra que termino de cargar / Show that we've finished loading this section */
        const productsSection = productsList.closest(".products-container");
        productsSection.querySelector(".loading-gif").classList.add("hide-item");
    } catch (err) {
        console.log(err)
    }
}

showIndexProducts("starWarsProducts", "star-wars");
showIndexProducts("consolesProducts", "consoles");
showIndexProducts("otherProducts", "other");