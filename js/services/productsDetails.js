export const productsDetails = (link) => {

    /* Guarda el id del producto que se quiere saber más / Save the product id that we want to know more */
    link.addEventListener("click", (e) => {
        document.cookie = `productId=${e.target.dataset.product_id};`;
        location.href = "products.html";
    });
}