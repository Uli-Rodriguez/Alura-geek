import {getCookies} from "../getCookies.js";

window.addEventListener("load", validateAdmin());

export function validateAdmin() {
    const cookies = getCookies();

    /* Consigue todas las caracteristicas unicas del administrador / Get all the admin only features */
    const adminPowers = document.querySelectorAll("[data-admin]")

    /* Si el usuario esta autenticado / If the user is autenticated */
    if (cookies && cookies.valid) {

        /* Muestra estas caracteristicas / Show this features */
        adminPowers.forEach(power => {
            if(power.dataset.admin === "logout"){
                power.classList.add("hide-item")
            } else if (power.dataset.admin === "login" || (power.dataset.admin === "editDB" && location.pathname === "/all-products.html")) {
                power.classList.remove("hide-item")
            }
        })
    } else {

        /* Manda a autenticar al usuario / Send the user to autenticate */
        adminPowers.forEach(power => {
            if(power.dataset.admin === "logout"){
                power.classList.remove("hide-item")
            } else {
                power.classList.add("hide-item")
            }
        })
    }
}
