/**
 * Scrape MP3 URLs from liatleshem.com/radio by clicking each play button
 * and intercepting network requests to music.wixstatic.com
 */
import puppeteer from 'puppeteer-core';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox'],
    defaultViewport: { width: 1280, height: 900 },
  });

  const page = await browser.newPage();

  // Collect all MP3 URLs from network requests
  const mp3Urls: { url: string; timestamp: number }[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('music.wixstatic.com') && url.includes('.mp3')) {
      mp3Urls.push({ url, timestamp: Date.now() });
      console.log(`[MP3] ${url}`);
    }
  });

  console.log('Navigating to radio page...');
  await page.goto('https://www.liatleshem.com/radio', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Scroll through the page to load all content
  console.log('Scrolling to load all content...');
  const scrollHeight = await page.evaluate('document.body.scrollHeight') as number;
  for (let y = 0; y < scrollHeight; y += 300) {
    await page.evaluate(`window.scrollTo(0, ${y})`);
    await new Promise((r) => setTimeout(r, 100));
  }
  await new Promise((r) => setTimeout(r, 3000));

  // Find all play buttons / clickable audio elements
  const playButtons = await page.evaluate(() => {
    const buttons: { selector: string; text: string; index: number }[] = [];

    // Look for Wix music player play buttons
    const allClickable = document.querySelectorAll(
      'button, [role="button"], [data-hook*="play"], [class*="play"], [aria-label*="play"], [aria-label*="Play"], svg'
    );

    let idx = 0;
    allClickable.forEach((el) => {
      const ariaLabel = el.getAttribute('aria-label') || '';
      const className = el.className?.toString() || '';
      const text = (el as HTMLElement).innerText?.substring(0, 50) || '';

      if (
        ariaLabel.toLowerCase().includes('play') ||
        className.toLowerCase().includes('play') ||
        el.closest('[data-hook*="play"]')
      ) {
        buttons.push({
          selector: `[data-testid="${el.getAttribute('data-testid')}"]`,
          text: text || ariaLabel || className.substring(0, 50),
          index: idx,
        });
        idx++;
      }
    });

    return buttons;
  });

  console.log(`Found ${playButtons.length} play button candidates`);

  // Also look for track items that might be clickable
  const trackItems = await page.evaluate(() => {
    const items: string[] = [];
    // Wix music widget track items
    document.querySelectorAll('[data-hook="track-item"], [class*="track"], [class*="Track"]').forEach((el) => {
      items.push((el as HTMLElement).innerText?.substring(0, 80) || 'unknown');
    });
    return items;
  });
  console.log(`Found ${trackItems.length} track items:`, trackItems);

  // Try to find all iframes that might contain audio players
  const frames = page.frames();
  console.log(`\nChecking ${frames.length} frames for audio players...`);

  for (const frame of frames) {
    try {
      const frameUrl = frame.url();
      if (frameUrl && !frameUrl.includes('about:blank')) {
        console.log(`Frame: ${frameUrl.substring(0, 120)}`);
      }

      // Look for play buttons in frames
      const framePlayBtns = await frame.evaluate(() => {
        const btns: string[] = [];
        document.querySelectorAll('button, [role="button"], [data-hook*="play"], [class*="play"]').forEach((el) => {
          btns.push(`${el.tagName} | ${el.getAttribute('aria-label') || ''} | ${el.className?.toString().substring(0, 60) || ''} | ${(el as HTMLElement).innerText?.substring(0, 30) || ''}`);
        });
        return btns;
      });

      if (framePlayBtns.length > 0) {
        console.log(`  Frame play buttons:`, framePlayBtns);
      }

      // Look for track lists in frames
      const frameTracks = await frame.evaluate(() => {
        const tracks: { text: string; dataHook: string; classes: string }[] = [];
        document.querySelectorAll('[data-hook="track-item"], [data-hook="track-name"], [class*="track"], [class*="Track"], li, [role="listitem"]').forEach((el) => {
          const text = (el as HTMLElement).innerText?.substring(0, 80) || '';
          if (text.trim()) {
            tracks.push({
              text,
              dataHook: el.getAttribute('data-hook') || '',
              classes: el.className?.toString().substring(0, 80) || '',
            });
          }
        });
        return tracks;
      });

      if (frameTracks.length > 0) {
        console.log(`  Frame tracks (${frameTracks.length}):`, JSON.stringify(frameTracks.slice(0, 5), null, 2));

        // Try clicking each track/play button in this frame
        const clickableCount = await frame.evaluate(() => {
          return document.querySelectorAll('[data-hook="track-item"], [data-hook*="play"], button').length;
        });

        console.log(`  Attempting to click ${clickableCount} elements in frame...`);

        for (let i = 0; i < clickableCount; i++) {
          try {
            const beforeCount = mp3Urls.length;

            await frame.evaluate((index) => {
              const els = document.querySelectorAll('[data-hook="track-item"], [data-hook*="play"], button');
              if (els[index]) {
                (els[index] as HTMLElement).click();
              }
            }, i);

            // Wait for network request
            await new Promise((r) => setTimeout(r, 1500));

            if (mp3Urls.length > beforeCount) {
              const trackName = await frame.evaluate((index) => {
                const els = document.querySelectorAll('[data-hook="track-item"], [data-hook*="play"], button');
                return (els[index] as HTMLElement)?.innerText?.substring(0, 80) || `track-${index}`;
              }, i);
              console.log(`  -> Got MP3 for: ${trackName}`);
            }
          } catch {
            // Skip errors on individual clicks
          }
        }
      }
    } catch {
      // Cross-origin frame
    }
  }

  // If we haven't found MP3s through frames, try clicking directly on main page
  if (mp3Urls.length === 0) {
    console.log('\nNo MP3s from frames, trying main page clicks...');

    // Get all clickable elements more broadly
    const allClickable = await page.evaluate(() => {
      const items: { tag: string; text: string; classes: string; hook: string }[] = [];
      document.querySelectorAll('*').forEach((el) => {
        const classes = el.className?.toString() || '';
        const hook = el.getAttribute('data-hook') || '';
        const compId = el.getAttribute('comp-id') || '';
        if (classes.includes('play') || classes.includes('track') || classes.includes('audio') ||
            hook.includes('play') || hook.includes('track') || hook.includes('audio') ||
            compId) {
          items.push({
            tag: el.tagName,
            text: (el as HTMLElement).innerText?.substring(0, 50) || '',
            classes: classes.substring(0, 80),
            hook: hook || compId,
          });
        }
      });
      return items;
    });

    console.log('Clickable audio elements:', JSON.stringify(allClickable.slice(0, 20), null, 2));

    // Try clicking comp-id elements (Wix components)
    const compIds = await page.evaluate(() => {
      const ids: string[] = [];
      document.querySelectorAll('[comp-id]').forEach((el) => {
        ids.push(el.getAttribute('comp-id')!);
      });
      return ids;
    });
    console.log(`\nFound ${compIds.length} Wix components`);
  }

  // Print summary
  console.log('\n========== RESULTS ==========');
  console.log(`Total MP3 URLs found: ${mp3Urls.length}`);
  const uniqueUrls = [...new Set(mp3Urls.map(m => m.url))];
  console.log(`Unique MP3 URLs: ${uniqueUrls.length}`);
  uniqueUrls.forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });

  await browser.close();
}

main().catch(console.error);
