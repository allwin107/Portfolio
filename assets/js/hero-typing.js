/**
 * Hero Section Typing Animation
 */

(function() {
  'use strict';

  // Typing animation for hero title
  const typingText = document.querySelector('.typing-text');
  
  if (typingText) {
    const titles = [
      'AI & ML Engineer',
      'Voice-AI Specialist',
      'NLP Expert',
      'LLM Developer',
      'Python Developer',
      'Deep Learning Engineer'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        typingText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(type, 1000);
  }
  
  // Animate stats on scroll
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = parseInt(target.textContent);
          let currentValue = 0;
          const increment = finalValue / 50;
          
          const updateCounter = () => {
            currentValue += increment;
            if (currentValue < finalValue) {
              target.textContent = Math.ceil(currentValue) + '+';
              requestAnimationFrame(updateCounter);
            } else {
              target.textContent = finalValue + '+';
            }
          };
          
          updateCounter();
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
  };
  
  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateStats);
  } else {
    animateStats();
  }
  
})();
