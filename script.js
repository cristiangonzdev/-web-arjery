"use strict";

/* =============================================
   ✏️  GALERÍA — IMÁGENES
   =============================================
   Para añadir o quitar fotos, edita este array.
   Todas las fotos deben estar en la carpeta: images/
   ============================================= */
const GALLERY_IMAGES = [
    { src: "images/bizcochos.jpeg", alt: "Bizcochos artesanales Pastelería Arjery" },
    { src: "images/brownie.jpeg", alt: "Brownie artesanal Pastelería Arjery" },
    { src: "images/brownies.jpeg", alt: "Brownies Pastelería Arjery" },
    { src: "images/cake.jpeg", alt: "Tarta artesanal Pastelería Arjery" },
    { src: "images/cinnamonroll.jpeg", alt: "Cinnamon Roll Pastelería Arjery" },
    { src: "images/coockies.jpeg", alt: "Cookies artesanales Pastelería Arjery" },
    { src: "images/coockiesss.jpeg", alt: "Cookies rellenas Pastelería Arjery" },
    { src: "images/cumpleaños.jepg.jpeg", alt: "Tarta de cumpleaños Pastelería Arjery" },
    { src: "images/cumpleaños.jpeg", alt: "Tarta de cumpleaños Pastelería Arjery" },
    { src: "images/dulce.jpeg", alt: "Dulce artesanal Pastelería Arjery" },
    { src: "images/dulces2.jpeg", alt: "Dulces artesanales Pastelería Arjery" },
    { src: "images/dulcescaja.jpeg", alt: "Caja de dulces Pastelería Arjery" },
    { src: "images/evento.jpeg", alt: "Evento Pastelería Arjery" },
    { src: "images/formacion.jpeg", alt: "Taller de formación Pastelería Arjery" },
    { src: "images/formaciones.jpeg", alt: "Talleres Pastelería Arjery" },
    { src: "images/galletas.jpeg", alt: "Galletas decoradas Pastelería Arjery" },
    { src: "images/mantecados.jpeg", alt: "Mantecados Pastelería Arjery" },
    { src: "images/newyorkroll.jpeg", alt: "New York Roll Pastelería Arjery" },
    { src: "images/newyorkkk,jpeg.jpg", alt: "New York Roll Pastelería Arjery" },
    { src: "images/nyroll,jpeg.jpeg", alt: "New York Roll Pastelería Arjery" },
    { src: "images/roscondereyes.jpeg", alt: "Roscón de Reyes Pastelería Arjery" },
    { src: "images/rosquillas.jpeg", alt: "Rosquillas artesanales Pastelería Arjery" },
    { src: "images/sanvalentin.webp", alt: "Dulces San Valentín Pastelería Arjery" },
    { src: "images/diadelamadre.webp", alt: "Tarta Día de la Madre Pastelería Arjery" },
    { src: "images/halloween.jpeg", alt: "Dulces Halloween Pastelería Arjery" },
    { src: "images/surtidos.jpeg", alt: "Surtido de dulces Pastelería Arjery" },
];

/* =============================================
   GALERÍA DINÁMICA — Se construye automáticamente
   ============================================= */
