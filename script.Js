document.addEventListener('DOMContentLoaded', function () {

  // ── Hamburger menu ──
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  function toggleMenu(e) {
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close when a menu link is clicked
  document.querySelectorAll('.mobile-menu a').forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1279) closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ── Active nav link on scroll ──
  var sections = document.querySelectorAll('section[id], div[id]');
  var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  var sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function(link) {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--teal)';
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(function(section) {
    sectionObserver.observe(section);
  });

  // ── Skill bars animate on scroll ──
  var fills = document.querySelectorAll('.skill-bar-fill');
  var barObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(function(fill) {
    fill.style.animationPlayState = 'paused';
    barObserver.observe(fill);
  });

});