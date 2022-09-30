import { checkAdminLinks } from "../services/checkAdminLinks.js";

const adminMenu = document.querySelector("#productsAdminLink");
checkAdminLinks("all-products.html", [adminMenu]);