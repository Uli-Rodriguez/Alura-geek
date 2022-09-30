import { dataBaseURL } from "../dataBaseURL.js";
import { getCookies } from "../getCookies.js";
import { loadProduct } from "../controllers/loadProducts.js";

const showProduct = async () => {
    try {
        const cookies = getCookies();

        /* Consigue el producto clickeado / Get the clicked product */
        const product = await (await (await fetch(`${dataBaseURL}/products?id=${cookies.productId}`)).json());

        /* Carga los datos del producto a la página / Load the product data to the page */
        const productFull = document.querySelector(".product-full");
        productFull.querySelector(".product-full__img").src = product[0].img;
        productFull.querySelector(".product-full__info__tittle").textContent = product[0].name;
        productFull.querySelector(".product-full__info__price").textContent = product[0].price;
        productFull.querySelector(".product-full__info__description").textContent = product[0].description;

        /* Muestra mas productos de la misma categoria / Show more products of the same category */
        const productList = document.querySelector("#productsList");
        const products = await loadProduct(product[0].category, true, 6);
        for(let i = 0; i < products.length; i++) {
            if(i >= (products.length - 2)) {
                products[i].classList.add("products__card-mobile")
            }
            const productsDetails = products[i].querySelector("[data-product_id]")
            if(product[0].id != productsDetails.dataset.product_id) {
                productList.appendChild(products[i]);
            }
        }
        
    } catch (err) {
        
        /* Muestra al usuario que hubo un error / Show user there was an error */
        await Swal.fire({
            titleText: err,
            text: "Lo sentimos, al parecer se produjo un error, por favor intente de nuevo",
            icon: "error",
            color: "#464646",
            showCancelButton: true,
            confirmButtonText: "Entendido",
            customClass: {
                popup: "alert-main-font",
                title: "alert-main-font",
                container: "alert-main-font",
                confirmButton: "alert-confirm-btn",
            }
        })
    }
}

showProduct();