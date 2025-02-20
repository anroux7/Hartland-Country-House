/** MOBILE NAVBAR */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("hamburger-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", function () {
    mobileMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");
  });
});


/*** NAVBAR COLOUR CHANGE ON SCROLL ***/
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  const heroSection = document.querySelector(".carousel-container");
  const heroHeight = heroSection.offsetHeight;

  if (window.scrollY > heroHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


/*** BIG CAROUSEL ***/
const prevButton = document.querySelector(".carousel-prev");
const nextButton = document.querySelector(".carousel-next");
const carousel = document.querySelector(".carousel");
const images = carousel.querySelectorAll(".carousel-image, .carousel-video");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;

  // Pause the previous video when moving to the next slide
  images.forEach((item, index) => {
    if (item.tagName.toLowerCase() === "video") {
      if (index === currentIndex) {
        item.play(); // Play the current video
      } else {
        item.pause(); // Pause all other videos
      }
    }
  });

  // Update active dot
  updateActiveDot();
}

// Function to update active dot
function updateActiveDot() {
  const dots = dotsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

// Create dot indicators dynamically
function createDots() {
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

function showPrevImage() {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateCarousel();
}

function showNextImage() {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateCarousel();
}

function openLightbox(index) {
  lightbox.style.display = "flex";
  lightboxImage.src = images[index].src;
  currentIndex = index;
}

function closeLightbox() {
  lightbox.style.display = "none";
}

// Open lightbox when image is clicked
images.forEach((image, index) => {
  image.addEventListener("click", () => {
    openLightbox(index);
  });
});

// Navigate through the images in the lightbox
lightboxPrev.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  lightboxImage.src = images[currentIndex].src;
});

lightboxNext.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  lightboxImage.src = images[currentIndex].src;
});

// Close the lightbox
lightboxClose.addEventListener("click", closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Initialize the carousel
prevButton.addEventListener("click", showPrevImage);
nextButton.addEventListener("click", showNextImage);

// Auto-play carousel every 7 seconds
setInterval(showNextImage, 7000);

// Create and display dots for the carousel
createDots();
updateCarousel();


/*** SMALL CAROUSEL ***/
document.addEventListener("DOMContentLoaded", function () {
  // Small Carousel
  const smallCarousel = document.querySelector(".small-carousel");
  const smallPrev = document.querySelector(".small-carousel-prev");
  const smallNext = document.querySelector(".small-carousel-next");
  const smallDotsContainer = document.querySelector(".small-carousel-dots");
  const smallImages = smallCarousel.querySelectorAll("img");
  const smallLightbox = document.getElementById("small-lightbox");
  const smallLightboxImage = document.getElementById("small-lightbox-image");
  const smallLightboxClose = document.getElementById("small-lightbox-close");
  const smallLightboxPrev = document.querySelector(".small-lightbox-prev");
  const smallLightboxNext = document.querySelector(".small-lightbox-next");

  let smallCurrentIndex = 0;
  const smallImagesPerView = 2;
  const smallTotalImages = smallImages.length;

  function updateSmallCarousel() {
    const offset = -smallCurrentIndex * (100 / smallImagesPerView);
    smallCarousel.style.transform = `translateX(${offset}%)`;
    updateSmallActiveDot();
  }

  function updateSmallActiveDot() {
    const dots = smallDotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      if (index === smallCurrentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function createSmallDots() {
    const totalDots = Math.ceil(smallTotalImages / smallImagesPerView);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.addEventListener("click", () => {
        smallCurrentIndex = i;
        updateSmallCarousel();
      });
      smallDotsContainer.appendChild(dot);
    }
  }

  function showSmallPrevImage() {
    smallCurrentIndex =
      smallCurrentIndex === 0
        ? Math.ceil(smallTotalImages / smallImagesPerView) - 1
        : smallCurrentIndex - 1;
    updateSmallCarousel();
  }

  function showSmallNextImage() {
    smallCurrentIndex =
      smallCurrentIndex === Math.ceil(smallTotalImages / smallImagesPerView) - 1
        ? 0
        : smallCurrentIndex + 1;
    updateSmallCarousel();
  }

  function openSmallLightbox(index) {
    smallLightbox.style.display = "flex";
    smallLightboxImage.src = smallImages[index].src;
    smallCurrentIndex = index;
  }

  function closeSmallLightbox() {
    smallLightbox.style.display = "none";
  }

  // Open lightbox when image is clicked
  smallImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      openSmallLightbox(index);
    });
  });

  // Navigate through the images in the lightbox
  smallLightboxPrev.addEventListener("click", () => {
    smallCurrentIndex =
      smallCurrentIndex === 0 ? smallImages.length - 1 : smallCurrentIndex - 1;
    smallLightboxImage.src = smallImages[smallCurrentIndex].src;
  });

  smallLightboxNext.addEventListener("click", () => {
    smallCurrentIndex =
      smallCurrentIndex === smallImages.length - 1 ? 0 : smallCurrentIndex + 1;
    smallLightboxImage.src = smallImages[smallCurrentIndex].src;
  });

  // Close the lightbox
  smallLightboxClose.addEventListener("click", closeSmallLightbox);

  // Close lightbox when clicking outside the image
  smallLightbox.addEventListener("click", (e) => {
    if (e.target === smallLightbox) {
      closeSmallLightbox();
    }
  });

  smallPrev.addEventListener("click", showSmallPrevImage);
  smallNext.addEventListener("click", showSmallNextImage);

  createSmallDots();
  updateSmallCarousel();
});


/*** GALLERY LIGHTBOX ***/
document.addEventListener("DOMContentLoaded", function () {
  const galleryLightbox = document.getElementById("gallery-lightbox");
  const galleryLightboxImage = document.getElementById(
    "gallery-lightbox-image"
  );
  const closeGalleryLightbox = document.querySelector(
    ".close-gallery-lightbox"
  );
  const galleryImages = document.querySelectorAll(".gallery-image");

  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      galleryLightbox.style.display = "flex";
      galleryLightboxImage.src = this.src;
    });
  });

  closeGalleryLightbox.addEventListener("click", function () {
    galleryLightbox.style.display = "none";
  });

  // Close lightbox when clicking outside the image
  galleryLightbox.addEventListener("click", function (e) {
    if (e.target === galleryLightbox) {
      galleryLightbox.style.display = "none";
    }
  });
});
