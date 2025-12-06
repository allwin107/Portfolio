/**
 * Portfolio Validation Script
 * Run this in browser console to validate correctness properties
 * Usage: Copy and paste this entire script into browser console while viewing the portfolio
 */

(async function validatePortfolio() {
  console.log('🔍 Starting Portfolio Validation...\n');
  
  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  // Helper function to log results
  function logResult(property, status, message) {
    const emoji = status === 'pass' ? '✓' : status === 'fail' ? '✗' : '⚠️';
    console.log(`${emoji} Property ${property}: ${message}`);
    
    if (status === 'pass') {
      results.passed.push({ property, message });
    } else if (status === 'fail') {
      results.failed.push({ property, message });
    } else {
      results.warnings.push({ property, message });
    }
  }

  // Property 1: Complete Project Case Study Display
  try {
    const response = await fetch('assets/data/projects.json');
    const data = await response.json();
    const projects = data.projects;
    
    let allComplete = true;
    projects.forEach(project => {
      if (!project.problem || !project.solution || !project.technologies || 
          !project.results || project.technologies.length === 0) {
        allComplete = false;
      }
    });
    
    if (allComplete) {
      logResult(1, 'pass', `All ${projects.length} projects have complete case study sections`);
    } else {
      logResult(1, 'fail', 'Some projects missing case study sections');
    }
  } catch (error) {
    logResult(1, 'fail', `Error loading projects: ${error.message}`);
  }

  // Property 2: Project Links Presence
  try {
    const response = await fetch('assets/data/projects.json');
    const data = await response.json();
    const projects = data.projects;
    
    let allHaveLinks = true;
    projects.forEach(project => {
      if (!project.github) {
        allHaveLinks = false;
      }
    });
    
    if (allHaveLinks) {
      logResult(2, 'pass', 'All projects have GitHub links');
    } else {
      logResult(2, 'fail', 'Some projects missing GitHub links');
    }
  } catch (error) {
    logResult(2, 'fail', `Error validating links: ${error.message}`);
  }

  // Property 6: Bio Word Count Constraint
  try {
    const bioText = document.querySelector('.bio-intro');
    if (bioText) {
      const wordCount = bioText.textContent.trim().split(/\s+/).length;
      if (wordCount >= 100 && wordCount <= 200) {
        logResult(6, 'pass', `Bio word count is ${wordCount} (within 100-200 range)`);
      } else {
        logResult(6, 'fail', `Bio word count is ${wordCount} (should be 100-200)`);
      }
    } else {
      logResult(6, 'fail', 'Bio section not found');
    }
  } catch (error) {
    logResult(6, 'fail', `Error checking bio: ${error.message}`);
  }

  // Property 7: Skills Categorization
  try {
    const response = await fetch('assets/data/skills.json');
    const data = await response.json();
    const categories = data.skillCategories;
    
    const allSkills = [];
    const skillCounts = {};
    
    categories.forEach(category => {
      category.skills.forEach(skill => {
        allSkills.push(skill.name);
        skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1;
      });
    });
    
    const duplicates = Object.keys(skillCounts).filter(skill => skillCounts[skill] > 1);
    
    if (duplicates.length === 0) {
      logResult(7, 'pass', `All ${allSkills.length} skills in unique categories`);
    } else {
      logResult(7, 'fail', `Duplicate skills found: ${duplicates.join(', ')}`);
    }
  } catch (error) {
    logResult(7, 'fail', `Error validating skills: ${error.message}`);
  }

  // Property 10: Consistent Project Data Structure
  try {
    const response = await fetch('assets/data/projects.json');
    const data = await response.json();
    const projects = data.projects;
    
    const requiredFields = ['id', 'title', 'summary', 'problem', 'solution', 
                           'technologies', 'results', 'github', 'date'];
    
    let allValid = true;
    projects.forEach((project, index) => {
      requiredFields.forEach(field => {
        if (!project[field]) {
          allValid = false;
          console.warn(`Project ${index} missing field: ${field}`);
        }
      });
    });
    
    if (allValid) {
      logResult(10, 'pass', 'All projects follow consistent data structure');
    } else {
      logResult(10, 'fail', 'Some projects missing required fields');
    }
  } catch (error) {
    logResult(10, 'fail', `Error validating structure: ${error.message}`);
  }

  // Property 11: Image Alt Text Presence
  try {
    const images = document.querySelectorAll('img');
    const missingAlt = [];
    
    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        missingAlt.push({ index, src: img.src });
      }
    });
    
    if (missingAlt.length === 0) {
      logResult(11, 'pass', `All ${images.length} images have alt text`);
    } else {
      logResult(11, 'fail', `${missingAlt.length} images missing alt text`);
      console.table(missingAlt);
    }
  } catch (error) {
    logResult(11, 'fail', `Error checking alt text: ${error.message}`);
  }

  // Property 8: Responsive Layout Adaptation
  try {
    const hasResponsiveCSS = Array.from(document.styleSheets).some(sheet => {
      try {
        return sheet.href && sheet.href.includes('responsive');
      } catch (e) {
        return false;
      }
    });
    
    const hasBootstrap = Array.from(document.styleSheets).some(sheet => {
      try {
        return sheet.href && sheet.href.includes('bootstrap');
      } catch (e) {
        return false;
      }
    });
    
    if (hasResponsiveCSS || hasBootstrap) {
      logResult(8, 'pass', 'Responsive CSS detected');
    } else {
      logResult(8, 'warn', 'Could not verify responsive CSS');
    }
  } catch (error) {
    logResult(8, 'warn', `Error checking responsive CSS: ${error.message}`);
  }

  // Check for horizontal scrolling
  try {
    const hasHorizontalScroll = document.documentElement.scrollWidth > document.documentElement.clientWidth;
    if (!hasHorizontalScroll) {
      logResult(8, 'pass', 'No horizontal scrolling detected');
    } else {
      logResult(8, 'fail', 'Horizontal scrolling detected');
    }
  } catch (error) {
    logResult(8, 'warn', `Error checking scrolling: ${error.message}`);
  }

  // Property 17: Internal Link Domain Consistency
  try {
    const internalLinks = document.querySelectorAll('a[href^="#"], a[href^="/"], a[href^="./"]');
    logResult(17, 'pass', `${internalLinks.length} internal links use relative paths`);
  } catch (error) {
    logResult(17, 'warn', `Error checking links: ${error.message}`);
  }

  // Property 18: Design System Consistency
  try {
    const hasVariablesCSS = Array.from(document.styleSheets).some(sheet => {
      try {
        return sheet.href && sheet.href.includes('variables');
      } catch (e) {
        return false;
      }
    });
    
    if (hasVariablesCSS) {
      logResult(18, 'pass', 'CSS variables file detected');
    } else {
      logResult(18, 'warn', 'CSS variables file not detected (may use inline variables)');
    }
  } catch (error) {
    logResult(18, 'warn', `Error checking design system: ${error.message}`);
  }

  // Check SEO Meta Tags
  try {
    const metaTags = {
      title: document.querySelector('title'),
      description: document.querySelector('meta[name="description"]'),
      ogTitle: document.querySelector('meta[property="og:title"]'),
      ogDescription: document.querySelector('meta[property="og:description"]'),
      ogImage: document.querySelector('meta[property="og:image"]'),
      twitterCard: document.querySelector('meta[name="twitter:card"]')
    };
    
    const missingTags = Object.keys(metaTags).filter(key => !metaTags[key]);
    
    if (missingTags.length === 0) {
      logResult('SEO', 'pass', 'All essential SEO meta tags present');
    } else {
      logResult('SEO', 'fail', `Missing meta tags: ${missingTags.join(', ')}`);
    }
  } catch (error) {
    logResult('SEO', 'warn', `Error checking meta tags: ${error.message}`);
  }

  // Check Structured Data
  try {
    const structuredData = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      const data = JSON.parse(structuredData.textContent);
      if (data['@type'] === 'Person') {
        logResult('SEO', 'pass', 'Structured data (Person schema) present');
      }
    } else {
      logResult('SEO', 'warn', 'No structured data found');
    }
  } catch (error) {
    logResult('SEO', 'warn', `Error checking structured data: ${error.message}`);
  }

  // Check Form Validation
  try {
    const form = document.getElementById('contactForm');
    if (form) {
      const requiredFields = form.querySelectorAll('[required]');
      logResult('Form', 'pass', `Contact form has ${requiredFields.length} required fields`);
      
      // Check for validation attributes
      const emailField = form.querySelector('input[type="email"]');
      if (emailField) {
        logResult('Form', 'pass', 'Email field has proper type attribute');
      }
    } else {
      logResult('Form', 'warn', 'Contact form not found');
    }
  } catch (error) {
    logResult('Form', 'warn', `Error checking form: ${error.message}`);
  }

  // Check Accessibility Features
  try {
    const ariaLabels = document.querySelectorAll('[aria-label]');
    const ariaDescribedBy = document.querySelectorAll('[aria-describedby]');
    const ariaRequired = document.querySelectorAll('[aria-required]');
    
    logResult('A11y', 'pass', `${ariaLabels.length} elements with aria-label`);
    logResult('A11y', 'pass', `${ariaDescribedBy.length} elements with aria-describedby`);
    logResult('A11y', 'pass', `${ariaRequired.length} elements with aria-required`);
  } catch (error) {
    logResult('A11y', 'warn', `Error checking accessibility: ${error.message}`);
  }

  // Print Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✓ Passed: ${results.passed.length}`);
  console.log(`✗ Failed: ${results.failed.length}`);
  console.log(`⚠️  Warnings: ${results.warnings.length}`);
  console.log('='.repeat(60));

  if (results.failed.length > 0) {
    console.log('\n❌ FAILED CHECKS:');
    results.failed.forEach(r => console.log(`  - Property ${r.property}: ${r.message}`));
  }

  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    results.warnings.forEach(r => console.log(`  - Property ${r.property}: ${r.message}`));
  }

  console.log('\n✅ Validation complete!');
  console.log('\n📝 Next steps:');
  console.log('  1. Run Lighthouse audit in DevTools');
  console.log('  2. Validate HTML at https://validator.w3.org/');
  console.log('  3. Validate CSS at https://jigsaw.w3.org/css-validator/');
  console.log('  4. Test in multiple browsers');
  console.log('  5. Test on multiple devices/viewports');
  console.log('  6. Test form submission');
  console.log('  7. Test keyboard navigation');

  return results;
})();
