const modalOverlay = document.getElementById("projectModal");
const modalClose = modalOverlay?.querySelector(".modal-close");
const siteHeader = document.querySelector(".site-header");
const headerInner = document.querySelector(".header-inner");
const mainNav = document.querySelector(".main-nav");

function initWorkDropdown() {
  if (!mainNav || mainNav.querySelector(".nav-dropdown")) return;

  const workLink = Array.from(mainNav.querySelectorAll("a")).find((link) => {
    const href = link.getAttribute("href") || "";
    return href.includes("work.html") && link.textContent.trim() === "Our Work";
  });

  if (!workLink) return;

  const workHref = workLink.getAttribute("href") || "work.html";
  const rootPath = workHref.replace(/work\.html.*$/, "");
  const dropdownItems = [
    { label: "Commercial", href: `${rootPath}work.html#commercial` },
    { label: "Residential", href: `${rootPath}work.html#residential` },
    { label: "Religious", href: `${rootPath}work.html#religious` },
    { label: "Overseas", href: `${rootPath}work.html#overseas` },
    { label: "Competition", href: `${rootPath}work.html#competition` },
    { label: "Awards", href: `${rootPath}awards.html` },
  ];

  const dropdown = document.createElement("div");
  dropdown.className = "nav-dropdown";

  const head = document.createElement("div");
  head.className = "nav-dropdown-head";

  const toggle = document.createElement("button");
  toggle.className = "nav-dropdown-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Toggle Our Work dropdown");
  toggle.setAttribute("aria-expanded", "false");

  const panel = document.createElement("div");
  panel.className = "nav-dropdown-panel";

  dropdownItems.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.label;
    panel.appendChild(link);
  });

  workLink.parentNode.insertBefore(dropdown, workLink);
  head.append(workLink, toggle);
  dropdown.append(head, panel);

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeDropdown();
    }
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });
}

initWorkDropdown();

