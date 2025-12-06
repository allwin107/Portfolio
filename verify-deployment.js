/**
 * Post-Deployment Verification Script
 * 
 * This script performs automated checks on the deployed portfolio site.
 * Run with: node verify-deployment.js <your-site-url>
 * 
 * Example: node verify-deployment.js https://your-portfolio.netlify.app
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// Test results storage
const results = {
  passed: [],
  failed: [],
  warnings: []
};

/**
 * Make HTTP/HTTPS request
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
      timeout: options.timeout || 10000
    };

    const req = protocol.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Print test result
 */
function printResult(passed, message, details = '') {
  const symbol = passed ? '✓' : '✗';
  const color = passed ? colors.green : colors.red;
  console.log(`${color}${symbol}${colors.reset} ${message}`);
  if (details) {
    console.log(`  ${colors.cyan}${details}${colors.reset}`);
  }
  
  if (passed) {
    results.passed.push(message);
  } else {
    results.failed.push(message);
  }
}

/**
 * Print warning
 */
function printWarning(message, details = '') {
  console.log(`${colors.yellow}⚠${colors.reset} ${message}`);
  if (details) {
    console.log(`  ${colors.cyan}${details}${colors.reset}`);
  }
  results.warnings.push(message);
}

/**
 * Print section header
 */
function printSection(title) {
  console.log(`\n${colors.bold}${colors.blue}━━━ ${title} ━━━${colors.reset}\n`);
}

/**
 * Test 1: Site Accessibility
 */
async function testSiteAccessibility(siteUrl) {
  printSection('1. Site Accessibility');
  
  try {
    const startTime = Date.now();
    const response = await makeRequest(siteUrl);
    const loadTime = Date.now() - startTime;
    
    // Check status code
    const statusOk = response.statusCode === 200;
    printResult(statusOk, 'Site returns 200 OK', `Status: ${response.statusCode}`);
    
    // Check load time
    const loadTimeOk = loadTime < 3000;
    printResult(loadTimeOk, 'Page loads within 3 seconds', `Load time: ${loadTime}ms`);
    
    // Check HTTPS
    const isHttps = siteUrl.startsWith('https://');
    printResult(isHttps, 'Site uses HTTPS', `Protocol: ${isHttps ? 'HTTPS' : 'HTTP'}`);
    
    // Check content type
    const contentType = response.headers['content-type'] || '';
    const isHtml = contentType.includes('text/html');
    printResult(isHtml, 'Content-Type is HTML', `Content-Type: ${contentType}`);
    
    return response;
  } catch (error) {
    printResult(false, 'Site is accessible', `Error: ${error.message}`);
    throw error;
  }
}

/**
 * Test 2: Security Headers
 */
async function testSecurityHeaders(siteUrl) {
  printSection('2. Security Headers');
  
  try {
    const response = await makeRequest(siteUrl);
    const headers = response.headers;
    
    // Check for security headers
    const securityHeaders = {
      'x-frame-options': 'X-Frame-Options',
      'x-content-type-options': 'X-Content-Type-Options',
      'x-xss-protection': 'X-XSS-Protection',
      'content-security-policy': 'Content-Security-Policy',
      'strict-transport-security': 'Strict-Transport-Security'
    };
    
    for (const [headerKey, headerName] of Object.entries(securityHeaders)) {
      const hasHeader = !!headers[headerKey];
      if (hasHeader) {
        printResult(true, `${headerName} header present`, `Value: ${headers[headerKey]}`);
      } else {
        printWarning(`${headerName} header missing`, 'Consider adding for better security');
      }
    }
  } catch (error) {
    printResult(false, 'Security headers check', `Error: ${error.message}`);
  }
}

/**
 * Test 3: Essential Resources
 */
async function testEssentialResources(siteUrl) {
  printSection('3. Essential Resources');
  
  const resources = [
    '/assets/css/main.css',
    '/assets/css/style.css',
    '/assets/js/main.js',
    '/assets/data/projects.json',
    '/assets/data/skills.json',
    '/assets/data/config.json',
    '/assets/img/profile-img.jpg',
    '/assets/resume.pdf'
  ];
  
  for (const resource of resources) {
    try {
      const url = new URL(resource, siteUrl).toString();
      const response = await makeRequest(url);
      const isOk = response.statusCode === 200;
      printResult(isOk, `Resource loads: ${resource}`, `Status: ${response.statusCode}`);
    } catch (error) {
      printResult(false, `Resource loads: ${resource}`, `Error: ${error.message}`);
    }
  }
}

