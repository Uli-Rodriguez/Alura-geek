/* Ya que el documento HTML usado para mostrar los resultados de la busqueda y todos los productos es el mismo, definimos como tiene que comportarse el programa en cada caso */

const links = document.querySelectorAll(".all-products-link");
const adminLinks = document.querySelectorAll(".all-products-link--admin");

/* SI el usuario quiere todos los productos / If the user wants all the products */
links.forEach(link => {
    link.addEventListener("click", () => {
        document.cookie = `query = ;`;
        location.href = "all-products.html";
    })
})
adminLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.cookie = `query = ;`;
    })
})