/** MOBILE NAVBAR */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("hamburger-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");
      menuToggle.classList.toggle("open");
    });
  }

  /*** NAVBAR COLOUR CHANGE ON SCROLL ***/
  const navbar = document.getElementById("navbar");
  const heroSection = document.querySelector(".carousel-container");
  const isHomePage =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/";

  function updateNavbar() {
    if (isHomePage && heroSection) {
      const heroHeight = heroSection.offsetHeight;

      if (window.scrollY > heroHeight) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled"); // Transparent navbar on hero
      }
    } else {
      navbar.classList.add("scrolled"); // Always black/white on other pages
    }
  }

  if (navbar) {
    window.addEventListener("scroll", updateNavbar);
    updateNavbar();
  }
});

/**  */
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => observer.observe(img));
});

/*** BIG CAROUSEL ***/
document.addEventListener("DOMContentLoaded", function () {
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const carousel = document.querySelector(".carousel");
  const images = carousel
    ? carousel.querySelectorAll(".carousel-image, .carousel-video")
    : [];
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.querySelector(".lightbox-prev");
  const lightboxNext = document.querySelector(".lightbox-next");
  const dotsContainer = document.querySelector(".carousel-dots");

  let currentIndex = 0;

  function updateCarousel() {
    if (!carousel) return;
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
    if (!dotsContainer) return;
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
    if (!dotsContainer) return;
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
    if (!lightbox || !lightboxImage) return;
    lightbox.style.display = "flex";
    lightboxImage.src = images[index].src;
    currentIndex = index;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = "none";
  }

  if (images.length) {
    // Open lightbox when image is clicked
    images.forEach((image, index) => {
      image.addEventListener("click", () => {
        openLightbox(index);
      });
    });

    // Navigate through the images in the lightbox
    if (lightboxPrev && lightboxNext) {
      lightboxPrev.addEventListener("click", () => {
        currentIndex =
          currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        lightboxImage.src = images[currentIndex].src;
      });

      lightboxNext.addEventListener("click", () => {
        currentIndex =
          currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        lightboxImage.src = images[currentIndex].src;
      });
    }

    // Close the lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    // Close lightbox when clicking outside the image
    if (lightbox) {
      lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Initialize the carousel
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", showPrevImage);
      nextButton.addEventListener("click", showNextImage);

      // Auto-play carousel every 7 seconds
      setInterval(showNextImage, 7000);

      // Create and display dots for the carousel
      createDots();
      updateCarousel();
    }
  }
});

