/**
 * Scrape MP3 URLs with track names from liatleshem.com/radio
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
  const mp3Urls: string[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('music.wixstatic.com') && url.includes('.mp3')) {
      if (!mp3Urls.includes(url)) {
        mp3Urls.push(url);
      }
    }
  });

  await page.goto('https://www.liatleshem.com/radio', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Scroll to load all
  const scrollHeight = await page.evaluate('document.body.scrollHeight') as number;
  for (let y = 0; y < scrollHeight; y += 300) {
    await page.evaluate(`window.scrollTo(0, ${y})`);
    await new Promise((r) => setTimeout(r, 100));
  }
  await new Promise((r) => setTimeout(r, 3000));

  const frame = page.frames()[0];

  // Get all play buttons and their associated track names
  const trackData = await frame.evaluate(() => {
    const results: { name: string; buttonIndex: number }[] = [];
    const playButtons = document.querySelectorAll('button[aria-label="Play"]');

    playButtons.forEach((btn, i) => {
      // Walk up to find the track container, then find the track name
      let container = btn.closest('[class*="Track"], [class*="track"], [class*="item"]') || btn.parentElement?.parentElement?.parentElement;
      let nameEl = container?.querySelector('[class*="name"], [class*="Name"], [class*="title"], [class*="Title"], span, p');
      let name = nameEl?.textContent?.trim() || '';

      // If no name found, look for nearby text
      if (!name) {
        const parent = btn.parentElement;
        const siblings = parent?.parentElement?.querySelectorAll('span, p, div');
        siblings?.forEach((s) => {
          const t = (s as HTMLElement).innerText?.trim();
          if (t && t.length > 2 && t.length < 100 && !t.includes('Play') && !t.includes('00:')) {
            if (!name) name = t;
          }
        });
      }

      results.push({ name: name || `track-${i}`, buttonIndex: i });
    });

    return results;
  });

  console.log(`Found ${trackData.length} tracks`);

  // Now click each play button and map to MP3
  const trackMp3Map: { name: string; mp3: string }[] = [];
  const playButtons = await frame.$$('button[aria-label="Play"]');

  for (let i = 0; i < playButtons.length; i++) {
    const beforeCount = mp3Urls.length;

    try {
      await playButtons[i].click();
      await new Promise((r) => setTimeout(r, 1500));

      if (mp3Urls.length > beforeCount) {
        const newUrl = mp3Urls[mp3Urls.length - 1];
        trackMp3Map.push({
          name: trackData[i]?.name || `track-${i}`,
          mp3: newUrl,
        });
        console.log(`${i + 1}. "${trackData[i]?.name}" -> ${newUrl}`);
      } else {
        // Might have been the auto-play first track
        if (i === 0 && mp3Urls.length > 0) {
          trackMp3Map.push({
            name: trackData[i]?.name || `track-${i}`,
            mp3: mp3Urls[0],
          });
          console.log(`${i + 1}. "${trackData[i]?.name}" -> ${mp3Urls[0]} (auto-played)`);
        } else {
          console.log(`${i + 1}. "${trackData[i]?.name}" -> NO NEW MP3`);
        }
      }
    } catch (e) {
      console.log(`${i + 1}. "${trackData[i]?.name}" -> ERROR: ${e}`);
    }
  }

  console.log('\n\n========== FINAL MAP ==========');
  console.log(JSON.stringify(trackMp3Map, null, 2));

  await browser.close();
}

main().catch(console.error);
