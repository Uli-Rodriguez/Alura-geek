export const validateForms = (inputList, errors, errorTypes, customErrors, eventCheck) => {
    inputList.forEach((input) => {

        /* Consigue el dataset del data atribute asignado / Get the dataset input from the data atribute asigned */
        const inputType = input.dataset.form_input;
        input.addEventListener(eventCheck, (write) => {

            /* Valida el error personalizado / Validate custom error */
            if(customErrors[inputType]) {
                customErrors[inputType](write.target);
            }
            if(write.target.validity.valid) {
                
                /* Muestra que el input es valido / Show the input is valid */
                write.target.closest(".input-validity-container").classList.add("form-input-valid");
                write.target.closest(".input-validity-container").classList.remove("form-input-invalid");
                write.target.closest(".input-validity-container").querySelector(".form__error").innerHTML = "";
            } else {

                /* Muestra que el input es invalido / Show the input is invalid */
                write.target.closest(".input-validity-container").classList.add("form-input-invalid");
                write.target.closest(".input-validity-container").classList.remove("form-input-valid");

                /* Muestra el error / Show the error */
                write.target.closest(".input-validity-container").querySelector(".form__error").innerHTML = showError(inputType, write.target);
            }
        })
    
        /* Elimina los mensajes de invalidacion por defecto / Delete default invalid messages */
        input.addEventListener("invalid", invalidForm => {
            invalidForm.preventDefault();
        })
    })
    
    /* Determina si hay error y cual fue / Check if there was an error and wich one */
    function showError (inputType, input) {

        /* Si hay un error y no sabemos cual / If there is an error and we don't know wich one */
        let errorMessage = "Ha ocurrido un error, intente nuevamente";

        errorTypes.forEach((error) => {
            if(input.validity[error]) {
                errorMessage = errors[inputType][error];
            }
        })
        return errorMessage;
    }
}

/* Reestablece el formulario y los inputs / Reset the form and the inputs */
export const clearForm = (form, inputs) => {
    form.reset();
    inputs.forEach((input) => {
        input.closest(".input-validity-container").classList.remove("form-input-valid");
    })
}