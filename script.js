// ======================================================
// RONNI MÅLERI – SCRIPT.JS
// Lägg filen i samma mapp som index.html
// ======================================================


// -----------------------
// MOBILMENY
// -----------------------

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Stäng meny" : "Öppna meny"
    );
  });

  // Stäng menyn när användaren klickar på en länk
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Öppna meny");
    });
  });

  // Stäng menyn när användaren klickar utanför den
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Öppna meny");
    }
  });
}


// -----------------------
// AKTUELLT ÅR I SIDFOTEN
// -----------------------

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// -----------------------
// BILDGALLERI / LIGHTBOX
// -----------------------

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(imageSource, imageTitle) {
    if (!lightboxImage || !lightboxTitle) {
      return;
    }

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageTitle;
    lightboxTitle.textContent = imageTitle;

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    if (closeButton) {
      closeButton.focus();
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

    if (lightboxImage) {
      lightboxImage.src = "";
      lightboxImage.alt = "";
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = "";
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSource = item.dataset.image;
      const imageTitle = item.dataset.title || "Ronni Måleri";

      if (imageSource) {
        openLightbox(imageSource, imageTitle);
      }
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  // Stäng bildvisaren när användaren klickar på bakgrunden
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Stäng bildvisaren med Escape
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      lightbox.classList.contains("open")
    ) {
      closeLightbox();
    }
  });
}


// -----------------------
// MJUK RULLNING TILL SEKTIONER
// -----------------------

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
