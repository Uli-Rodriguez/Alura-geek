import { getCookies } from "../getCookies.js";
import { dataBaseURL } from "../dataBaseURL.js";

/* Carga el producto a editar / Load product to edit */
const allowEdit = async () => {

    /* Revisa si el usuario va a editar / Check if the user is going to edit */
    const cookies = getCookies();
    if(cookies && JSON.parse(cookies.editDB)) {

        /* Consigue el producto a editar desde la base de datos / Require the product to be edited from the data base */
        const product = await (await fetch(`${dataBaseURL}/products/${cookies.editDB}`)).json();

        /* Muestra la imagen del producto / Show image of the product */
        const waitImgContainer = document.querySelector(".wait-img");
        const showImgContainer = document.querySelector(".show-img");
        showImgContainer.classList.remove("hide-item");
        waitImgContainer.classList.add("hide-item");
        const img = document.querySelector(".img-saved");

        /* Carga los datos del producto / Load product data */
        const name = document.querySelector("#input-name");
        const description = document.querySelector("#description");
        const price = document.querySelector("#input-price");
        const category = document.querySelector("#input-type");
        img.setAttribute("src", product.img);
        name.value = product.name;
        description.value = product.description;
        price.value = product.price;
        category.value = product.category;
    }
}

allowEdit();