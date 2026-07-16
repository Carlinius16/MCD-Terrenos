document.addEventListener("DOMContentLoaded", () => {
    const flotante = document.getElementById("whatsapp-flotante");
    const botonLargo = document.getElementById("btn-whatsapp-largo");
    const elementsToReveal = document.querySelectorAll(".reveal");

    // 1. EFECTO DE DESAPARICIÓN DEL BOTÓN FLOTANTE
    const handleFloatingWhatsapp = () => {
        if (!flotante || !botonLargo) return;

        // Obtenemos la posición en pantalla del botón alargado
        const rect = botonLargo.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        // Si el botón largo de WhatsApp entra al visor (completamente o casi en pantalla), ocultamos el flotante
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            flotante.classList.add("hidden-whatsapp");
        } else {
            flotante.classList.remove("hidden-whatsapp");
        }
    };

    // 2. ANIMACIONES DE REVELACIÓN (SCROLL EFECTO TRANSICIÓN)
    const handleScrollReveal = () => {
        elementsToReveal.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Se activa cuando el elemento está un 15% visible en pantalla
            if (rect.top < windowHeight - (elementHeight * 0.15) && rect.bottom > 0) {
                el.classList.add("active");
            }
        });
    };

    // Controlador global de eventos de Scroll
    const handleScrollEvents = () => {
        handleFloatingWhatsapp();
        handleScrollReveal();
    };

    // Escuchamos el scroll y ejecutamos los efectos
    window.addEventListener("scroll", handleScrollEvents);
    
    // Ejecución inicial por si el usuario ya está a mitad de página al recargar
    setTimeout(handleScrollEvents, 100);
});
