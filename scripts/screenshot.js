const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Configure these pages relative to d:\Templates root served at http://localhost:8000
// The script will auto-detect which of these local index.html files exist and only capture those.
const templates = [
  { key: 'architect', relPath: 'Architect website/index.html', out: 'assets/architect.png' },
  { key: 'coffee', relPath: 'Coffee/index.html', out: 'assets/coffee.png' },
  { key: 'digitalhub', relPath: 'Digitalhub Solutions/index.html', out: 'assets/digitalhub.png' },
  { key: 'salon', relPath: 'hair-salon-html-template/hair-salon-html-template/index.html', out: 'assets/salon.png' },
  { key: 'tea', relPath: 'tea-shop-website-template/tea-shop-website-template/index.html', out: 'assets/tea.png' },
  { key: 'studio', relPath: 'photo-studio-website-template/photo-studio-website-template/index.html', out: 'assets/studio.png' }
];

const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

// Build pages list by checking filesystem for each relative path from Templates root.
const pages = [];
for (const t of templates) {
  // From this script folder, go up two levels to reach the Templates root
  const fileOnDisk = path.join(__dirname, '..', '..', t.relPath.replace(/\//g, path.sep));
  if (fs.existsSync(fileOnDisk)) {
    const encodedPath = encodeURI(t.relPath).replace(/#/g, '%23');
    pages.push({ name: t.key, url: `${baseUrl}/${encodedPath}`, out: t.out });
  } else {
    console.warn(`Skipping ${t.key}: not found at ${fileOnDisk}`);
  }
}

if (pages.length === 0) {
  console.error('No project pages found. Ensure you started a static server from d:\\Templates and that project folders contain an index.html.');
  process.exit(1);
}

(async () => {
  if (!fs.existsSync(path.join(__dirname, '..', 'assets'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'assets'));
  }

  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try {
    for (const pageDef of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 700 });
      console.log('Capturing', pageDef.url);
      try {
        const response = await page.goto(pageDef.url, { waitUntil: 'networkidle2', timeout: 20000 });
        if (!response || !response.ok()) {
          console.warn(`Warning: unable to load ${pageDef.url} (status: ${response && response.status()})`);
        }
      } catch (err) {
        console.warn(`Failed to navigate to ${pageDef.url}:`, err.message);
      }

      // Optionally hide elements you don't want in thumbnails
      await page.evaluate(() => {
        const el = document.querySelector('.preloader, #preloader');
        if (el) el.style.display = 'none';
      });

      const outPath = path.join(__dirname, '..', pageDef.out);
      await page.screenshot({ path: outPath, fullPage: false });
      console.log('Saved', outPath);
      await page.close();
    }
  } finally {
    await browser.close();
  }
})();
