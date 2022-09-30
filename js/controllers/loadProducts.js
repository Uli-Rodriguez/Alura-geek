import { getProduct } from "../services/getProducts.js";
import { productsDetails } from "../services/productsDetails.js";
import { deleteProduct } from "../services/deleteProduct.js";
import { editProduct } from "../allProducts/editProducts.js";

/* Preparamos los productos que nos da el servidor para ser mostrados / Prepare the products to be shown */
export const loadProduct = async(filter = null, byCategory = false, amount = null) => {
    try {
        /* Pedimos los productos al servidor / Request the products to the server */
        const products = await (await getProduct(filter, byCategory)).json();
        /* Cargamos los productos individualmente / Load the products one by one */
        const cardsLoaded = [];
        /* Si no hay una cantidad maxima pedida, preparamos todos los productos recibidos */
        /* If there is not a requested max amount, we load all the products */
        const iterations = amount || products.length;

        /* Cargar la mayor cantidad productos solicitados posibles / Load the biggest amount of products available */
        for(let i = 0; i < iterations && i < products.length; i++) {
            
            /* Creamos una tarjeta del producto / Create a product card */
            const card = document.createElement("li");
            card.classList.add("products__card");

            /* Cargamos los datos del producto a la tarjeta / Load product data to the card */
            card.innerHTML = 
                `<img src="${products[i].img}" alt="Imagen del producto ${products[i].name}" class="products__card__img">
                <img src="assets/images/delete-icon.png" alt="Eliminar producto" class="products__card__delete hide-item delete" data-admin="editDB">
                <img src="assets/images/edit-icon.png" alt="Editar producto" class="products__card__edit edit hide-item" data-admin="editDB">
                <p class="products__card__name">${products[i].name}</p>
                <div class="products__card__price-container">
                    <p class="products__card__price">${products[i].price}</p>
                </div>
                <p class="products__card__details" data-product_id="${products[i].id}">Ver producto</p>`;
            
            /* Añadimos las funcionalidades de los productos / Add the products features */
            productsDetails(card.querySelector("[data-product_id]"));
            deleteProduct(card.querySelector(".delete"), products[i].id);
            editProduct(card.querySelector(".edit"), products[i].id);

            /* Guardamos el producto cargado / Save the product loaded */
            cardsLoaded.push(card);
        }

        /* Devolver los productos cargados / Return loaded products */
        return cardsLoaded;
    } catch(err) {
        console.log(err);
    }
}