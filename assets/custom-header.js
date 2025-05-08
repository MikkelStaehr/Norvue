// Custom Header JavaScript
document.addEventListener('DOMContentLoaded', function () {
  // Get header element
  const header = document.querySelector('.custom-header');

  // Handle scroll effect
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Check scroll position on load
  handleScroll();

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Mobile menu functionality
  const mobileToggle = document.querySelector('.custom-header__mobile-toggle');
  const mobileMenu = document.querySelector('.custom-header__mobile-menu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function () {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');

      // Prevent body scrolling when menu is open
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });
  }

  // Mobile submenu toggles
  const submenuToggles = document.querySelectorAll('.custom-header__mobile-submenu-toggle');

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', function () {
      const submenu = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      this.setAttribute('aria-expanded', !isExpanded);
      submenu.classList.toggle('active');

      // Update the button text or icon
      this.innerHTML = !isExpanded
        ? '<span class="visually-hidden">Luk</span>−'
        : '<span class="visually-hidden">Åbn</span>+';
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle) {
        mobileMenu.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // Handle window resize (e.g., close mobile menu when resizing to desktop)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991 && mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});