/**
 * Test 4: JSON Data Validation
 */
async function testJsonData(siteUrl) {
  printSection('4. JSON Data Validation');
  
  const jsonFiles = [
    { path: '/assets/data/projects.json', name: 'Projects' },
    { path: '/assets/data/skills.json', name: 'Skills' },
    { path: '/assets/data/config.json', name: 'Config' }
  ];
  
  for (const file of jsonFiles) {
    try {
      const url = new URL(file.path, siteUrl).toString();
      const response = await makeRequest(url);
      
      if (response.statusCode === 200) {
        try {
          const data = JSON.parse(response.body);
          printResult(true, `${file.name} JSON is valid`, `Keys: ${Object.keys(data).join(', ')}`);
          
          // Additional validation for projects
          if (file.name === 'Projects' && data.projects) {
            const projectCount = data.projects.length;
            printResult(projectCount > 0, `${file.name} contains data`, `${projectCount} projects found`);
            
            // Check required fields
            const requiredFields = ['id', 'title', 'summary', 'problem', 'solution', 'technologies', 'results', 'github'];
            const firstProject = data.projects[0];
            const hasAllFields = requiredFields.every(field => field in firstProject);
            printResult(hasAllFields, `Projects have required fields`, `Checked: ${requiredFields.join(', ')}`);
          }
          
          // Additional validation for skills
          if (file.name === 'Skills' && data.skillCategories) {
            const categoryCount = data.skillCategories.length;
            printResult(categoryCount > 0, `${file.name} contains data`, `${categoryCount} categories found`);
          }
        } catch (parseError) {
          printResult(false, `${file.name} JSON is valid`, `Parse error: ${parseError.message}`);
        }
      } else {
        printResult(false, `${file.name} JSON loads`, `Status: ${response.statusCode}`);
      }
    } catch (error) {
      printResult(false, `${file.name} JSON loads`, `Error: ${error.message}`);
    }
  }
}

/**
 * Test 5: HTML Content Validation
 */
