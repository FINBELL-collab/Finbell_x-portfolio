// ===================== script.js =====================

// Smooth scrolling for navigation
document.querySelectorAll('nav a, .mobile-nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu after clicking
      document.querySelector('.mobile-nav').classList.remove('active');
      document.querySelector('.hamburger').classList.remove('active');
    }
  });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const progressBar = document.querySelector('.progress-bar-fill');
  if (scrollProgress && progressBar) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  const body = document.body;

  if (cursor && cursorFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorFollower.style.left = mouseX + 'px';
      cursorFollower.style.top = mouseY + 'px';

      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .project-card, .social-link, .tilt-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });
  }
});

// Magnetic Buttons
document.addEventListener('DOMContentLoaded', () => {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
});

// Parallax Scrolling
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  parallaxLayers.forEach((layer, index) => {
    const speed = (index + 1) * 0.5;
    layer.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// 3D Tilt Effect
document.addEventListener('DOMContentLoaded', () => {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
});

// Project Modal Functions
function openProjectModal(projectId) {
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');

  const projects = {
    architect: {
      title: 'Architect Studio',
      description: 'A responsive architectural portfolio concept made for strong storytelling, elegant layouts, and smooth browsing.',
      technologies: ['HTML', 'CSS', 'UI Layout'],
      features: ['Modern hero section', 'Clear content hierarchy', 'Mobile-friendly layout', 'Polished typography'],
      previewImage: 'assets/architect.png',
      status: 'completed'
    },
    coffee: {
      title: 'Coffee House',
      description: 'A warm, brand-led website concept designed to highlight atmosphere, product quality, and customer experience.',
      technologies: ['HTML', 'CSS', 'Branding'],
      features: ['Emotion-driven visuals', 'Service-focused sections', 'Responsive navigation', 'Soft visual theme'],
      previewImage: 'assets/coffee.png',
      status: 'completed'
    },
    digitalhub: {
      title: 'DigitalHub Solutions',
      description: 'An agency-style concept focused on clarity, service presentation, and easy exploration of company information.',
      technologies: ['HTML', 'CSS', 'Business UI'],
      features: ['Service overview', 'Portfolio-friendly sections', 'Clear contact flow', 'Professional layout'],
      previewImage: 'assets/digitalhub.png',
      status: 'completed'
    },
    salon: {
      title: 'Hair Salon',
      description: 'A service-first landing page concept focused on trust, offers, and a strong call to action.',
      technologies: ['HTML', 'CSS', 'Conversion UI'],
      features: ['Booking-friendly design', 'Service highlights', 'Elegant visual style', 'Strong CTA sections'],
      previewImage: 'assets/salon.png',
      status: 'completed'
    },
    tea: {
      title: 'Tea Shop',
      description: 'A product-led website concept built to communicate quality, story, and a smooth shopping experience.',
      technologies: ['HTML', 'CSS', 'E-commerce'],
      features: ['Product-led sections', 'Clean content blocks', 'Modern visual rhythm', 'Clear action prompts'],
      previewImage: 'assets/tea.png',
      status: 'completed'
    },
    studio: {
      title: 'Photo Studio',
      description: 'A creative showcase concept designed to present visual work with elegance, balance, and storytelling.',
      technologies: ['HTML', 'CSS', 'Visual Storytelling'],
      features: ['Gallery-friendly layout', 'Creative section flow', 'Bold imagery support', 'Elegant typography'],
      previewImage: 'assets/studio.png',
      status: 'completed'
    }
  };

  const project = projects[projectId];
  if (project && modal && modalContent) {
    modalContent.innerHTML = `
      <div class="modal-header">
        <span class="modal-category">${project.status === 'completed' ? 'Completed Project' : 'In Development'}</span>
        <h2>${project.title}</h2>
      </div>
      ${project.previewImage ? `<div class="modal-preview-frame"><img src="${project.previewImage}" alt="${project.title} preview"></div>` : ''}
      <div class="modal-body">
        <p>${project.description}</p>
        <div class="modal-section">
          <h3>Key Features</h3>
          <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <h3>Technologies Used</h3>
          <div class="tech-stack">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
        <div class="modal-actions">
          ${project.previewUrl ? `<a href="${project.previewUrl}" class="btn" target="_blank" rel="noopener">
            <i class="fas fa-external-link-alt"></i> Open Preview
          </a>` : ''}
          <button class="btn btn-secondary" type="button" onclick="closeProjectModal()">
            Close Preview
          </button>
        </div>
      </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('projectModal');
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Staggered animations
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const projectCards = document.querySelectorAll('.project-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');

  [...cards, ...projectCards, ...testimonialCards].forEach((card, index) => {
    card.classList.add(`stagger-${(index % 6) + 1}`);
  });
});

// Ripple effect for buttons
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.classList.add('ripple');
  });
});

// Enhanced particles with mouse interaction
function createInteractiveParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle interactive-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 8 + 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 6 + 6) + 's';

    // Add mouse interaction
    particle.addEventListener('mouseenter', () => {
      particle.style.transform = 'scale(1.5)';
      particle.style.background = 'rgba(168, 85, 247, 0.8)';
    });

    particle.addEventListener('mouseleave', () => {
      particle.style.transform = 'scale(1)';
      particle.style.background = 'rgba(168, 85, 247, 0.1)';
    });

    particlesContainer.appendChild(particle);
  }
}

createInteractiveParticles();

// Scroll to contact function
function scrollToContact() {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Project filtering functionality
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.classList.remove('hide');
          card.classList.add('show');
        } else {
          card.classList.add('hide');
          card.classList.remove('show');
        }
      });
    });
  });

  // Load more projects functionality
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let visibleProjects = 6; // Initially show 6 projects
  const totalProjects = projectCards.length;

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleProjects += 3; // Load 3 more projects

      projectCards.forEach((card, index) => {
        if (index < visibleProjects) {
          card.style.display = 'block';
        }
      });

      if (visibleProjects >= totalProjects) {
        loadMoreBtn.style.display = 'none';
      }
    });
  }

  // Initially hide projects beyond the first 6
  projectCards.forEach((card, index) => {
    if (index >= 6) {
      card.style.display = 'none';
    }
  });

  // Update modal data for new projects
  const updatedProjects = {
    healthcare: {
      title: 'Healthcare Management System',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      description: 'A comprehensive healthcare management platform for clinics with appointment scheduling, patient records management, and telemedicine features. Built with HIPAA compliance in mind.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'WebRTC', 'Docker', 'Kubernetes'],
      features: ['Appointment scheduling', 'Patient records', 'Telemedicine', 'Prescription management', 'Staff management', 'Reporting'],
      demo: '#',
      github: '#',
      status: 'in-progress'
    },
    social: {
      title: 'Social Media Analytics Platform',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      description: 'An advanced social media management tool with analytics, scheduling, and multi-platform integration. Helps businesses manage their social presence effectively with data-driven insights.',
      technologies: ['React', 'GraphQL', 'AWS', 'Python', 'Machine Learning', 'Redis'],
      features: ['Multi-platform integration', 'Analytics dashboard', 'Content scheduling', 'Engagement tracking', 'Automated posting', 'Performance reports'],
      demo: '#',
      github: '#',
      status: 'completed'
    },
    lms: {
      title: 'E-Learning Management System',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop',
      description: 'An interactive learning management system with course creation, progress tracking, and collaborative features. Designed for educational institutions and corporate training programs.',
      technologies: ['Next.js', 'Prisma', 'Stripe', 'WebRTC', 'AWS S3', 'PostgreSQL'],
      features: ['Course creation', 'Progress tracking', 'Video conferencing', 'Quizzes & assessments', 'Discussion forums', 'Certificate generation'],
      demo: '#',
      github: '#',
      status: 'completed'
    }
  };

  // Merge with existing projects
  Object.assign(window.projectData || {}, updatedProjects);
});

// Mobile menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.mobile-nav').classList.toggle('active');
  document.querySelector('.hamburger').classList.toggle('active');
});

// Theme toggle
const themeSwitch = document.getElementById('theme-switch');
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeSwitch.checked = true;
}

// Typing effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
  const typedText = document.getElementById('typed-text');
  setTimeout(() => {
    typeWriter(typedText, 'Smart Experiences', 150);
  }, 1000);
});

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 6 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Enhanced scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, observerOptions);

// Observe all cards and project cards
document.querySelectorAll('.card, .project-card').forEach(el => {
  observer.observe(el);
});

// Scroll to projects function
function scrollToProjects() {
  const projectsSection = document.getElementById('projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' });
}

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(0,0,0,0.8)';
  } else {
    header.style.background = 'rgba(0,0,0,0.5)';
  }

  if (document.body.classList.contains('light-mode')) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255,255,255,0.9)';
    } else {
      header.style.background = 'rgba(255,255,255,0.9)';
    }
  }
});

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1000);
  }
});

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;

    const updateCount = () => {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

// Trigger counter animation when hero is in view
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  if (hero) heroObserver.observe(hero);
});

// Enhanced scroll reveal animation for testimonials
const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.testimonial-card').forEach(card => {
  testimonialObserver.observe(card);
});

// Progress bar animation for skills
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.progress');
      progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.setProperty('--progress-width', width);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
  progressObserver.observe(category);
});

// Contact form handling
const copyEmailBtn = document.getElementById('copyEmailBtn');

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(recipientEmail);
      copyEmailBtn.textContent = 'Email copied';
      setTimeout(() => {
        copyEmailBtn.textContent = 'Copy Email';
      }, 1500);
    } catch (error) {
      copyEmailBtn.textContent = 'Copy failed';
    }
  });
}

// Back to top button
const backToTopButton = document.getElementById('backToTop');
if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
