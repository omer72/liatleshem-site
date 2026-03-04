/**
 * Scrape the radio page audio widget data from liatleshem.com
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
  await page.goto('https://www.liatleshem.com/radio', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Scroll through to load all content
  for (let i = 0; i < 3; i++) {
    const h = await page.evaluate('document.body.scrollHeight') as number;
    for (let y = 0; y < h; y += 300) {
      await page.evaluate(`window.scrollTo(0, ${y})`);
      await new Promise((r) => setTimeout(r, 150));
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Look for Wix music player widgets and audio sources
  const audioData = await page.evaluate(() => {
    const data: any[] = [];

    // Check for Wix music player
    document.querySelectorAll('[data-hook*="music"], [data-hook*="audio"], [class*="music"], [class*="audio"], [class*="player"], [comp-id]').forEach((el) => {
      data.push({
        type: 'widget',
        tag: el.tagName,
        classes: el.className?.toString().substring(0, 100),
        dataHook: el.getAttribute('data-hook'),
        compId: el.getAttribute('comp-id'),
        id: el.id,
        innerHTML: el.innerHTML?.substring(0, 200),
      });
    });

    // Check for audio elements
    document.querySelectorAll('audio, source[type*="audio"]').forEach((el) => {
      data.push({
        type: 'audio-element',
        src: (el as HTMLAudioElement).src || (el as HTMLSourceElement).src,
        currentSrc: (el as HTMLAudioElement).currentSrc,
      });
    });

    // Check iframes for embedded players
    document.querySelectorAll('iframe').forEach((iframe) => {
      data.push({
        type: 'iframe',
        src: iframe.src,
        title: iframe.title,
      });
    });

    // Check for SoundCloud or other embeds
    document.querySelectorAll('[src*="soundcloud"], [data-src*="soundcloud"], a[href*="soundcloud"]').forEach((el) => {
      data.push({
        type: 'soundcloud',
        src: (el as HTMLElement).getAttribute('src') || (el as HTMLAnchorElement).href,
      });
    });

    return data;
  });

  console.log('Audio data found:', JSON.stringify(audioData, null, 2));

  // Check frames too
  const frames = page.frames();
  console.log(`\nChecking ${frames.length} frames...`);
  for (const frame of frames) {
    try {
      const frameUrl = frame.url();
      if (frameUrl && !frameUrl.includes('about:blank')) {
        console.log(`Frame URL: ${frameUrl}`);
      }
      const frameAudio = await frame.evaluate(() => {
        const items: any[] = [];
        document.querySelectorAll('audio, [data-track], [class*="track"], [class*="player"]').forEach((el) => {
          items.push({
            tag: el.tagName,
            src: (el as HTMLAudioElement).src || '',
            classes: el.className?.toString().substring(0, 100),
            text: (el as HTMLElement).innerText?.substring(0, 100),
          });
        });
        return items;
      });
      if (frameAudio.length > 0) {
        console.log('Frame audio:', JSON.stringify(frameAudio, null, 2));
      }
    } catch {
      // Cross-origin frame
    }
  }

  await browser.close();
}

main().catch(console.error);
