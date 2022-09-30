import { loadProduct } from "../controllers/loadProducts.js";
import { getCookies } from "../getCookies.js";
import { validateAdmin } from "../services/validateAdmin.js";

const showAllProducts = async(filter = null) => {
    /* Obtenemos la lista en donde se mostraran los productos / Get the list where the products will be shown */
    const productsList = document.querySelector("#productsList");
    /* Pedimos al servidor los productos / Requesting the products to the server */
    const products = await loadProduct(filter);
    /* Mostramos los productos obtenidos / Show the products we requested */
    products.forEach(product => {
        productsList.appendChild(product);
    });
    /* Terminamos de cargar / Finish loading */
    const loadingGif = document.querySelector(".loading-gif");
    loadingGif.classList.add("hide-item");
    /* Validamos si el producto puede ser editado o eliminado / Validate if the product can be deleted or edited */
    validateAdmin();
}

/* Si el usuario no busco nada, mostrar todos los productos / If the user didn't search anything, show all products */
const cookies = getCookies();
if (cookies.query) {
    showAllProducts(cookies.query);
} else {
    showAllProducts();
}