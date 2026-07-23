const { chromium } = require('playwright');
const jwt = require('jsonwebtoken');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Generate token
  const token = jwt.sign({ username: "admin", role: "admin" }, "super_secret_jwt_key_change_me", { expiresIn: "1d" });

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log("Navigating to admin page...");
  await page.goto('https://kunalconnects.com/admin');
  
  console.log("Setting localStorage admin_token...");
  await page.evaluate((t) => {
    localStorage.setItem('admin_token', t);
  }, token);

  console.log("Reloading...");
  await page.reload({ waitUntil: 'networkidle' });
  
  console.log("Checking page content...");
  
  try {
    // wait for either client cards or empty state
    await page.waitForFunction(() => {
      return document.querySelector('h3') || document.body.innerText.includes("No registered workspaces");
    }, { timeout: 10000 });
  } catch (e) {
    console.log("Timeout waiting for content to load");
  }

  const text = await page.evaluate(() => document.body.innerText);
  
  if (text.includes("No registered workspaces found.")) {
    console.log("❌ FAILURE: Page says 'No registered workspaces found.'");
  } else if (text.includes("Active Workspace Services Suite") || text.includes("Services") || text.includes("Paid")) {
    console.log("✅ SUCCESS: Client data is visible on the page!");
    
    // Let's count how many client cards are there
    const count = await page.evaluate(() => {
      // Find elements that look like client cards. They have h3 titles with client names.
      return document.querySelectorAll('h3').length; 
    });
    console.log(`Found roughly ${count} client headers/cards!`);
  } else {
    console.log("⚠️ UNKNOWN STATE: Could not find client data or empty state message.");
    console.log(text.substring(0, 500));
  }

  await browser.close();
})();
