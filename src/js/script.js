//El árbol DOM está completamente cargado al capturar el evento DOMContentLoaded.
//Se ejecuta justo recien cargado el DOM
document.addEventListener("DOMContentLoaded", function () {
    const botones = document.querySelectorAll(".filtro-btn");
    let items = document.querySelectorAll('.menu-items .item');
    const tituloCategoria = document.getElementById("titulo-categoria");

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            // Quitamos la clase "activo" de todos los botones y agregamos la clase "activo" al seleccionado
            botones.forEach(btn => btn.classList.remove("activo"));
            this.classList.add("activo");

            // Categoría seleccionada
            const categoria = this.getAttribute("data-categoria");

            // Actualiza el título con la categoría
            if (categoria === "todo") {
                tituloCategoria.textContent = "Toda la carta";
            } else {
                // Botón seleccionado
                tituloCategoria.textContent = this.textContent;
            }

            // Filtra los menús por categoría
            items.forEach(item => {
                if (categoria === 'todo' || item.classList.contains(categoria)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

        });
    });
});

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 1000,
    once: true
});