async function testHtmlContent(siteUrl) {
  printSection('5. HTML Content Validation');
  
  try {
    const response = await makeRequest(siteUrl);
    const html = response.body;
    
    // Check for essential sections
    const sections = [
      { id: 'hero', name: 'Hero Section' },
      { id: 'about', name: 'About Section' },
      { id: 'skills', name: 'Skills Section' },
      { id: 'portfolio', name: 'Portfolio Section' },
      { id: 'contact', name: 'Contact Section' }
    ];
    
    for (const section of sections) {
      const hasSection = html.includes(`id="${section.id}"`) || html.includes(`id='${section.id}'`);
      printResult(hasSection, `${section.name} present`, `ID: ${section.id}`);
    }
    
    // Check for meta tags
    const metaTags = [
      { pattern: /<title>.*<\/title>/, name: 'Title tag' },
      { pattern: /<meta\s+name=["']description["']/, name: 'Meta description' },
      { pattern: /<meta\s+name=["']viewport["']/, name: 'Viewport meta tag' },
      { pattern: /<meta\s+property=["']og:title["']/, name: 'Open Graph title' },
      { pattern: /<meta\s+property=["']og:description["']/, name: 'Open Graph description' },
      { pattern: /<meta\s+property=["']og:image["']/, name: 'Open Graph image' }
    ];
    
    for (const tag of metaTags) {
      const hasTag = tag.pattern.test(html);
      printResult(hasTag, `${tag.name} present`);
    }
    
    // Check for images with alt text
    const imgTags = html.match(/<img[^>]*>/g) || [];
    const imgsWithoutAlt = imgTags.filter(img => !img.includes('alt=')).length;
    printResult(imgsWithoutAlt === 0, 'All images have alt text', 
      `Total images: ${imgTags.length}, Without alt: ${imgsWithoutAlt}`);
    
  } catch (error) {
    printResult(false, 'HTML content validation', `Error: ${error.message}`);
  }
}

/**
 * Test 6: 404 Page
 */
async function test404Page(siteUrl) {
  printSection('6. 404 Page');
  
  try {
    const url = new URL('/this-page-does-not-exist-12345', siteUrl).toString();
    const response = await makeRequest(url);
    
    // Check if 404 page exists
    const is404 = response.statusCode === 404;
    printResult(is404, '404 page returns correct status', `Status: ${response.statusCode}`);
    
    // Check if custom 404 page has content
    if (response.body.length > 0) {
      printResult(true, 'Custom 404 page has content', `Length: ${response.body.length} bytes`);
    } else {
      printWarning('404 page appears empty');
    }
  } catch (error) {
    printResult(false, '404 page check', `Error: ${error.message}`);
  }
}

/**
 * Test 7: Redirects
 */
async function testRedirects(siteUrl) {
  printSection('7. Redirects');
  
  // Test HTTP to HTTPS redirect (if site uses HTTPS)
  if (siteUrl.startsWith('https://')) {
    try {
      const httpUrl = siteUrl.replace('https://', 'http://');
      const response = await makeRequest(httpUrl);
      
      const redirectsToHttps = response.statusCode >= 300 && response.statusCode < 400;
      if (redirectsToHttps) {
        printResult(true, 'HTTP redirects to HTTPS', `Status: ${response.statusCode}`);
      } else {
        printWarning('HTTP does not redirect to HTTPS', 'Consider enforcing HTTPS');
      }
    } catch (error) {
      printWarning('Could not test HTTP to HTTPS redirect', error.message);
    }
  }
}

/**
 * Print summary
 */
function printSummary() {
  printSection('Verification Summary');
  
  const total = results.passed.length + results.failed.length;
  const passRate = total > 0 ? ((results.passed.length / total) * 100).toFixed(1) : 0;
  
  console.log(`${colors.bold}Total Tests:${colors.reset} ${total}`);
  console.log(`${colors.green}${colors.bold}Passed:${colors.reset} ${results.passed.length}`);
  console.log(`${colors.red}${colors.bold}Failed:${colors.reset} ${results.failed.length}`);
  console.log(`${colors.yellow}${colors.bold}Warnings:${colors.reset} ${results.warnings.length}`);
  console.log(`${colors.bold}Pass Rate:${colors.reset} ${passRate}%\n`);
  
  if (results.failed.length > 0) {
    console.log(`${colors.red}${colors.bold}Failed Tests:${colors.reset}`);
    results.failed.forEach((test, index) => {
      console.log(`  ${index + 1}. ${test}`);
    });
    console.log();
  }
  
  if (results.warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}Warnings:${colors.reset}`);
    results.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning}`);
    });
    console.log();
  }
  
  // Overall status
  if (results.failed.length === 0) {
    console.log(`${colors.green}${colors.bold}✓ All tests passed!${colors.reset}`);
    console.log(`${colors.green}Your portfolio is ready for production.${colors.reset}\n`);
  } else {
    console.log(`${colors.red}${colors.bold}✗ Some tests failed.${colors.reset}`);
    console.log(`${colors.red}Please review and fix the issues above.${colors.reset}\n`);
  }
}

/**
 * Main function
 */
async function main() {
  const siteUrl = process.argv[2];
  
  if (!siteUrl) {
    console.error(`${colors.red}Error: Please provide a site URL${colors.reset}`);
    console.log(`Usage: node verify-deployment.js <site-url>`);
    console.log(`Example: node verify-deployment.js https://your-portfolio.netlify.app`);
    process.exit(1);
  }
  
  // Validate URL
  try {
    new URL(siteUrl);
  } catch (error) {
    console.error(`${colors.red}Error: Invalid URL format${colors.reset}`);
    console.log(`Please provide a valid URL starting with http:// or https://`);
    process.exit(1);
  }
  
  console.log(`${colors.bold}${colors.cyan}Portfolio Post-Deployment Verification${colors.reset}`);
  console.log(`${colors.cyan}Testing: ${siteUrl}${colors.reset}`);
  console.log(`${colors.cyan}Started: ${new Date().toLocaleString()}${colors.reset}`);
  
  try {
    await testSiteAccessibility(siteUrl);
    await testSecurityHeaders(siteUrl);
    await testEssentialResources(siteUrl);
    await testJsonData(siteUrl);
    await testHtmlContent(siteUrl);
    await test404Page(siteUrl);
    await testRedirects(siteUrl);
    
    printSummary();
    
    // Exit with appropriate code
    process.exit(results.failed.length > 0 ? 1 : 0);
  } catch (error) {
    console.error(`\n${colors.red}${colors.bold}Fatal Error:${colors.reset} ${error.message}`);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { makeRequest, testSiteAccessibility, testSecurityHeaders };
