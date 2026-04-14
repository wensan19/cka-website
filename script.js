const modalOverlay = document.getElementById("projectModal");
const modalClose = modalOverlay?.querySelector(".modal-close");

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
  });
}

modalOverlay?.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
  }
});

const cards = document.querySelectorAll(".project-card");
cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;

    const targetImage = card.querySelector("img");
    const title = card.querySelector("h3")?.textContent;
    const text = card.querySelector("p")?.textContent;
    const tag = card.querySelector(".project-tag")?.textContent;

    if (!modalOverlay) return;
    modalOverlay.querySelector("img").src = targetImage?.src || "";
    modalOverlay.querySelector("img").alt =
      targetImage?.alt || "Project preview image";
    modalOverlay.querySelector("#modalTitle").textContent =
      title || "Project Title";
    modalOverlay.querySelector("#modalText").textContent = text || "";
    if (tag) {
      modalOverlay.querySelector(".project-tag").textContent = tag;
    }
    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
  });
});

const revealElements = document.querySelectorAll(".reveal");
const observerOptions = { threshold: 0.05, rootMargin: "0px 0px -120px 0px" };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

const aboutImage1 = {
  src: "assets/images/projects/commercial/airport.jpg",
  alt: "Commercial interior project by CKA Design",
  title: "Commercial",
  href: "work.html#commercial",
};

const aboutImage2 = {
  src: "assets/images/projects/residential/oneshenton.jpg",
  alt: "Residential interior with calm architectural proportions",
  title: "Residential",
  href: "work.html#residential",
};

const aboutImage3 = {
  src: "assets/images/projects/religious/loyang.jpg",
  alt: "Religious architectural project with detailed spatial design",
  title: "Religious",
  href: "work.html#religious",
};

const aboutImage4 = {
  src: "assets/images/projects/overseas/glamping.jpg",
  alt: "Overseas architectural project with calm exterior detailing",
  title: "Overseas",
  href: "work.html#overseas",
};

const aboutImage5 = {
  src: "assets/images/projects/competition/jurong.png",
  alt: "Competition study image for an architectural proposal",
  title: "Competitions",
  href: "work.html#competitions",
};

const aboutImages = [aboutImage1, aboutImage2, aboutImage3, aboutImage4, aboutImage5];
const aboutCarousel = document.querySelector(".about-carousel");
const aboutCarouselImage = document.querySelector(".about-carousel-image");
const aboutCarouselTitle = document.querySelector(".about-carousel-title");
const aboutCarouselPrev = document.querySelector(".about-carousel-prev");
const aboutCarouselNext = document.querySelector(".about-carousel-next");
const aboutCarouselDots = document.querySelector(".about-carousel-dots");
let activeAboutImage = 0;
let aboutCarouselTimer = null;
let aboutCarouselTransitionTimer = null;

function updateAboutCarousel(index, shouldAnimate = true) {
  if (!aboutCarouselImage || !aboutCarouselTitle || aboutImages.length === 0) return;

  activeAboutImage = (index + aboutImages.length) % aboutImages.length;
  const image = aboutImages[activeAboutImage];

  clearTimeout(aboutCarouselTransitionTimer);
  if (!shouldAnimate) {
    aboutCarouselImage.src = image.src;
    aboutCarouselImage.alt = image.alt;
    aboutCarouselTitle.textContent = image.title;
    aboutCarouselTitle.href = image.href;
    aboutCarouselTitle.setAttribute("aria-label", `View ${image.title} projects`);
    aboutCarouselImage.classList.remove("is-changing");
    aboutCarouselTitle.classList.remove("is-changing");
  } else {
    aboutCarouselImage.classList.add("is-changing");
    aboutCarouselTitle.classList.add("is-changing");
    aboutCarouselTransitionTimer = window.setTimeout(() => {
      aboutCarouselImage.src = image.src;
      aboutCarouselImage.alt = image.alt;
      aboutCarouselTitle.textContent = image.title;
      aboutCarouselTitle.href = image.href;
      aboutCarouselTitle.setAttribute("aria-label", `View ${image.title} projects`);
      aboutCarouselImage.classList.remove("is-changing");
      aboutCarouselTitle.classList.remove("is-changing");
    }, 220);
  }

  aboutCarouselDots?.querySelectorAll("button").forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeAboutImage);
    dot.setAttribute("aria-current", dotIndex === activeAboutImage ? "true" : "false");
  });
}

function startAboutCarousel() {
  clearInterval(aboutCarouselTimer);
  aboutCarouselTimer = window.setInterval(() => {
    updateAboutCarousel(activeAboutImage + 1);
  }, 5200);
}

