// Automated Verification of the 20-Fix Launch Checklist (from @design_with_vinod)
const http = require('http');

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

async function testFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  let body = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    body = await res.json().catch(() => null);
  } else {
    body = await res.text().catch(() => null);
  }
  return { status: res.status, headers: res.headers, body };
}

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 SK SOFTECH - 20 FIXES PRE-LAUNCH VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let total = 0;

  function assert(title, condition, extra = '') {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${title}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${title} - ${extra}`);
    }
  }

  // F02: Auth on every private route
  const adminTest = await testFetch('/api/admin/content');
  assert('F02: Unauthorized access to /api/admin/content is blocked', adminTest.status === 401);

  // F07: Security headers present
  const headerTest = await testFetch('/');
  assert(
    'F07: Security headers (nosniff, SAMEORIGIN) present',
    headerTest.headers.get('x-content-type-options') === 'nosniff' &&
    headerTest.headers.get('x-frame-options') === 'SAMEORIGIN'
  );

  // F09: Zod validation on contact form (rejects empty/bad payload)
  const contactBad = await testFetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'not-an-email', message: '' }),
  });
  assert('F09: Zod validation rejects invalid contact form with 400', contactBad.status === 400);

  // F04: HTML tags stripped from input
  const contactClean = await testFetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '<b>Tester</b>',
      email: 'tester@sksoftech.in',
      message: 'Hello <script>alert(1)</script> world from automated test',
    }),
  });
  assert(
    'F04: XSS tags sanitized and inquiry saved safely',
    contactClean.status === 200 && contactClean.body?.inquiry?.name === 'Tester'
  );

  // F15: Health Check endpoint
  const healthTest = await testFetch('/api/health');
  assert(
    'F15: Health check /api/health returns 200 and PostgreSQL healthy',
    healthTest.status === 200 && healthTest.body?.database === 'connected'
  );

  // SEO: Sitemap.xml
  const sitemapTest = await testFetch('/sitemap.xml');
  assert('SEO: Dynamic XML Sitemap /sitemap.xml generates successfully', sitemapTest.status === 200);

  // SEO: Robots.txt
  const robotsTest = await testFetch('/robots.txt');
  assert(
    'SEO: robots.txt protects /admin while allowing search engines',
    robotsTest.status === 200 && robotsTest.body?.includes('Disallow: /admin/')
  );

  console.log('\n----------------------------------------------------');
  console.log(`Results: ${passed} / ${total} tests passed!`);
  console.log('----------------------------------------------------');
}

runAudit().catch(console.error);
