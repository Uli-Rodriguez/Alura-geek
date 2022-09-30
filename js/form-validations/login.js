import { validateForms } from "./formValidation.js";
import { validateUser } from "../services/session.js";

/* Consigue el formulario de login y sus inputs / Get the login form and it's inputs */
const loginForm = document.querySelector(".login__form");
const loginFormInput = document.querySelectorAll(".login__form__input");

const submitBtn = document.querySelector("#submit-btn");

/* Consigue la caja de error de inicio de sesion / Get the login session error box */
const loginError = document.querySelector("#login__error");

/* Posibles errores de validacion / Posible error validations */
const errors = {
    user: {
        valueMissing: "Debe introducir su usuario",
        patternMismatch: "El mail ingresado no es valido",
    },
    password: {
        valueMissing: "Debe introducir su contraseña",
        patternMismatch: "Su contraseña no debe contener espacios",
    },
}

/* Tipos de errores de validacion / Error validation types */
const errorTypes = [
    "valueMissing",
    "patternMismatch",
];

validateForms(loginFormInput, errors, errorTypes, {}, "blur");

/* Cuando subimos el formulario / When we submit the form */
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    /* Transforma la lista de nodos a un arreglo / Parse the NodeList to an Array / */
    const loginFormInputArray = Array.from(loginFormInput);
    
    /* Valida si la contraseña y el nombre del usuario / Validate the password and the username */
    const validUser = await validateUser(loginFormInputArray[0].value, loginFormInputArray[1].value);

    if(!validUser && typeof(validUser) !== "undefined") {

        /* Indica usuario no valido / Show that the user is not valid */
        loginError.textContent = "Su usuario y/o contraseña son incorrectos";
        e.target.closest(".main-form-container").classList.add("form-input-invalid");
        loginFormInput.forEach(input => {
            input.closest(".input-validity-container").classList.remove("form-input-valid");
            input.closest(".input-validity-container").classList.add("form-input-invalid");
        })

    /* En caso de que tengamos un error en fetch / In case we have an error in fetch */
    } else if (typeof(validUser) === "undefined") {
        
        /* Resetea el formulario / Reset the form */
        e.target.closest(".main-form-container").classList.remove("form-input-invalid");
        loginFormInput.forEach(input => {
            input.closest(".input-validity-container").classList.remove("form-input-valid");
            input.value = "";
        });
        loginError.textContent = "";

    } else {

        /* Resetea el formulario y dirigelo al inico / Reset the form and redirect the user to the home */
        e.target.closest(".main-form-container").classList.remove("form-input-invalid");
        loginFormInput.forEach(input => {
            input.closest(".input-validity-container").classList.remove("form-input-valid");
            input.value = "";
        })
        loginError.textContent = "";
        window.location.href = "index.html";
    }
})

/* Valida todos los inputs si se intenta subir el form vacio / Validate all the inputs if the user attempts to upload the form empty */
submitBtn.addEventListener("click", (e) => {
    const blur = new Event("blur");
    loginFormInput.forEach(input => {
        input.dispatchEvent(blur);
    });
})