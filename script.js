// ======================================================
// RONNI MÅLERI – SCRIPT.JS
// Place this file in the same folder as index.html
// ======================================================


// -----------------------
// MOBILE MENU
// -----------------------

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Stäng meny" : "Öppna meny"
    );
  });

  // Close the menu when a navigation link is clicked
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Öppna meny");
    });
  });

  // Close the menu when clicking outside it
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
// CURRENT YEAR IN FOOTER
// -----------------------

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// -----------------------
// IMAGE GALLERY / LIGHTBOX
// -----------------------

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function openLightbox(imageSource, imageTitle) {
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

    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxTitle.textContent = "";
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

  // Close when clicking on the dark background
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Close with the Escape key
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
// SMOOTH SCROLL FOR LINKS
// -----------------------

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});