function pauseAboutCarousel() {
  clearInterval(aboutCarouselTimer);
}

if (aboutCarousel && aboutCarouselImage && aboutCarouselTitle && aboutCarouselDots) {
  aboutImages.forEach((image, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${image.alt}`);
    dot.addEventListener("click", () => {
      updateAboutCarousel(index);
      startAboutCarousel();
    });
    aboutCarouselDots.appendChild(dot);
  });

  aboutCarouselPrev?.addEventListener("click", () => {
    updateAboutCarousel(activeAboutImage - 1);
    startAboutCarousel();
  });

  aboutCarouselNext?.addEventListener("click", () => {
    updateAboutCarousel(activeAboutImage + 1);
    startAboutCarousel();
  });

  aboutCarousel.addEventListener("mouseenter", pauseAboutCarousel);
  aboutCarousel.addEventListener("mouseleave", startAboutCarousel);
  aboutCarousel.addEventListener("focusin", pauseAboutCarousel);
  aboutCarousel.addEventListener("focusout", startAboutCarousel);

  updateAboutCarousel(0, false);
  startAboutCarousel();
}

const filterButtons = document.querySelectorAll(".work-filter button");
const carouselImage = document.querySelector(".carousel-image");
const carouselTitle = document.getElementById("carouselTitle");
const carouselDescription = document.getElementById("carouselDescription");
const carouselIndicators = document.querySelector(".carousel-indicators");
const categorySections = document.querySelectorAll(".work-category");
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");

const categories = {
  commercial: {
    label: "Commercial",
    title: "Commercial work",
    description:
      "A rotating selection of commercial projects demonstrating our material, light and spatial sensibility.",
    slides: [
      {
        src: "assets/images/project-commercial-1.svg",
        alt: "Commercial project image",
      },
      {
        src: "assets/images/project-commercial-1.svg",
        alt: "Commercial interior image",
      },
    ],
  },
  residential: {
    label: "Residential",
    title: "Residential work",
    description:
      "Homes shaped around everyday comfort, natural light and refined material expression.",
    slides: [
      {
        src: "assets/images/project-residential-1.svg",
        alt: "Residential project image",
      },
      {
        src: "assets/images/project-residential-1.svg",
        alt: "Residential interior image",
      },
    ],
  },
  religious: {
    label: "Religious",
    title: "Religious spaces",
    description:
      "Quietly powerful interiors crafted for reflection, ritual and calm presence.",
    slides: [
      {
        src: "assets/images/project-religious-1.svg",
        alt: "Religious project image",
      },
      {
        src: "assets/images/project-religious-1.svg",
        alt: "Religious detail image",
      },
    ],
  },
  overseas: {
    label: "Overseas",
    title: "Overseas work",
    description:
      "Projects that respond to place with sensitivity and a subtle, refined palette.",
    slides: [
      {
        src: "assets/images/project-overseas-1.svg",
        alt: "Overseas project image",
      },
      {
        src: "assets/images/project-overseas-1.svg",
        alt: "Overseas design image",
      },
    ],
  },
  competition: {
    label: "Competitions",
    title: "Competition studies",
    description:
      "Concept work exploring civic, spatial and material ideas through refined proposals.",
    slides: [
      {
        src: "assets/images/project-competition-1.svg",
        alt: "Competition entry image",
      },
      {
        src: "assets/images/project-competition-1.svg",
        alt: "Competition study image",
      },
    ],
  },
};

let activeCategory = "commercial";
let activeSlideIndex = 0;
let carouselTimer = null;

function renderCarousel(category) {
  const data = categories[category];
  if (!data) return;

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.target === category);
  });

  activeCategory = category;
  activeSlideIndex = 0;

  if (!carouselTitle || !carouselDescription || !carouselImage || !carouselIndicators) return;

  carouselTitle.textContent = data.title;
  carouselDescription.textContent = data.description;
  updateCarouselImage();
  buildIndicators(data.slides.length);
  startCarousel();
}

function updateCarouselImage() {
  if (!carouselImage) return;

  const slides = categories[activeCategory].slides;
  const slide = slides[activeSlideIndex];
  carouselImage.src = slide.src;
  carouselImage.alt = slide.alt;
  updateActiveIndicator();
}

function buildIndicators(count) {
  if (!carouselIndicators) return;

  carouselIndicators.innerHTML = "";
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.addEventListener("click", () => {
      activeSlideIndex = index;
      updateCarouselImage();
      startCarousel();
    });
    carouselIndicators.appendChild(dot);
  }
  updateActiveIndicator();
}

function updateActiveIndicator() {
  if (!carouselIndicators) return;

  const dots = carouselIndicators.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeSlideIndex);
  });
}

function showCarouselSlide(offset) {
  const slides = categories[activeCategory].slides;
  activeSlideIndex =
    (activeSlideIndex + offset + slides.length) % slides.length;
  updateCarouselImage();
  startCarousel();
}

function startCarousel() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    showCarouselSlide(1);
  }, 4800);
}

function pauseCarousel() {
  clearInterval(carouselTimer);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.target;
    const section = document.getElementById(category);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    renderCarousel(category);
  });
});

if (prevButton && nextButton) {
  prevButton.addEventListener("click", () => showCarouselSlide(-1));
  nextButton.addEventListener("click", () => showCarouselSlide(1));
}

const carouselFrame = document.querySelector(".carousel-media");
if (carouselFrame) {
  carouselFrame.addEventListener("mouseenter", pauseCarousel);
  carouselFrame.addEventListener("mouseleave", startCarousel);
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const category = entry.target.dataset.category;
      if (category && category !== activeCategory) {
        renderCarousel(category);
      }
    });
  },
  {
    threshold: 0.45,
  },
);

categorySections.forEach((section) => sectionObserver.observe(section));

if (carouselImage && carouselTitle && carouselDescription && carouselIndicators) {
  renderCarousel(activeCategory);
}

const awardGallery = document.querySelector(".award-media-gallery");
const awardMediaImage = awardGallery?.querySelector(".award-media-image");
const awardMediaVideo = awardGallery?.querySelector(".award-media-video");
const awardMediaPlaceholder = awardGallery?.querySelector(".award-media-placeholder");
const awardMediaButtons = awardGallery?.querySelectorAll(".award-media-controls button");
const awardMediaPrev = awardGallery?.querySelector(".award-media-prev");
const awardMediaNext = awardGallery?.querySelector(".award-media-next");
let awardMediaTimer = null;
let activeAwardMediaIndex = 0;

function showAwardMedia(button) {
  if (!awardMediaImage || !awardMediaVideo || !awardMediaPlaceholder || !awardGallery) return;

  const type = button.dataset.type;
  const src = button.dataset.src || "";
  const poster = button.dataset.poster || "";
  const fit = button.dataset.fit || "cover";
  activeAwardMediaIndex = Array.from(awardMediaButtons || []).indexOf(button);

  clearTimeout(awardMediaTimer);
  awardMediaImage.classList.add("is-changing");
  awardMediaVideo.classList.add("is-changing");
  awardMediaPlaceholder.classList.add("is-changing");

  awardMediaTimer = window.setTimeout(() => {
    awardMediaImage.hidden = true;
    awardMediaVideo.hidden = true;
    awardMediaPlaceholder.hidden = true;
    awardGallery.querySelector(".award-media-stage")?.classList.toggle("fit-contain", fit === "contain");
    awardMediaVideo.pause();
    awardMediaVideo.removeAttribute("src");

    if (type === "video") {
      awardMediaVideo.poster = poster;
      if (src) {
        awardMediaVideo.src = src;
        awardMediaVideo.hidden = false;
      } else {
        awardMediaPlaceholder.hidden = false;
      }
    } else {
      awardMediaImage.src = src;
      awardMediaImage.alt = button.dataset.alt || "One Shenton LEAF Award media";
      awardMediaImage.hidden = false;
    }

    awardMediaImage.classList.remove("is-changing");
    awardMediaVideo.classList.remove("is-changing");
    awardMediaPlaceholder.classList.remove("is-changing");
  }, 180);

  awardMediaButtons?.forEach((mediaButton) => {
    mediaButton.classList.toggle("active", mediaButton === button);
    mediaButton.setAttribute("aria-pressed", mediaButton === button ? "true" : "false");
  });
}

awardMediaButtons?.forEach((button) => {
  button.addEventListener("click", () => showAwardMedia(button));
});

function showAdjacentAwardMedia(offset) {
  if (!awardMediaButtons || awardMediaButtons.length === 0) return;

  const nextIndex =
    (activeAwardMediaIndex + offset + awardMediaButtons.length) % awardMediaButtons.length;
  showAwardMedia(awardMediaButtons[nextIndex]);
}

awardMediaPrev?.addEventListener("click", () => showAdjacentAwardMedia(-1));
awardMediaNext?.addEventListener("click", () => showAdjacentAwardMedia(1));

if (awardMediaButtons?.length) {
  showAwardMedia(awardMediaButtons[0]);
}

const accordionButtons = document.querySelectorAll(".accordion-button");
accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = button.nextElementSibling;
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    panel.hidden = expanded;
  });
});

window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
