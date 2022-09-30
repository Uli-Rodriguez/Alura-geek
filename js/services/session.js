import { dataBaseURL } from "../dataBaseURL.js"

export const validateUser = async (inputName, inputPassword) => {

    /* Muestra que se esta cargando / Show we are loading */
    const loadingGif = document.querySelector(".loading-gif");
    loadingGif.classList.remove("hide-item");
    loadingGif.classList.add("loading-gif-show");
    try {

        /* Consigue los datos del usuario administrador / Get the admin user data */
        const response = await fetch(`${dataBaseURL}/adminUser`);
        if(!response.ok) {
            throw new Error(response.status);
        }
        const userAdmin = await response.json();

        /* Revisa si el usuario y la contraseña son correctas / Check if the user and the password are correct */
        const userName = userAdmin["userName"];
        const userPassword = userAdmin["password"];
        const validity = inputName === userName && inputPassword === userPassword;
        if (validity) {

            /* Valida al usuario por 2 horas / Validate the user for 2 hours */
            document.cookie = `valid = ${validity};path=/;max-age=${60*60*2};`;
        }

        /* Muestra que terminamos de cargar / Show we've finished loading */
        loadingGif.classList.remove("loading-gif-show");
        loadingGif.classList.add("hide-item");
        return validity;
    } catch (err) {

        /* Muestra que terminamos de cargar / Show we've finished loading */
        loadingGif.classList.remove("loading-gif-show");
        loadingGif.classList.add("hide-item");

        /* Muestra al usuario que hubo un error / Show the user we've an error */
        Swal.fire({
            titleText: err,
            text: "Lo sentimos, al parecer se produjo un error, por favor intente de nuevo",
            icon: "error",
            color: "#464646",
            confirmButtonText: "Entendido",
            customClass: {
                popup: "alert-main-font",
                title: "alert-main-font",
                container: "alert-main-font",
                confirmButton: "alert-confirm-btn",
            }
        });
    }
}