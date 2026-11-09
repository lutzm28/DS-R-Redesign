/* JavaScript File */

const homeCarousels = {
  primary: [
    { src: "assets/home-highline.jpg", alt: "Aerial view of the High Line" },
    { src: "assets/home-mosque.jpg", alt: "Mosque for women" },
    { src: "assets/home-pina.jpg", alt: "Pina Bausch Zentrum" },
    { src: "assets/home-broad.jpg", alt: "The Broad interior" }
  ],
  secondary: [
    { src: "assets/home-columbia.jpg", alt: "Columbia University campus" },
    { src: "assets/home-mosque-exterior.jpg", alt: "Mosque for women exterior" },
    { src: "assets/home-storehouse.jpg", alt: "Storehouse interior" },
    { src: "assets/home-olympic-museum.jpg", alt: "Olympic and Paralympic Museum" }
  ]
};

document.querySelectorAll("[data-home-control]").forEach((control) => {
  const carouselName = control.dataset.homeControl;
  homeCarousels[carouselName].forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = "home-pagination-dot";
    dot.setAttribute("aria-hidden", "true");
    dot.dataset.paginationIndex = String(index);
    control.append(dot);
  });
});

const updateHomePagination = (carouselName, index) => {
  document.querySelectorAll(`[data-home-control="${carouselName}"] .home-pagination-dot`)
    .forEach((dot) => {
      dot.classList.toggle("is-active", Number(dot.dataset.paginationIndex) === index);
    });
};

const advanceHomeCarousel = (carouselName) => {
  const images = homeCarousels[carouselName];
  const image = document.querySelector(`[data-home-carousel="${carouselName}"]`);
  const currentIndex = Number(image.dataset.carouselIndex || 0);
  const nextIndex = (currentIndex + 1) % images.length;
  const nextImage = images[nextIndex];

  image.src = nextImage.src;
  image.alt = nextImage.alt;
  image.dataset.carouselIndex = String(nextIndex);
  updateHomePagination(carouselName, nextIndex);
};

document.querySelectorAll("[data-home-control]").forEach((control) => {
  updateHomePagination(control.dataset.homeControl, 0);
  control.addEventListener("click", () => {
    advanceHomeCarousel(control.dataset.homeControl);
  });
});

Object.keys(homeCarousels).forEach((carouselName) => {
  window.setInterval(() => advanceHomeCarousel(carouselName), 5000);
});