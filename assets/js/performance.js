/**
 * Performance Optimization Module
 * Handles lazy loading, loading indicators, and performance monitoring
 */

(function() {
  'use strict';

  /**
   * Enhanced Lazy Loading with Intersection Observer
   * Optimized for below-fold images and videos
   */
  function initEnhancedLazyLoading() {
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            
            // Handle images
            if (element.tagName === 'IMG') {
              // Load data-src if present
              if (element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
              }
              
              // Load srcset if present
              if (element.dataset.srcset) {
                element.srcset = element.dataset.srcset;
                element.removeAttribute('data-srcset');
              }
              
              // Add loaded class for fade-in effect
              element.classList.add('lazy-loaded');
              
              // Remove loading attribute after load
              element.addEventListener('load', function() {
                element.removeAttribute('loading');
              });
            }
            
            // Handle videos
            if (element.tagName === 'VIDEO') {
              if (element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
              }
              
              // Load video sources
              const sources = element.querySelectorAll('source[data-src]');
              sources.forEach(source => {
                source.src = source.dataset.src;
                source.removeAttribute('data-src');
              });
              
              element.load();
              element.classList.add('lazy-loaded');
            }
            
            // Handle iframes (for embedded content)
            if (element.tagName === 'IFRAME') {
              if (element.dataset.src) {
                element.src = element.dataset.src;
                element.removeAttribute('data-src');
              }
              element.classList.add('lazy-loaded');
            }
            
            // Stop observing this element
            observer.unobserve(element);
          }
        });
      }, {
        rootMargin: '50px 0px', // Start loading 50px before element enters viewport
        threshold: 0.01
      });
      
      // Observe all lazy-loadable elements
      const lazyImages = document.querySelectorAll('img[loading="lazy"], img[data-src]');
      const lazyVideos = document.querySelectorAll('video[preload="metadata"], video[data-src]');
      const lazyIframes = document.querySelectorAll('iframe[data-src]');
      
      lazyImages.forEach(img => imageObserver.observe(img));
      lazyVideos.forEach(video => imageObserver.observe(video));
      lazyIframes.forEach(iframe => imageObserver.observe(iframe));
      
      console.log(`Lazy loading initialized: ${lazyImages.length} images, ${lazyVideos.length} videos, ${lazyIframes.length} iframes`);
    } else {
      // Fallback for browsers without IntersectionObserver
      console.warn('IntersectionObserver not supported, loading all images immediately');
      loadAllImagesImmediately();
    }
  }

  /**
   * Fallback: Load all images immediately for unsupported browsers
   */
  function loadAllImagesImmediately() {
    const lazyElements = document.querySelectorAll('[data-src]');
    lazyElements.forEach(element => {
      if (element.dataset.src) {
        if (element.tagName === 'IMG' || element.tagName === 'IFRAME') {
          element.src = element.dataset.src;
        } else if (element.tagName === 'VIDEO') {
          element.src = element.dataset.src;
          element.load();
        }
        element.removeAttribute('data-src');
        element.classList.add('lazy-loaded');
      }
    });
  }

  /**
   * Loading Indicator for Slow Connections
   * Shows a loading spinner when page is loading slowly
   */
  function initLoadingIndicator() {
    // Check if page is still loading after 1 second
    const loadingTimeout = setTimeout(() => {
      if (document.readyState !== 'complete') {
        showLoadingIndicator();
      }
    }, 1000);

    // Hide loading indicator when page is fully loaded
    window.addEventListener('load', () => {
      clearTimeout(loadingTimeout);
      hideLoadingIndicator();
    });

    // Also check for slow network
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection && connection.effectiveType) {
        // Show indicator for slow connections (2g, slow-2g)
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
          showSlowConnectionWarning();
        }
      }
    }
  }

  /**
   * Show loading indicator
   */
  function showLoadingIndicator() {
    let indicator = document.getElementById('page-loading-indicator');
    
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'page-loading-indicator';
      indicator.innerHTML = `
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading...</p>
        </div>
      `;
      document.body.appendChild(indicator);
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        #page-loading-indicator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          animation: fadeIn 0.3s ease;
        }
        
        .loading-spinner {
          text-align: center;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          margin: 0 auto 20px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #149ddd;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .loading-spinner p {
          color: #333;
          font-size: 16px;
          font-weight: 500;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    indicator.style.display = 'flex';
  }

  /**
   * Hide loading indicator
   */
  function hideLoadingIndicator() {
    const indicator = document.getElementById('page-loading-indicator');
    if (indicator) {
      indicator.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        indicator.style.display = 'none';
      }, 300);
    }
  }

  /**
   * Show slow connection warning
   */
  function showSlowConnectionWarning() {
    const warning = document.createElement('div');
    warning.id = 'slow-connection-warning';
    warning.innerHTML = `
      <div class="warning-content">
        <i class="bi bi-wifi-off"></i>
        <p>Slow connection detected. Content may take longer to load.</p>
        <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      #slow-connection-warning {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 8px;
        padding: 15px 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
      }
      
      .warning-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        text-align: center;
      }
      
      .warning-content i {
        font-size: 24px;
        color: #856404;
      }
      
      .warning-content p {
        margin: 0;
        color: #856404;
        font-size: 14px;
      }
      
      .warning-content button {
        background: #ffc107;
        border: none;
        padding: 6px 16px;
        border-radius: 4px;
        color: #856404;
        font-weight: 600;
        cursor: pointer;
        font-size: 13px;
      }
      
      .warning-content button:hover {
        background: #e0a800;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(warning);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
      if (warning.parentElement) {
        warning.remove();
      }
    }, 10000);
  }

  /**
   * Performance Monitoring
   * Logs performance metrics to console
   */
  function monitorPerformance() {
    window.addEventListener('load', () => {
      // Wait a bit for all resources to finish
      setTimeout(() => {
        if ('performance' in window) {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const connectTime = perfData.responseEnd - perfData.requestStart;
          const renderTime = perfData.domComplete - perfData.domLoading;
          
          console.group('📊 Performance Metrics');
          console.log(`Page Load Time: ${(pageLoadTime / 1000).toFixed(2)}s`);
          console.log(`Server Response Time: ${(connectTime / 1000).toFixed(2)}s`);
          console.log(`DOM Render Time: ${(renderTime / 1000).toFixed(2)}s`);
          
          // Check if page load is within target (< 3 seconds)
          if (pageLoadTime > 3000) {
            console.warn(`⚠️ Page load time (${(pageLoadTime / 1000).toFixed(2)}s) exceeds target of 3 seconds`);
          } else {
            console.log(`✅ Page load time is within target (< 3 seconds)`);
          }
          
          // Log resource timing if available
          if (window.performance.getEntriesByType) {
            const resources = window.performance.getEntriesByType('resource');
            const images = resources.filter(r => r.initiatorType === 'img');
            const scripts = resources.filter(r => r.initiatorType === 'script');
            const styles = resources.filter(r => r.initiatorType === 'link' || r.initiatorType === 'css');
            
            console.log(`Resources Loaded: ${resources.length} total`);
            console.log(`  - Images: ${images.length}`);
            console.log(`  - Scripts: ${scripts.length}`);
            console.log(`  - Stylesheets: ${styles.length}`);
            
            // Find slowest resources
            const slowResources = resources
              .sort((a, b) => b.duration - a.duration)
              .slice(0, 5);
            
            if (slowResources.length > 0) {
              console.log('Slowest Resources:');
              slowResources.forEach((resource, index) => {
                console.log(`  ${index + 1}. ${resource.name.split('/').pop()} - ${resource.duration.toFixed(2)}ms`);
              });
            }
          }
          
          console.groupEnd();
        }
      }, 0);
    });
  }

  /**
   * Optimize Images - Add loading attributes if missing
   */
  function optimizeImages() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      // Add lazy loading to images below the fold
      const rect = img.getBoundingClientRect();
      const isAboveFold = rect.top < window.innerHeight;
      
      if (!isAboveFold) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /**
   * Preload critical resources
   */
  function preloadCriticalResources() {
    // Preload hero background image if it exists
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      const bgImage = window.getComputedStyle(heroSection).backgroundImage;
      if (bgImage && bgImage !== 'none') {
        const imageUrl = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
        if (imageUrl && imageUrl[1]) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = imageUrl[1];
          document.head.appendChild(link);
        }
      }
    }
  }

  /**
   * Initialize all performance optimizations
   */
  function init() {
    // Run optimizations when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initEnhancedLazyLoading();
        optimizeImages();
        preloadCriticalResources();
      });
    } else {
      initEnhancedLazyLoading();
      optimizeImages();
      preloadCriticalResources();
    }
    
    // Initialize loading indicator
    initLoadingIndicator();
    
    // Monitor performance (development only - remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      monitorPerformance();
    }
  }

  // Start initialization
  init();

})();
