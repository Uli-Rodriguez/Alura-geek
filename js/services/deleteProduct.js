import { getCookies } from "../getCookies.js"
import { dataBaseURL } from "../dataBaseURL.js";

export const deleteProduct = (deleteBtn, productId) => {
    deleteBtn.addEventListener("click", async () => {
        const cookies = getCookies();

        /* Valida si el usuario esta autenticado / Validate if the user is autenticated */
        if(cookies && cookies.valid) {
            try {

                /* Confirmar eliminacion / Confirm deletion */
                const result = await Swal.fire({
                    titleText: "¿Desea eliminar el producto seleccionado?",
                    text: "El producto seleccionado sera eliminado para siempre y no podra recuperarse",
                    icon: "warning",
                    color: "#464646",
                    showCancelButton: true,
                    confirmButtonText: "Eliminar",
                    cancelButtonText: "Cancelar",
                    customClass: {
                        popup: "alert-main-font",
                        title: "alert-main-font",
                        container: "alert-main-font",
                        confirmButton: "alert-confirm-btn",
                    }
                })
                if(result.isConfirmed) {

                    /* Muestra al usuario que el producto esta siendo eliminado / Show the user that the product is being deleted */
                    Swal.fire({
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        allowOutsideClick: false,
                        titleText: "Eliminando producto...",
                        html: `<img src="../../assets/images/loading-gif.svg" alt="Loading..." class="loading-gif">`,
                        color: "#464646",
                        showConfirmButton: false,
                        customClass: {
                            popup: "alert-main-font",
                            title: "alert-main-font",
                            container: "alert-main-font",
                            confirmButton: "alert-confirm-btn",
                        }
                    })

                    /* Elimina el producto / Delete the product */
                    const deleted = await fetch(`${dataBaseURL}/products/${productId}`, {
                        method: "DELETE",
                        headers: {
                            "content-type": "aplication/json"
                        }
                    });
                    if(deleted.ok) {

                        /* Muestra que le producto fue eliminado correctamente / Show that the product was deleted successfully */
                        await Swal.fire({
                            titleText: "¡Producto elimincado correctamente!",
                                text: "Su producto seleccionado fue eliminado correctamente",
                            icon: "success",
                            color: "#464646",
                            confirmButtonText: "Entendido",
                            customClass: {
                                popup: "alert-main-font",
                                title: "alert-main-font",
                                container: "alert-main-font",
                                confirmButton: "alert-confirm-btn",
                            }
                        })
                        location.reload();
                    } else {
                        throw new Error(deleted.status);
                    }
                }
            } catch (err) {

                /* Muestra al usuario que hubo un error / Show the user there was an error */
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
        } else {

            /* Manda al usuario a autenticarse / Send the user to autenticate */
            location.href = "login.html"
        }       
    })
}