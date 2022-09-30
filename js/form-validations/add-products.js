/* Validaciones para el formulario de añadir productos / Validations to the add products form */

import { clearForm, validateForms } from "./formValidation.js";
import { getCookies } from "../getCookies.js";
import { dataBaseURL } from "../dataBaseURL.js";

/* Seleccionamos todos los inputs / Select all inputs */
const formInputs = document.querySelectorAll(".add__form__input");
/* Seleccionamos el formulario en si / Select the form */
const addProductForm = document.querySelector(".add__form");

/* Los posibles errores de validacion para cada input / Posible error validations for every input */
const errors = {
    type: {
        customError: "Por favor, seleccione una categoria para su producto",
    },
    productName: {
        valueMissing: "Por favor, introduzca el nombre del producto",
        patternMismatch: "Solo se permiten letras y números",
        customError: "Solo se permite un máximo de 20 caracteres",
    },
    price: {
        valueMissing: "Por favor, introduzca el precio del producto",
        patternMismatch: "Solo se permiten números, indicar decimales (2 decimales) con un punto"
    },
    description: {
        valueMissing: "Por favor, introduzca la descripción del producto",
        customError: "Solo se permite un máximo de 150 caracteres",
    },
}

/* Los tipos de errores de validacion que pueden darse en todos los inputs */
/* All validation errors in all inputs */
const errorTypes = [
    "valueMissing",
    "patternMismatch",
    "customError",
];

const customErrors = {
    /* Si el input esta vacio / If input is empty */
    type: input => {
        let errorMessage = "";
        if(!input.value) {
            errorMessage = errors["type"]["customError"];
        }
        input.setCustomValidity(errorMessage);
    },
    /* Maximo 20 caracteres / 20 characters max */
    productName: input => {
        let errorMessage = "";
        if(input.value.length > 20) {
            errorMessage = errors["productName"]["customError"];
        }
        input.setCustomValidity(errorMessage);
    },
    /* 150 caracteres maximo / 150 characters max */
    description: input => {
        let errorMessage = "";
        if(input.value.length > 150) {
            errorMessage = errors["description"]["customError"];
        }
        input.setCustomValidity(errorMessage);
    },
}

/* Valida todos los inputs / Validate all inputs */
validateForms(formInputs, errors, errorTypes, customErrors, "blur");

/* Seleccionamos el input para subir la imagen / Select the upload image input */
const inputImg = document.querySelectorAll(".add-img__input")

/* Posibles errores que puede tener el archivo / Posible file errors */
const imgErorrs = {
    img: {
        /* Solo permitir imagenes en jpg, jpeg y png, requerir imagen / Only allow jpg, jpeg and png images, require an image */
        customError: ["Por favor, seleccione una imagen en formato .jpg, .jpeg o .png"]
    },
}

/* Tipos de erroes para el input de subir la imagen / Error types from upload image input */
const imgErrorTypes = [
    "customError",
]

const imgCustomErrors = {
    /* Valida que el tipo de archivo de la imagen sea valida / Validate the image file type */
    img: input => {
        let errorMessage = "";
        const fileTypes = /(\.jpg|\.jpeg|\.png)$/i;
        const loadedImg = document.querySelector(".img-saved")
        if (!loadedImg.getAttribute("src") && !fileTypes.exec(input.value)) {
            errorMessage = imgErorrs["img"]["customError"][0];
        }
        input.setCustomValidity(errorMessage);
    },
}

/* Aplica las validaciones cuando cambia la imagen y se clickea en ella */
/* Aply validations everytime the input changes or it is clicked */
validateForms(inputImg, imgErorrs, imgErrorTypes, imgCustomErrors, "change");
validateForms(inputImg, imgErorrs, imgErrorTypes, imgCustomErrors, "click");

/* Selecionar la caja del input añadir imagen / Select the upload image input box */
const imgContainer = document.querySelector(".add-img__label");

/* Cancelar comportamientos normales para lso eventos de arrastrar y dejar */
/* Prevent default behaviour from the drag and drop events */
const dragAndDropEvent = ["dragover", "dragenter", "drop"];
dragAndDropEvent.forEach(eventName => {
    imgContainer.addEventListener(eventName, eachEvent => {
        eachEvent.preventDefault();
    })
})

/* Pasar los datos al input al arrastrar encima de este */
/* Move the dropped image in the input drag and drop zone to the input value */
imgContainer.addEventListener("drop", dropEvent => {
    /* Captura los datos que son dejados cuando se sueltan en la página */
    /* Capture the data that is dropped on the page */
    const dropImg = dropEvent.dataTransfer;
    /* Selecciona el campo donde se puede arrastrar la imagen / Select the input drag and drop field */
    const inputImg = document.querySelector(".add-img__input");
    /* Transfiere los datos capturados al input / Transfer the captured data to the input */
    inputImg.files = dropImg.files;
    /* Dispara un evento change para validar el input / Fire a change event to validate the input */
    const changeEvent = new Event("change");
    inputImg.dispatchEvent(changeEvent);
})

