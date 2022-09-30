import { validateForms } from "./formValidation.js";
import { clearForm } from "./formValidation.js";

/* Consigue los inputs y el formularia de contacto / Get the contact form inputs and the form itself */
const contactInput = document.querySelectorAll(".contact__form__input");
const contactForm = document.querySelector(".contact__form");

/* Posibles errores de validacion para los inputs / Possible validation error to the inputs */
const errors = {
    name: {
        valueMissing: "Por favor, introduzca su nombre",
        patternMismatch: "No se permite el uso de caracteres especiales",
        customError: "Solo se permite un maximo de 40 caracteres",
    },
    message: {
        valueMissing: "Por favor, escriba su mensaje",
        customError: "Solo se permite un máximo de 120 caracteres",
    },
}

/* Tipos de errores de validacion / Validation error types */
const errorTypes = [
    "valueMissing",
    "patternMismatch",
    "customError",
]

/* Errores de validacion personalizados / Custom validation errors */
const customErrors = {

    /* Nombres de maximo 40 caracteres / 40 characters names max */
    name: (input) => {
        let error = "";
        if (input.value.length > 40) {
            error = errors["name"]["customError"];
        }
        input.setCustomValidity(error);
    },

    /* Mensajes de maximo 120 caracteres / 120 characters messages max */
    message: (input) => {
        let error = "";
        if(input.value.length > 120) {
            error = errors["message"]["customError"];
        }
        input.setCustomValidity(error);
    },
}


validateForms(contactInput, errors, errorTypes, customErrors, "blur");
clearForm(contactForm, contactInput);


/* Avisa al usuario que se envio su mensaje / Tell the user his/her message was sent */
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    Swal.fire({
        titleText: "¡Mensaje enviado!",
        text: "Gracias por su mensaje, nos pondremos en contacto con usted lo antes posible",
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
})