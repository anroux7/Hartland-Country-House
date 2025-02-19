document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('hamburger-icon');
    const mobileMenu = document.getElementById('mobile-menu');
  
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  });
  
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.carousel-container'); // Assuming this is the hero section
    const heroHeight = heroSection.offsetHeight;
  
    if (window.scrollY > heroHeight) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });  
  
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const carousel = document.querySelector('.carousel');
  const images = carousel.querySelectorAll('.carousel-image, .carousel-video');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  let currentIndex = 0;
  
  function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
  
     // Pause the previous video when moving to the next slide
  images.forEach((item, index) => {
    if (item.tagName.toLowerCase() === 'video') {
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
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  // Create dot indicators dynamically
  function createDots() {
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  function showPrevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
  }
  
  function showNextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  }
  
  function openLightbox(index) {
    lightbox.style.display = 'flex';
    lightboxImage.src = images[index].src;
    currentIndex = index;
  }
  
  function closeLightbox() {
    lightbox.style.display = 'none';
  }
  
  // Open lightbox when image is clicked
  images.forEach((image, index) => {
    image.addEventListener('click', () => {
      openLightbox(index);
    });
  });
  
  // Navigate through the images in the lightbox
  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    lightboxImage.src = images[currentIndex].src;
  });
  
  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    lightboxImage.src = images[currentIndex].src;
  });
  
  // Close the lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  
  // Close lightbox when clicking outside the image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Initialize the carousel
  prevButton.addEventListener('click', showPrevImage);
  nextButton.addEventListener('click', showNextImage);
  
  // Auto-play carousel every 7 seconds
  setInterval(showNextImage, 7000);
  
  // Create and display dots for the carousel
  createDots();
  updateCarousel(); // Ensure the carousel starts with the correct state