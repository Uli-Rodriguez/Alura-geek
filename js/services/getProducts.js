import { dataBaseURL } from "../dataBaseURL.js";

export async function getProduct (filter = null, productsByCategories = false) {
    try {

        /* Si no hay ningun requisito de busqueda / If thre is not any search requirements */
        if(!filter) {
            const data = await fetch(`${dataBaseURL}/products`);
            return data;

        /* Si los productos se requieren filtrados por categorias / If the products are required by categories */
        } else if(productsByCategories) {
            const data = await fetch(`${dataBaseURL}/products?category=${filter}`);
            return data;

        /* Trae todos los productos / Get all the products */
        } else {
            const data = await fetch(`${dataBaseURL}/products?q=${filter}`);
            return data;
        }
    } catch(err) {

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