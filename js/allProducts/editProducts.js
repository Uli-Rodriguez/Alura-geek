import { getCookies } from "../getCookies.js";

export const editProduct = (editLink, id) => {
    editLink.addEventListener("click", () => {
        const cookies = getCookies();

        /* Permitir editar solo si el usuario es valido / Allow edit only if user is valid */
        if(cookies && cookies.valid) {

            /* Guarda la id del producto que queremos editar y redirecciona el usuario / Save the product id we want to editand redirect the user */
            document.cookie = `editDB = ${id};`;
            location.href = "add-product.html";
        } else {
            location.href = "login.html";
        }
    })
}