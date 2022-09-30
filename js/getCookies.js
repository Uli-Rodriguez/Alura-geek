export const getCookies = () => {
    try {
        /* Transforma las cookies en un array de arrays / Parse the coolies to an array of arrays */
        const cookies = document.cookie.split(/\s+/).join("").split(";").map(cookie => cookie.split("="));

        /* Transforma el array de arrays a un objeto / Parse the array o arrays to an object */
        return Object.fromEntries(cookies);
    } catch (err){

        /* Muestra al usuario que hubo un error / Show user there was an error */
        Swal.fire({
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
        return undefined;
    }
}