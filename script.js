/* ============================================
   Configuration - Edit these values
   ============================================ */

const CONFIG = {
  // Replace with your actual Calendly link
  calendlyUrl: 'https://calendly.com/your-calendly-link',
  
  // Form submission endpoint (replace with your actual endpoint)
  formEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',
};

/* ============================================
   Initialize when page loads
   ============================================ */

window.addEventListener('load', function() {
  console.log('Page loaded, initializing Vue...');
  
  // Check if Vue is available
  if (typeof Vue === 'undefined') {
    console.error('Vue is not loaded! Check your internet connection or the CDN link.');
    return;
  }
  
  const { createApp } = Vue;
  
  const app = createApp({
    data() {
      return {
        // Navigation state
        scrolled: false,
        mobileMenuOpen: false,
        
        // Portfolio state
        expandedProject: null,
        
        // Form state
        formData: {
          name: '',
          email: '',
          company: '',
          phone: '',
          budget: '',
          timeline: '',
          projectTypes: [],
          projectOutline: '',
          inspiration: '',
          hearAbout: ''
        },
        isSubmitting: false,
        formSubmitted: false,
      };
    },
    
    mounted() {
      console.log('Vue app mounted successfully!');
      
      // Handle scroll events for navigation
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
      
      // Initialize animations
      this.$nextTick(() => {
        this.initAnimations();
      });
    },
    
    methods: {
      /* Navigation Methods */
      handleScroll() {
        this.scrolled = window.scrollY > 50;
      },
      
      /* Calendly Methods */
      openCalendly() {
        window.open(CONFIG.calendlyUrl, '_blank');
      },
      
      /* Portfolio Methods */
      toggleProject(index) {
        if (this.expandedProject === index) {
          this.expandedProject = null;
        } else {
          this.expandedProject = index;
        }
      },
      
      /* Form Methods */
      async submitForm() {
        if (!this.formData.name || !this.formData.email || !this.formData.budget || !this.formData.projectOutline) {
          alert('Please fill in all required fields.');
          return;
        }
        
        this.isSubmitting = true;
        
        try {
          const response = await fetch(CONFIG.formEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          });
          
          if (response.ok) {
            this.formSubmitted = true;
            this.resetForm();
            
            setTimeout(() => {
              this.formSubmitted = false;
            }, 5000);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
          console.error('Form submission error:', error);
          alert('There was an error submitting your form. Please try again or email us directly.');
        } finally {
          this.isSubmitting = false;
        }
      },
      
      resetForm() {
        this.formData = {
          name: '',
          email: '',
          company: '',
          phone: '',
          budget: '',
          timeline: '',
          projectTypes: [],
          projectOutline: '',
          inspiration: '',
          hearAbout: ''
        };
      },
      
      /* Animation Methods */
      initAnimations() {
        const elements = document.querySelectorAll('[v-animate]');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animated');
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        });
        
        elements.forEach(element => {
          observer.observe(element);
        });
      }
    }
  });
  
  // Mount the app
  try {
    app.mount('#app');
    console.log('Vue mounted to #app');
  } catch (error) {
    console.error('Failed to mount Vue:', error);
  }
});

/* ============================================
   Vanilla JavaScript Enhancements
   ============================================ */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Don't prevent default for empty anchors
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  
  if (menu && menu.classList.contains('nav__menu--open')) {
    if (!nav.contains(e.target)) {
      // Dispatch a custom event to close the menu via Vue
      window.dispatchEvent(new CustomEvent('closeMobileMenu'));
    }
  }
});

// Listen for custom close event in Vue
window.addEventListener('closeMobileMenu', () => {
  const app = document.querySelector('#app').__vueParentComponent;
  if (app) {
    app.ctx.mobileMenuOpen = false;
  }
});

// Add loading state to images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
});

// Add print styles handler
window.addEventListener('beforeprint', () => {
  // Expand all project details for printing
  const app = document.querySelector('#app').__vueParentComponent;
  if (app && app.ctx.expandedProject === null) {
    document.querySelectorAll('.project__details').forEach(detail => {
      detail.style.display = 'block';
    });
  }
});

window.addEventListener('afterprint', () => {
  // Restore original state
  const app = document.querySelector('#app').__vueParentComponent;
  if (app && app.ctx.expandedProject === null) {
    document.querySelectorAll('.project__details').forEach(detail => {
      detail.style.display = '';
    });
  }
});

// Performance monitoring (optional, for development)
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
  // Add focus visible class for keyboard navigation
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
  
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('user-is-tabbing');
  });
  
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
});

// Form validation helpers
const formValidation = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  phone: (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
  },
  
  required: (value) => {
    return value && value.trim() !== '';
  }
};

// Expose validation helpers globally
window.formValidation = formValidation;

/* ============================================
   Console Message
   ============================================ */

console.log('%cTiny Cabin Creative', 'font-size: 24px; font-weight: bold; color: #8B7355;');
console.log('%cBuilt with care 🌲', 'font-size: 14px; color: #6B8E23;');
console.log('Interested in working together? Visit: ' + window.location.origin + '/contact.html');
