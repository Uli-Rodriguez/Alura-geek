import { checkAdminLinks } from "../services/checkAdminLinks.js";

/* Revisa los links de administrador de la seccion todos los productos */
/* Check the admin links of the all products section */
const addProductLink = document.querySelector("#addProductLink");

checkAdminLinks("add-product.html", [addProductLink]);

/* Indicar que vamos a añadir, no editar / Indicate we are going to add, not edit */
addProductLink.addEventListener("click", () => {
    document.cookie = "editDB = false;";
})