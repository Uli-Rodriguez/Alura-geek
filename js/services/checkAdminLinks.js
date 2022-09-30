import { getCookies } from "../getCookies.js";

export const checkAdminLinks = (link, adminLink) => {
    adminLink.forEach(element => {
        element.addEventListener("click", () => {
            const cookies = getCookies();

            /* Valida si el usuario puede navegar / Validate if the user can navigate to that link */
            if(cookies && cookies.valid) {
                window.location.href = link;
            } else {

                /* Manda al usuario a autenticarse / Send the user to autenticate */
                window.location.href = "login.html";
            }
        })
    });
}