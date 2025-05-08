// Custom Header JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const header = document.querySelector('.custom-header');
  const mobileToggle = document.querySelector('.custom-header__mobile-toggle');
  const mobileMenu = document.querySelector('.custom-header__mobile-menu');
  const submenuToggles = document.querySelectorAll('.custom-header__mobile-submenu-toggle');

  // Handle scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Check scroll position on page load
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');

      // Prevent body scrolling when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }

  // Submenu toggles in mobile menu
  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const submenu = this.nextElementSibling;

      this.textContent = submenu.classList.contains('active') ? '+' : '−';
      submenu.classList.toggle('active');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      if (!mobileMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // Close mobile menu on window resize (when switching to desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991 && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});