/* Muestra la imagen subida si esta es valida / Show the uploaded image if it is valid */
inputImg.forEach(img => {
    img.addEventListener("change", changeImg => {
        if(changeImg.target.validity.valid) {
            const uploadedImg = changeImg.target.files;
            const waitImgContainer = imgContainer.querySelector(".wait-img");
            const showImgContainer = imgContainer.querySelector(".show-img");
            waitImgContainer.classList.add("hide-item");
            showImgContainer.classList.remove("hide-item");
            /* Carga la imagen subida a la pagina / Load the uploaded image to the page */
            if(uploadedImg[0]) {
                showImgContainer.querySelector(".img-saved").src = URL.createObjectURL(uploadedImg[0]);
            }
        }
    })
})

/* Valida los inputs antes de añadirlos / Validate inputs before submit */
const submitProduct = document.querySelector("#submitProduct");
submitProduct.addEventListener("click", (e) => {
    const changeEvent = new Event("change");
    formInputs.forEach(input => {
        input.dispatchEvent(changeEvent);
    })
    inputImg.forEach(input => {
        input.dispatchEvent(changeEvent);
    })
})

/* Crea o edita el producto en la base de datos / Create or edit the product on the data base */
addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    /* Oculta la imagen guardada, pide otra / Hide the uploaded image, ask user to upload other image */
    const waitImgContainer = imgContainer.querySelector(".wait-img");
    const showImgContainer = imgContainer.querySelector(".show-img");
    /* Checkea si el usuario puede realizar la accion / Check user validity */
    const cookies = getCookies()
    if(cookies.valid) {
        try {

            /* Preguntar al usuario si quiere agregar el producto / Confirm if the user wants to add the product */
            const result = await Swal.fire({
                titleText: "¿Desea agregar el producto?",
                text: "Los cambios que efectue en la base de datos seran permanentes",
                icon: "warning",
                color: "#464646",
                showCancelButton: true,
                confirmButtonText: "Guardar",
                cancelButtonText: "Cancelar",
                customClass: {
                    popup: "alert-main-font",
                    title: "alert-main-font",
                    container: "alert-main-font",
                    confirmButton: "alert-confirm-btn",
                }
            })

            /* Si el usuario confirmo / If user confirmed */
            if(result.isConfirmed) {

                /* Muestra una pantalla de carga / Show a loading screen */
                Swal.fire({
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    allowOutsideClick: false,
                    titleText: "Añadiendo producto...",
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

                /* Preparate para leer la imagen subida / Prepare to read the uploaded image */
                const reader = new FileReader();
                const file = document.querySelector("#add-img-input").files[0];

                /* Si el usuario subio una imagen / If the user upload an image */
                if(file) {
                    /* Guarda la imagen subida / Save the uploaded image */
                    reader.readAsDataURL(file);
                    reader.onload = async () => {
                        await addProduct(reader.result);
                    }
                } else {
                    /* Usa la imagen precargada / Use the already loaded image */
                    await addProduct(document.querySelector(".img-saved").src)
                }
            }
        } catch (err) {
            /* Muestra al usuario que hubo un error / Show user there was an error */
            await Swal.fire({
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
            });
        }
    } else {
        /* Si el usuario no esta validado / If user is not validated */
        clearForm(addProductForm, formInputs);
        waitImgContainer.classList.remove("hide-item");
        showImgContainer.classList.add("hide-item");
        window.location.href = "login.html"
    }
            
})


async function addProduct (image) {
    try {
        const cookies = getCookies();

        /* Prepara los datos para subir / Prepare the data we're going to upload */
        const name = document.querySelector("#input-name").value;
        const description = document.querySelector("#description").value;
        const price = document.querySelector("#input-price").value;
        const category = document.querySelector("#input-type").value;
        
        /* Configura fetch para subir o para actualizar / Set fecth to post or to update a product */
        const fetchMethod = JSON.parse(cookies.editDB) ? "PUT" : "POST";
        const fetchURL = JSON.parse(cookies.editDB) ? `${dataBaseURL}/products/${cookies.editDB}` : `${dataBaseURL}/products`;

        /* Añade el producto / Add the product */
        const added = await fetch(fetchURL, {
            method: fetchMethod,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                img: image,
                name: name,
                description: description,
                price: price,
                category: category
            })
        })

        /* Si tuvimos exito / If we succeeded */
        if(added.ok) {

            /* Reestablecemos el form / Reset the form */
            clearForm(addProductForm, formInputs);
            clearForm(addProductForm, inputImg);
            const waitImgContainer = imgContainer.querySelector(".wait-img");
            const showImgContainer = imgContainer.querySelector(".show-img");
            waitImgContainer.classList.remove("hide-item");
            showImgContainer.classList.add("hide-item");

            /* Preguntamos si queremos añadir mas productos / Ask if the user wants to add more products */
            const addMore = await Swal.fire({
                titleText: "¡Producto agregado!",
                text: "Su producto fue agragado correctamente a la base de datos. ¿Desea añadir otro producto?",
                icon: "success",
                color: "#464646",
                showCancelButton: true,
                confirmButtonText: "Si",
                cancelButtonText: "No",
                customClass: {
                    popup: "alert-main-font",
                    title: "alert-main-font",
                    container: "alert-main-font",
                    confirmButton: "alert-confirm-btn",
                }
            });
            if(addMore.isConfirmed) {
                document.cookie = "editDB = false";
                location.reload();
            } else {
                location.href = "all-products.html";
            }
        } else {
            throw new Error(added.status);
        }
    } catch (err) {

        /* Muestra al usuario que hubo un error / Show user there was an error */
        await Swal.fire({
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
    }
}