/**
 * WordPress API Test Script
 * Run this to test if your WordPress REST API is accessible
 * 
 * Usage: 
 *   node test-wordpress-api.js
 *   OR
 *   WORDPRESS_URL=https://your-site.com node test-wordpress-api.js
 * 
 * Note: Requires Node.js 18+ (for fetch API)
 */

// Import fetch for older Node versions (if needed)
let fetch;
try {
  fetch = globalThis.fetch;
} catch (e) {
  console.error('Error: This script requires Node.js 18+ or install node-fetch');
  process.exit(1);
}

const WORDPRESS_URL = process.env.WORDPRESS_URL || process.argv[2] || 'https://theartfulexperience.com';

console.log('🔍 Testing WordPress REST API Access...\n');
console.log(`Testing URL: ${WORDPRESS_URL}\n`);

async function testEndpoint(name, url) {
  try {
    console.log(`Testing ${name}...`);
    const response = await fetch(url);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ ${name}: SUCCESS`);
      if (Array.isArray(data)) {
        console.log(`   Found ${data.length} items\n`);
      } else if (data.name) {
        console.log(`   Site: ${data.name}\n`);
      } else {
        console.log(`   Response received\n`);
      }
      return true;
    } else {
      console.log(`❌ ${name}: FAILED (Status: ${response.status})\n`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ERROR - ${error.message}\n`);
    return false;
  }
}

async function runTests() {
  const results = {
    restApi: false,
    posts: false,
    pages: false,
    media: false,
    products: false,
  };

  // Test 1: REST API Base
  results.restApi = await testEndpoint(
    'REST API Base',
    `${WORDPRESS_URL}/wp-json`
  );

  // Test 2: Posts
  if (results.restApi) {
    results.posts = await testEndpoint(
      'Blog Posts',
      `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`
    );
  }

  // Test 3: Pages
  if (results.restApi) {
    results.pages = await testEndpoint(
      'Pages',
      `${WORDPRESS_URL}/wp-json/wp/v2/pages?per_page=1`
    );
  }

  // Test 4: Media
  if (results.restApi) {
    results.media = await testEndpoint(
      'Media Library',
      `${WORDPRESS_URL}/wp-json/wp/v2/media?per_page=1`
    );
  }

  // Test 5: WooCommerce Products
  if (results.restApi) {
    results.products = await testEndpoint(
      'WooCommerce Products',
      `${WORDPRESS_URL}/wp-json/wc/store/v1/products?per_page=1`
    );
  }

  // Summary
  console.log('\n📊 Test Summary:');
  console.log('─'.repeat(40));
  console.log(`REST API Base:     ${results.restApi ? '✅' : '❌'}`);
  console.log(`Blog Posts:        ${results.posts ? '✅' : '❌'}`);
  console.log(`Pages:             ${results.pages ? '✅' : '❌'}`);
  console.log(`Media Library:     ${results.media ? '✅' : '❌'}`);
  console.log(`WooCommerce:       ${results.products ? '✅' : '❌'}`);
  console.log('─'.repeat(40));

  if (results.restApi) {
    console.log('\n✅ Your WordPress REST API is accessible!');
    console.log(`\n📝 Add this to Netlify environment variables:`);
    console.log(`   NEXT_PUBLIC_WORDPRESS_URL = ${WORDPRESS_URL}`);
    console.log(`   NEXT_PUBLIC_WOOCOMMERCE_URL = ${WORDPRESS_URL}`);
  } else {
    console.log('\n❌ WordPress REST API is not accessible.');
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if WordPress is installed and running');
    console.log('2. Verify the URL is correct');
    console.log('3. Check WordPress Settings → Permalinks (set to "Post name")');
    console.log('4. Disable security plugins temporarily to test');
  }
}

// Run tests
runTests().catch(console.error);

