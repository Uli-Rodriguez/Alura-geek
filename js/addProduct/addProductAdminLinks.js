import { checkAdminLinks } from "../services/checkAdminLinks.js";

/* Revisa si el usuario puede acceder al menu administrador / Check if user can acces to the admin menu */

const adminMenu = document.querySelector("#adminMenu");
checkAdminLinks("all-products.html", [adminMenu]);