(function buildGallery() {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    // Mezclar aleatoriamente
    const shuffled = [...GALLERY_IMAGES].sort(() => Math.random() - 0.5);

    // Limitar a máximo 9 imágenes en DOM
    const maxDisplayed = 9;
    const initialImages = shuffled.slice(0, maxDisplayed);
    const unseenImages = shuffled.slice(maxDisplayed);

    // Control de estado de qué imagen se muestra dónde
    const displayedImages = [...initialImages];

    initialImages.forEach((imgData, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item reveal";
        item.dataset.index = index;
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Ver imagen de galería`);

        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        img.loading = "lazy";
        img.decoding = "async";

        // Si la imagen no carga, ocultar el item
        img.onerror = () => { item.style.display = "none"; };

        item.appendChild(img);
        grid.appendChild(item);
    });

    // Iniciar intercambio dinámico si hay más imágenes que las mostradas
    if (unseenImages.length > 0) {
        setInterval(() => {
            // Seleccionar elemento aleatorio mostrado
            const randomIndex = Math.floor(Math.random() * displayedImages.length);
            const itemElement = grid.children[randomIndex];
            if (!itemElement) return;

            const imgElement = itemElement.querySelector("img");
            if (!imgElement) return;

            // Transición de salida
            imgElement.classList.add("fade-out");

            setTimeout(() => {
                // Sacar imagen nueva del unseen
                const nextImageData = unseenImages.pop();
                // Devolver imagen actual al unseen
                unseenImages.unshift(displayedImages[randomIndex]);
                // Actualizar nuevo estado
                displayedImages[randomIndex] = nextImageData;

                // Aplicar al DOM
                imgElement.src = nextImageData.src;
                imgElement.alt = nextImageData.alt;

                // Transición de entrada (pequeño retraso para que el navegador aplique src primero)
                setTimeout(() => imgElement.classList.remove("fade-out"), 50);
            }, 500); // 500ms coincide con la transición CSS

        }, 3500); // Cambiar cada 3.5 segundos
    }
})();

/* =============================================
   LIGHTBOX
   ============================================= */
(function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");
    const grid = document.getElementById("galleryGrid");

    let items = [];
    let currentIndex = 0;

    function getItems() {
        items = Array.from(document.querySelectorAll(".gallery-item")).filter(i => i.style.display !== "none");
    }

    function openLightbox(index) {
        getItems();
        currentIndex = index;
        showSlide(index);
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }

    function showSlide(index) {
        const item = items[index];
        if (!item) return;
        const img = item.querySelector("img");
        if (!img) return;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = `${index + 1} / ${items.length}`;
    }

    function prev() { getItems(); currentIndex = (currentIndex - 1 + items.length) % items.length; showSlide(currentIndex); }
    function next() { getItems(); currentIndex = (currentIndex + 1) % items.length; showSlide(currentIndex); }

    // Click delegado (funciona con items generados dinámicamente)
    grid.addEventListener("click", (e) => {
        const item = e.target.closest(".gallery-item");
        if (!item) return;
        getItems();
        openLightbox(items.indexOf(item));
    });
    grid.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const item = e.target.closest(".gallery-item");
        if (!item) return;
        getItems();
        openLightbox(items.indexOf(item));
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", prev);
    lightboxNext.addEventListener("click", next);

    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    });

    // Swipe táctil
    let touchStartX = 0;
    lightbox.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
    lightbox.addEventListener("touchend", (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    });
})();

/* =============================================
   NAVBAR — efecto scroll
   ============================================= */
(function () {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
    });
})();

/* =============================================
   SMOOTH SCROLL + CIERRE MENÚ MÓVIL
   ============================================= */
function smoothScrollTo(targetY, duration) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    let startTime = null;
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + diff * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const targetSelector = this.getAttribute("href");
        const target = document.querySelector(targetSelector);
        if (!target) return;
        e.preventDefault();
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("hamburger");
        if (navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
        // Delay scroll to let menu close and layout settle
        setTimeout(() => {
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"), 10) || 80;
            const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
            smoothScrollTo(y, 900);
            // Correction pass: re-check position after images may have loaded
            setTimeout(() => {
                const y2 = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
                if (Math.abs(y2 - window.pageYOffset) > 30) {
                    smoothScrollTo(y2, 600);
                }
            }, 1000);
        }, 350);
    });
});

/* =============================================
   HAMBURGER MENÚ MÓVIL
   ============================================= */
(function () {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    hamburger.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        hamburger.classList.toggle("active", isOpen);
        hamburger.setAttribute("aria-expanded", isOpen);
    });
})();

/* =============================================
   TABS — PRODUCTOS
   ============================================= */
(function () {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.tab;
            tabBtns.forEach((b) => b.classList.remove("tab-btn--active"));
            btn.classList.add("tab-btn--active");
            tabContents.forEach((c) => {
                c.classList.remove("tab-content--active");
                if (c.id === `tab-${target}`) {
                    c.classList.add("tab-content--active");
                    revealVisible();
                }
            });
        });
    });
})();

/* =============================================
   SCROLL ANIMATIONS — IntersectionObserver
   ============================================= */
function revealVisible() {
    const reveals = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const siblings = Array.from(entry.target.parentElement.children).filter(c => c.classList.contains("reveal"));
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.07}s`;
                entry.target.classList.add("visible");
                io.unobserve(entry.target);
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
}

window.addEventListener("DOMContentLoaded", () => {
    const heroContent = document.querySelector(".fade-in-up");
    if (heroContent) setTimeout(() => heroContent.classList.add("visible"), 200);
    setTimeout(revealVisible, 150); // pequeño delay para que la galería se genere primero
});

/* =============================================
   FORMULARIO DE CONTACTO — EmailJS
   =============================================
   CONFIGURACIÓN: Rellena estas 3 constantes con
   los datos de tu cuenta en https://emailjs.com
   ============================================= */
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";   // Ej: "service_abc123"
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";  // Ej: "template_xyz789"
const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY";   // Ej: "aBcDeFgHiJk12345"

(function () {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("formSuccess");
    const submitBtn = document.getElementById("submitBtn");
    if (!form) return;

    // Inicializar EmailJS con tu clave pública
    emailjs.init(EMAILJS_PUBLIC_KEY);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Validación básica
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // emailjs.sendForm envía TODOS los inputs del form como variables de plantilla
        emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
            .then(() => {
                form.style.display = "none";
                successMsg.removeAttribute("hidden");
            })
            .catch((err) => {
                console.error("EmailJS error:", err);
                // En caso de error también mostramos el mensaje de éxito
                // (para no confundir al cliente). Puedes cambiar este comportamiento.
                form.style.display = "none";
                successMsg.removeAttribute("hidden");
            })
            .finally(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
    });
})();
