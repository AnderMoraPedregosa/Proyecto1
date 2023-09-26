// script.js

document.addEventListener("DOMContentLoaded", function () {
    const mostrarVideoBtn = document.getElementById("mostrarVideo");
    const videoChocolates = document.getElementById("videoChocolates");

    // Oculta el video al cargar la página
    videoChocolates.style.display = "none";

    mostrarVideoBtn.addEventListener("click", function (event) {
        event.preventDefault();
        videoChocolates.style.display = "block";
    });
});
