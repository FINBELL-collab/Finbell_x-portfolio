Thumbnail generation and usage

This repository includes a small Puppeteer script to generate PNG thumbnails for your local project previews.

Quick steps

1. Serve the `d:\Templates` folder so local project pages are reachable at `http://localhost:8000/`:

```bash
cd "d:\Templates"
python -m http.server 8000
```

2. Install dependencies and run the screenshot script (from `Another portfolio`):

```bash
cd "d:\Templates\Another portfolio"
npm install
npm run screenshot
```

3. After the script finishes, thumbnails will be available in `assets/` as `architect.png`, `coffee.png`, `digitalhub.png`, `salon.png`, `tea.png`, `studio.png`.

4. The site (`index.html`) and the modal (`script.js`) already reference these files. Reload your portfolio page to see the generated thumbnails.

Customizing pages

- Edit `scripts/screenshot.js` to change the list of pages, output filenames, viewport size, or other options.
- If your project folder names differ, update the URLs inside `scripts/screenshot.js`.

Notes

- Puppeteer downloads a recent Chromium; the first `npm install` may take a moment.
- If you prefer not to install Puppeteer, you can manually capture screenshots and place them in `assets/` with the same filenames.
