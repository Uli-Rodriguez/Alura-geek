const logoutBtn = document.querySelector("#logoutBtn");

/* Eliminar la validez del usuario / Remove user validity */
logoutBtn.addEventListener("click", () => {
    document.cookie = `valid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    window.location.href = "index.html";
})