if (headerInner && mainNav && !document.querySelector(".menu-button")) {
  const menuButton = document.createElement("button");
  menuButton.className = "menu-button";
  menuButton.type = "button";
  menuButton.setAttribute("aria-label", "Toggle navigation menu");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
  headerInner.insertBefore(menuButton, mainNav);

  menuButton.addEventListener("click", () => {
    const isOpen = siteHeader?.classList.toggle("nav-open");
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  mainNav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    siteHeader?.classList.remove("nav-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

const readMorePages = [
  { id: "sandbox", label: "SandBox VR", group: "Commercial", path: "details/work/commercial/sandbox.html" },
  { id: "muve-gym", label: "MUVE Gym", group: "Commercial", path: "details/work/commercial/muve-gym.html" },
  { id: "vegetarian-restaurant", label: "Vegetarian Restaurant", group: "Commercial", path: "details/work/commercial/vegetarian-restaurant.html" },
  { id: "hotel-kitchen", label: "Hotel Kitchen", group: "Commercial", path: "details/work/commercial/hotel-kitchen.html" },
  { id: "five-oars-coffee-brewers", label: "Five Oars Coffee Brewers", group: "Commercial", path: "details/work/commercial/five-oars-coffee-brewers.html" },
  { id: "lunar-coffee-brewers", label: "Lunar Coffee Brewers", group: "Commercial", path: "details/work/commercial/lunar-coffee-brewers.html" },
  { id: "commercial-gymnasium-farrer-road", label: "Commercial Gymnasium @ Farrer Road", group: "Commercial", path: "details/work/commercial/commercial-gymnasium-farrer-road.html" },
  { id: "shilla-duty-free-changi-airports", label: "The Shilla Duty-Free @ Changi Airports", group: "Commercial", path: "details/work/commercial/shilla-duty-free-changi-airports.html" },
  { id: "rooftop-japanese-restaurant-garden", label: "Rooftop Japanese Restaurant Garden", group: "Commercial", path: "details/work/commercial/rooftop-japanese-restaurant-garden.html" },
  { id: "upper-east-coast-road", label: "Upper East Coast Road", group: "Residential", path: "details/work/residential/upper-east-coast-road.html" },
  { id: "pinewood-grove", label: "Pinewood Grove", group: "Residential", path: "details/work/residential/pinewood-grove.html" },
  { id: "wandervale", label: "Wandervale", group: "Residential", path: "details/work/residential/wandervale.html" },
  { id: "jalan-sayang-residence", label: "Jalan Sayang Residence", group: "Residential", path: "details/work/residential/jalan-sayang-residence.html" },
  { id: "dnest", label: "DNest", group: "Residential", path: "details/work/residential/dnest.html" },
  { id: "countryside-road", label: "Countryside Road", group: "Residential", path: "details/work/residential/countryside-road.html" },
  { id: "mimosa-crescent", label: "Mimosa Crescent", group: "Residential", path: "details/work/residential/mimosa-crescent.html" },
  { id: "detached-bungalow-begonia-road", label: "Detached Bungalow @ Begonia Road", group: "Residential", path: "details/work/residential/detached-bungalow-begonia-road.html" },
  { id: "apartment-unit-yew-tee-residences", label: "Apartment Unit @ Yew Tee Residences", group: "Residential", path: "details/work/residential/apartment-unit-yew-tee-residences.html" },
  { id: "one-shenton-condominium", label: "One Shenton Condominium", group: "Residential", path: "details/work/residential/one-shenton-condominium.html" },
  { id: "detached-bungalow-sennett-avenue", label: "Detached Bungalow @ Sennett Avenue", group: "Residential", path: "details/work/residential/detached-bungalow-sennett-avenue.html" },
  { id: "palelai-buddhist-temple", label: "Palelai Buddhist Temple", group: "Religious", path: "details/work/religious/palelai-buddhist-temple.html" },
  { id: "loyang-tua-pek-kong", label: "Loyang Tua Pek Kong", group: "Religious", path: "details/work/religious/loyang-tua-pek-kong.html" },
  { id: "kong-meng-san-phor-kark-see-monastery", label: "Kong Meng San Phor Kark See Monastery", group: "Religious", path: "details/work/religious/kong-meng-san-phor-kark-see-monastery.html" },
  { id: "glamping-resort-perth", label: "Glamping Resort @ Perth", group: "Overseas", path: "details/work/overseas/glamping-resort-perth.html" },
  { id: "jurong-sports-hub", label: "Jurong Sports Hub", group: "Competitions", path: "details/work/competition/jurong-sports-hub.html" },
  { id: "one-shenton-leaf-award", label: "One Shenton LEAF Award - Gold", group: "Awards", path: "details/awards/one-shenton-leaf-award.html" },
];

const readMoreGroupOrder = [
  "Commercial",
  "Residential",
  "Religious",
  "Overseas",
  "Competitions",
  "Awards",
];

function initReadMoreMenu() {
  const body = document.body;
  const currentDetailId = body.dataset.detailId;
  const detailRoot = body.dataset.detailRoot || "";

  if (!body.classList.contains("page-detail") || !currentDetailId) return;

  const wrapper = document.createElement("div");
  wrapper.className = "read-more-menu";

  const toggle = document.createElement("button");
  toggle.className = "read-more-menu-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Open read more page menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "<span></span><span></span><span></span>";

  const panel = document.createElement("nav");
  panel.className = "read-more-menu-panel";
  panel.setAttribute("aria-label", "Read more page navigation");
  panel.hidden = true;

  const heading = document.createElement("p");
  heading.className = "read-more-menu-heading";
  heading.textContent = "Read more pages";
  panel.appendChild(heading);

  readMoreGroupOrder.forEach((group) => {
    const groupPages = readMorePages
      .filter((page) => page.group === group && page.id !== currentDetailId)
      .sort((first, second) => first.label.localeCompare(second.label));

    if (!groupPages.length) return;

    const section = document.createElement("section");
    section.className = "read-more-menu-group";

    const groupHeading = document.createElement("h2");
    groupHeading.textContent = group;
    section.appendChild(groupHeading);

    const list = document.createElement("div");
    list.className = "read-more-menu-links";

    groupPages.forEach((page) => {
      const link = document.createElement("a");
      link.href = detailRoot + page.path;
      link.textContent = page.label;
      list.appendChild(link);
    });

    section.appendChild(list);
    panel.appendChild(section);
  });

  wrapper.append(toggle, panel);
  siteHeader?.insertAdjacentElement("afterend", wrapper);

  function closeMenu() {
    wrapper.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
  }

  function openMenu() {
    wrapper.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.hidden = false;
  }

  toggle.addEventListener("click", () => {
    if (wrapper.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  panel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!wrapper.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

initReadMoreMenu();

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
const awardMediaViewer = awardGallery?.querySelector(".award-media-viewer");
const awardMediaButtons = awardGallery?.querySelectorAll(".award-media-controls button");
const awardMediaPrev = awardGallery?.querySelector(".award-media-prev");
const awardMediaNext = awardGallery?.querySelector(".award-media-next");
const awardMediaLightbox = awardGallery?.querySelector(".award-media-lightbox");
const awardMediaLightboxContent = awardGallery?.querySelector(".award-media-lightbox-content");
const awardMediaLightboxClose = awardGallery?.querySelector(".award-media-lightbox-close");
let awardMediaTimer = null;
let activeAwardMediaIndex = 0;
let activeAwardMedia = null;

function getYouTubeStartSeconds(value) {
  if (!value) return "";
  if (/^\d+$/.test(value)) return value;

  const hours = value.match(/(\d+)h/)?.[1] || 0;
  const minutes = value.match(/(\d+)m/)?.[1] || 0;
  const seconds = value.match(/(\d+)s/)?.[1] || 0;
  const total = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

  return total ? String(total) : "";
}

function getYouTubeEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const start =
      parsedUrl.searchParams.get("start") ||
      parsedUrl.searchParams.get("t") ||
      "";
    const normalizedStart = getYouTubeStartSeconds(start);
    const forcedStart = normalizedStart || "129";

    if (parsedUrl.hostname.includes("youtu.be")) {
      const videoId = parsedUrl.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${videoId}?start=${forcedStart}`;
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/embed/")) {
        parsedUrl.searchParams.set("start", forcedStart);
        return parsedUrl.toString();
      }

      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?start=${forcedStart}`;
      }
    }
  } catch (error) {
    return url;
  }

  return url;
}

function getAwardMediaData(button) {
  const type = button.dataset.type;
  let src = button.dataset.src || "";
  const start = button.dataset.start || "";

  if (type === "youtube") {
    src = getYouTubeEmbedUrl(start ? `${src}${src.includes("?") ? "&" : "?"}start=${start}` : src);
  }

  return {
    type,
    src,
    fit: button.dataset.fit || "cover",
    alt: button.dataset.alt || "One Shenton LEAF Award media",
  };
}

function createAwardMediaElement(media, enlarged = false) {
  let mediaElement;

  if (media.type === "image") {
    mediaElement = document.createElement("img");
    mediaElement.className = "award-media-image";
    mediaElement.src = media.src;
    mediaElement.alt = media.alt;
    mediaElement.loading = "lazy";
  }

  if (media.type === "video") {
    mediaElement = document.createElement("video");
    mediaElement.className = "award-media-video";
    mediaElement.src = media.src;
    mediaElement.controls = true;
    mediaElement.playsInline = true;
    mediaElement.preload = "metadata";
    mediaElement.setAttribute("aria-label", media.alt);
    if (enlarged) mediaElement.autoplay = true;
  }

  if (media.type === "youtube") {
    mediaElement = document.createElement("iframe");
    mediaElement.className = "award-media-embed";
    mediaElement.src = media.src;
    mediaElement.title = media.alt;
    mediaElement.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    mediaElement.allowFullscreen = true;
    mediaElement.loading = "lazy";
    mediaElement.referrerPolicy = "strict-origin-when-cross-origin";
  }

  return mediaElement;
}

function showAwardMedia(button) {
  if (!awardMediaViewer || !awardGallery) return;

  activeAwardMedia = getAwardMediaData(button);
  activeAwardMediaIndex = Array.from(awardMediaButtons || []).indexOf(button);

  clearTimeout(awardMediaTimer);
  awardMediaViewer.classList.add("is-changing");

  awardMediaTimer = window.setTimeout(() => {
    awardGallery.querySelector(".award-media-stage")?.classList.toggle("fit-contain", activeAwardMedia.fit === "contain");
    awardMediaViewer.innerHTML = "";

    const mediaElement = createAwardMediaElement(activeAwardMedia);

    if (mediaElement) {
      awardMediaViewer.appendChild(mediaElement);
    }

    awardMediaViewer.classList.remove("is-changing");
  }, 180);

  awardMediaButtons?.forEach((mediaButton) => {
    mediaButton.classList.toggle("active", mediaButton === button);
    mediaButton.setAttribute("aria-pressed", mediaButton === button ? "true" : "false");
  });
}

function openAwardMediaLightbox() {
  if (!activeAwardMedia || !awardMediaLightbox || !awardMediaLightboxContent) return;

  awardMediaLightboxContent.innerHTML = "";
  awardMediaLightbox.classList.toggle("fit-contain", activeAwardMedia.fit === "contain");

  const mediaElement = createAwardMediaElement(activeAwardMedia, true);
  if (mediaElement) {
    awardMediaLightboxContent.appendChild(mediaElement);
  }

  awardMediaLightbox.hidden = false;
  awardMediaLightbox.setAttribute("aria-hidden", "false");
}

function closeAwardMediaLightbox() {
  if (!awardMediaLightbox || !awardMediaLightboxContent) return;

  awardMediaLightbox.hidden = true;
  awardMediaLightbox.setAttribute("aria-hidden", "true");
  awardMediaLightboxContent.innerHTML = "";
}

awardMediaViewer?.addEventListener("click", openAwardMediaLightbox);
awardMediaLightboxClose?.addEventListener("click", closeAwardMediaLightbox);
awardMediaLightbox?.addEventListener("click", (event) => {
  if (event.target === awardMediaLightbox) {
    closeAwardMediaLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAwardMediaLightbox();
  }
});

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

function initStoryCarousels() {
  const storyCarousels = document.querySelectorAll("[data-story-carousel]");
  if (!storyCarousels.length) return;

  let lightbox = document.querySelector(".story-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.className = "story-lightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <button class="story-lightbox-close" type="button" aria-label="Close enlarged image">&times;</button>
      <div class="story-lightbox-content"></div>
    `;
    document.body.appendChild(lightbox);
  }

  const lightboxContent = lightbox.querySelector(".story-lightbox-content");
  const closeButton = lightbox.querySelector(".story-lightbox-close");

  function openLightbox(item) {
    lightboxContent.innerHTML = "";
    const image = document.createElement("img");
    image.src = item.src;
    image.alt = item.alt;
    image.loading = "eager";
    lightboxContent.appendChild(image);
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxContent.innerHTML = "";
  }

  closeButton?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });

  storyCarousels.forEach((carousel) => {
    const image = carousel.querySelector(".story-carousel-frame img");
    const previous = carousel.querySelector(".story-carousel-prev");
    const next = carousel.querySelector(".story-carousel-next");
    const tabsWrap = carousel.querySelector(".story-carousel-tabs");
    const dataNode = carousel.querySelector(".story-carousel-data");
    let items = [];
    let activeIndex = 0;

    try {
      items = JSON.parse(dataNode?.textContent || "[]");
    } catch (error) {
      items = [];
    }

    if (!image || !items.length) return;

    if (tabsWrap && !tabsWrap.querySelector("button")) {
      items.forEach((item, itemIndex) => {
        const tab = document.createElement("button");
        tab.type = "button";
        tab.textContent = item.label || `Image ${itemIndex + 1}`;
        tab.setAttribute("aria-pressed", itemIndex === 0 ? "true" : "false");
        tabsWrap.appendChild(tab);
      });
    }

    const tabs = carousel.querySelectorAll(".story-carousel-tabs button");

    function setSlide(index) {
      activeIndex = (index + items.length) % items.length;
      const item = items[activeIndex];
      image.classList.add("is-changing");

      window.setTimeout(() => {
        image.src = item.src;
        image.alt = item.alt;
        image.classList.remove("is-changing");
      }, 160);

      tabs.forEach((tab, tabIndex) => {
        tab.classList.toggle("active", tabIndex === activeIndex);
        tab.setAttribute("aria-pressed", tabIndex === activeIndex ? "true" : "false");
      });
    }

    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-pressed", tabIndex === 0 ? "true" : "false");
      tab.addEventListener("click", () => setSlide(tabIndex));
    });

    previous?.addEventListener("click", () => setSlide(activeIndex - 1));
    next?.addEventListener("click", () => setSlide(activeIndex + 1));
    image.addEventListener("click", () => openLightbox(items[activeIndex]));
    setSlide(0);
  });
}

initStoryCarousels();

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
