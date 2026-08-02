// ======================================================
// RONNI MÅLERI – SCRIPT.JS
// Lägg filen i samma mapp som index.html
// ======================================================


// ======================================================
// MOBILMENY
// ======================================================

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

function closeMenu() {
  if (!menuButton || !menu) {
    return;
  }

  menu.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Öppna meny");
}

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const menuIsOpen = menu.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(menuIsOpen)
    );

    menuButton.setAttribute(
      "aria-label",
      menuIsOpen ? "Stäng meny" : "Öppna meny"
    );
  });


  // Stäng mobilmenyn när användaren klickar på en menylänk
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  // Stäng mobilmenyn när användaren klickar utanför menyn
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = menu.contains(event.target);
    const clickedMenuButton = menuButton.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
      closeMenu();
    }
  });


  // Stäng mobilmenyn med Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  // Stäng mobilmenyn när skärmen blir större
  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}


// ======================================================
// AKTUELLT ÅR I SIDFOTEN
// ======================================================

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ======================================================
// MJUK RULLNING TILL SEKTIONER
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);

    if (!targetElement) {
      return;
    }

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// ======================================================
// BILDGALLERI OCH LIGHTBOX
// ======================================================

const lightbox = document.querySelector(".lightbox");

if (lightbox) {
  const lightboxImage = lightbox.querySelector("img");
  const lightboxTitle = lightbox.querySelector("p");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  let previouslyFocusedElement = null;


  function openLightbox(imageSource, imageTitle) {
    if (!lightboxImage || !imageSource) {
      return;
    }

    previouslyFocusedElement = document.activeElement;

    lightboxImage.src = imageSource;
    lightboxImage.alt = imageTitle || "Bild från Ronni Måleri";

    if (lightboxTitle) {
      lightboxTitle.textContent =
        imageTitle || "Ronni Måleri";
    }

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

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }

    previouslyFocusedElement = null;
  }


  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSource = item.dataset.image;
      const imageTitle =
        item.dataset.title || "Ronni Måleri";

      openLightbox(imageSource, imageTitle);
    });
  });


  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }


  // Stäng bildvisaren genom att klicka på den mörka bakgrunden
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


// ======================================================
// SKYDDA EXTERNA LÄNKAR SOM ÖPPNAS I NY FLIK
// ======================================================

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  const currentRel = link.getAttribute("rel") || "";
  const relValues = new Set(currentRel.split(" ").filter(Boolean));

  relValues.add("noopener");
  relValues.add("noreferrer");

  link.setAttribute("rel", [...relValues].join(" "));
});
