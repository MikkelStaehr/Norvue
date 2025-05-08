// Hero Slider JavaScript - Version 1.0

document.addEventListener('DOMContentLoaded', function () {
  const sliders = document.querySelectorAll('.hero-slider');

  sliders.forEach(function (slider) {
    const slides = slider.querySelectorAll('.hero-slider__slide');
    const dots = slider.querySelectorAll('.hero-slider__dot');
    const autoplay = slider.getAttribute('data-autoplay') === 'true';
    const slideInterval = parseInt(slider.getAttribute('data-slide-interval')) || 5000;
    let currentSlide = 0;
    let slideTimer;

    // Funktion til at skifte slide
    function goToSlide(index) {
      // Hvis samme slide, gør ingenting
      if (currentSlide === index) return;

      // Fjern active klasse fra nuværende slide og dot
      slides[currentSlide].classList.remove('active');
      if (dots.length) dots[currentSlide].classList.remove('active');

      // Tilføj active klasse til ny slide og dot
      slides[index].classList.add('active');
      if (dots.length) dots[index].classList.add('active');

      // Opdater currentSlide
      currentSlide = index;

      // Send custom event når slide skifter
      const slideChangeEvent = new CustomEvent('slideChange', {
        detail: {
          slider: slider,
          newSlide: slides[index],
          newIndex: index,
        },
      });
      document.dispatchEvent(slideChangeEvent);

      // Reset timer hvis autoplay er aktiveret
      if (autoplay) {
        clearInterval(slideTimer);
        startAutoPlay();
      }
    }

    // Funktion til at gå til næste slide
    function nextSlide() {
      const newIndex = (currentSlide + 1) % slides.length;
      goToSlide(newIndex);
    }

    // Funktion til at starte autoplay
    function startAutoPlay() {
      slideTimer = setInterval(nextSlide, slideInterval);
    }

    // Tilføj event listeners til dots
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        goToSlide(index);
      });
    });

    // Start autoplay hvis aktiveret
    if (autoplay && slides.length > 1) {
      startAutoPlay();
    }

    // Pause autoplay ved hover over slider
    slider.addEventListener('mouseenter', function () {
      if (autoplay) clearInterval(slideTimer);
    });

    // Genoptag autoplay når musen forlader slideren
    slider.addEventListener('mouseleave', function () {
      if (autoplay && slides.length > 1) startAutoPlay();
    });

    // Swipe funktionalitet til touch-enheder
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
      'touchstart',
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    slider.addEventListener(
      'touchend',
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeThreshold = 50; // Minimum swipe distance

      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe venstre - gå til næste slide
        nextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe højre - gå til forrige slide
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
      }
    }
  });
});
