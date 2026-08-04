const puppeteer = require('puppeteer-core');
const path = require('path');

async function captureScreenshots() {
  const browser = await puppeteer.launch({ 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  
  const baseUrl = 'http://localhost:3000';
  const outDir = path.join(__dirname, '..', 'screenshots');

  const navigateAndWait = async (url) => {
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
  };

  try {
    // 1. Dashboard Desktop
    await page.setViewport({ width: 1440, height: 900 });
    await navigateAndWait(baseUrl);
    await page.screenshot({ path: path.join(outDir, '1_dashboard.png'), fullPage: true });
    console.log('Saved: 1_dashboard.png');

    // 2. Kanban Desktop
    await navigateAndWait(`${baseUrl}/kanban`);
    await page.screenshot({ path: path.join(outDir, '2_kanban.png'), fullPage: true });
    console.log('Saved: 2_kanban.png');

    // 3. Analytics Desktop
    await navigateAndWait(`${baseUrl}/analytics`);
    await page.screenshot({ path: path.join(outDir, '3_analytics.png'), fullPage: true });
    console.log('Saved: 3_analytics.png');

    // 4. Settings Desktop
    await navigateAndWait(`${baseUrl}/settings`);
    await page.screenshot({ path: path.join(outDir, '4_settings.png'), fullPage: true });
    console.log('Saved: 4_settings.png');

    // 5. Mobile Version (Dashboard)
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await navigateAndWait(baseUrl);
    await page.screenshot({ path: path.join(outDir, '5_mobile_dashboard.png'), fullPage: true });
    console.log('Saved: 5_mobile_dashboard.png');

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