/*** SMALL CAROUSEL ***/
document.addEventListener("DOMContentLoaded", function () {
  const smallCarousels = document.querySelectorAll(".small-carousel");

  smallCarousels.forEach((smallCarousel, carouselIndex) => {
    const smallPrev = smallCarousel.parentElement.querySelector(
      ".small-carousel-prev"
    );
    const smallNext = smallCarousel.parentElement.querySelector(
      ".small-carousel-next"
    );
    const smallDotsContainer = smallCarousel.parentElement.querySelector(
      ".small-carousel-dots"
    );
    const smallImages = smallCarousel.querySelectorAll("img");

    let smallCurrentIndex = 0;
    let smallImagesPerView = getImagesPerView(); // Dynamically set images per view
    const smallTotalImages = smallImages.length;
    let totalDots = Math.max(
      1,
      Math.ceil(smallTotalImages / smallImagesPerView)
    );

    // Create a unique lightbox for each carousel
    const smallLightbox = document.createElement("div");
    smallLightbox.classList.add("small-lightbox");
    smallLightbox.innerHTML = `
      <div class="small-lightbox-content">
        <span class="small-lightbox-close">&times;</span>
        <img class="small-lightbox-image" src="" alt="">
        <div class="small-lightbox-controls">
          <span class="small-lightbox-prev">&#10094;</span>
          <span class="small-lightbox-next">&#10095;</span>
        </div>
      </div>
    `;
    document.body.appendChild(smallLightbox);

    const smallLightboxImage = smallLightbox.querySelector(
      ".small-lightbox-image"
    );
    const smallLightboxClose = smallLightbox.querySelector(
      ".small-lightbox-close"
    );
    const smallLightboxPrev = smallLightbox.querySelector(
      ".small-lightbox-prev"
    );
    const smallLightboxNext = smallLightbox.querySelector(
      ".small-lightbox-next"
    );

    function getImagesPerView() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        return 1; // Mobile: 1 image per view
      } else if (window.matchMedia("(max-width: 1200px)").matches) {
        return 2; // Tablet: 2 images per view
      } else {
        return 3; // Desktop: 3 images per view
      }
    }

    function updateSmallCarousel() {
      smallImagesPerView = getImagesPerView();
      totalDots = Math.max(1, Math.ceil(smallTotalImages / smallImagesPerView));
      smallCarousel.style.setProperty("--items-per-view", smallImagesPerView);
      smallCurrentIndex = Math.min(smallCurrentIndex, totalDots - 1);
      const offset = -smallCurrentIndex * (100 / smallImagesPerView);
      smallCarousel.style.transform = `translateX(${offset}%)`;
      updateSmallActiveDot();
    }

    function updateSmallActiveDot() {
      if (!smallDotsContainer) return;
      const dots = smallDotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === smallCurrentIndex);
      });
    }

    function createSmallDots() {
      if (!smallDotsContainer) return;
      smallDotsContainer.innerHTML = ""; // Clear existing dots
      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          smallCurrentIndex = i;
          updateSmallCarousel();
        });
        smallDotsContainer.appendChild(dot);
      }
      updateSmallActiveDot();
    }

    function showSmallPrevImage() {
      smallCurrentIndex =
        smallCurrentIndex === 0 ? totalDots - 1 : smallCurrentIndex - 1;
      updateSmallCarousel();
    }

    function showSmallNextImage() {
      smallCurrentIndex =
        smallCurrentIndex === totalDots - 1 ? 0 : smallCurrentIndex + 1;
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

    if (smallImages.length) {
      smallImages.forEach((image, index) => {
        image.addEventListener("click", () => {
          openSmallLightbox(index);
        });
      });

      smallLightboxPrev.addEventListener("click", () => {
        smallCurrentIndex =
          smallCurrentIndex === 0
            ? smallImages.length - 1
            : smallCurrentIndex - 1;
        smallLightboxImage.src = smallImages[smallCurrentIndex].src;
      });

      smallLightboxNext.addEventListener("click", () => {
        smallCurrentIndex =
          smallCurrentIndex === smallImages.length - 1
            ? 0
            : smallCurrentIndex + 1;
        smallLightboxImage.src = smallImages[smallCurrentIndex].src;
      });

      smallLightboxClose.addEventListener("click", closeSmallLightbox);
      smallLightbox.addEventListener("click", (e) => {
        if (e.target === smallLightbox) {
          closeSmallLightbox();
        }
      });

      if (smallPrev && smallNext) {
        smallPrev.addEventListener("click", showSmallPrevImage);
        smallNext.addEventListener("click", showSmallNextImage);
      }

      createSmallDots();
      updateSmallCarousel();
    }

    window.addEventListener("resize", updateSmallCarousel);
  });
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

  if (galleryImages.length) {
    galleryImages.forEach((image) => {
      image.addEventListener("click", function () {
        if (!galleryLightbox || !galleryLightboxImage) return;
        galleryLightbox.style.display = "flex";
        galleryLightboxImage.src = this.src;
      });
    });

    if (closeGalleryLightbox) {
      closeGalleryLightbox.addEventListener("click", function () {
        galleryLightbox.style.display = "none";
      });
    }

    // Close lightbox when clicking outside the image
    if (galleryLightbox) {
      galleryLightbox.addEventListener("click", function (e) {
        if (e.target === galleryLightbox) {
          galleryLightbox.style.display = "none";
        }
      });
    }
  }
});
