document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // Navbar Scroll Behavior
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ==========================================================================
  // Mobile Navigation Menu Toggle
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
      
      // Animate hamburger lines
      const bars = mobileMenuBtn.querySelectorAll('.bar');
      if (mobileMenuBtn.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        const bars = mobileMenuBtn.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
  }

  // ==========================================================================
  // Interactive Timeline Experience Detail Toggling (Click & Touch)
  // ==========================================================================
  const timelineCards = document.querySelectorAll('.timeline-card');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineCards.forEach(card => {
    // Click behavior
    card.addEventListener('click', (e) => {
      // Prevent expanding if clicking on a link
      if (e.target.tagName.toLowerCase() === 'a') return;

      const parentItem = card.closest('.timeline-item');
      const isCurrentlyActive = parentItem.classList.contains('active');

      // Close all other experiences for a clean accordion effect
      timelineItems.forEach(item => {
        item.classList.remove('active');
        const btn = item.querySelector('.expand-btn');
        if (btn) btn.textContent = 'Mostra Dettagli';
      });

      // Toggle current experience
      if (!isCurrentlyActive) {
        parentItem.classList.add('active');
        const btn = card.querySelector('.expand-btn');
        if (btn) btn.textContent = 'Nascondi Dettagli';
      }
    });

    // Touch Event Handling to ensure zero latency on mobile
    card.addEventListener('touchstart', function(e) {
      this.classList.add('touch-active');
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
      this.classList.remove('touch-active');
    }, { passive: true });
  });

  // Expand buttons inside timeline cards
  const expandBtns = document.querySelectorAll('.expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent duplicate trigger from card click
      const card = btn.closest('.timeline-card');
      card.click();
    });
  });

  // Set the first experience active by default so the user immediately sees it's interactive
  if (timelineItems.length > 0) {
    timelineItems[0].classList.add('active');
    const firstBtn = timelineItems[0].querySelector('.expand-btn');
    if (firstBtn) firstBtn.textContent = 'Nascondi Dettagli';
  }

  // ==========================================================================
  // Dynamic Scroll Animations (Skills, Languages) using IntersectionObserver
  // ==========================================================================
  
  // Progress Bars Animation
  const progressBars = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.style.width;
        bar.style.width = '0'; // Reset width first
        setTimeout(() => {
          bar.style.width = targetWidth; // Animate to width
        }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.1 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });

  // Circular Language Charts Animation
  const circles = document.querySelectorAll('.circle');
  const circleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const circle = entry.target;
        const targetStrokeDash = circle.getAttribute('stroke-dasharray');
        const percentage = targetStrokeDash.split(',')[0];
        circle.setAttribute('stroke-dasharray', `0, 100`); // Reset first
        setTimeout(() => {
          circle.setAttribute('stroke-dasharray', `${percentage}, 100`); // Animate to percentage
        }, 100);
        observer.unobserve(circle);
      }
    });
  }, { threshold: 0.1 });

  circles.forEach(circle => {
    circleObserver.observe(circle);
  });

  // ==========================================================================
  // Dynamic Year Auto-Update
  // ==========================================================================
  const copyrightElem = document.querySelector('.copyright');
  if (copyrightElem) {
    const currentYear = new Date().getFullYear();
    copyrightElem.innerHTML = `&copy; ${currentYear} Francesca Mazzoni. Tutti i diritti riservati.`;
  }
});
