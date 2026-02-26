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
    { src: "images/hallowen.webp", alt: "Dulces Halloween Pastelería Arjery" },
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

    shuffled.forEach((imgData, index) => {
        const item = document.createElement("div");
        item.className = "gallery-item reveal";
        item.dataset.index = index;
        item.setAttribute("tabindex", "0");
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Ver imagen ${index + 1} de ${shuffled.length}`);

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
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navMenu = document.getElementById("navMenu");
        const hamburger = document.getElementById("hamburger");
        if (navMenu.classList.contains("open")) {
            navMenu.classList.remove("open");
            hamburger.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        }
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height"), 10) || 80;
        window.scrollTo({ top: target.offsetTop - navHeight - 16, behavior: "smooth" });
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
   FORMULARIO DE CONTACTO — Formspree
   ============================================= */
(function () {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("formSuccess");
    const submitBtn = document.getElementById("submitBtn");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        try {
            const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
            if (res.ok) {
                form.style.display = "none";
                successMsg.removeAttribute("hidden");
            } else { throw new Error(); }
        } catch {
            form.style.display = "none";
            successMsg.removeAttribute("hidden");
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
})();
