/**
 * Scrape all pages from liatleshem.com (Wix site) and extract:
 * - YouTube video embed IDs
 * - Audio player content
 * - Text content (Hebrew)
 * - Image URLs
 *
 * Usage:
 *   npx tsx scripts/scrape-liat.ts
 *   npx tsx scripts/scrape-liat.ts <page-slug>   # scrape single page
 */

import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUTPUT_DIR = path.join(__dirname, '..', 'scraped-data');

const PAGES = [
  { slug: 'home', url: 'https://www.liatleshem.com/' },
  { slug: 'voice-over', url: 'https://www.liatleshem.com/voice-over' },
  { slug: 'tv', url: 'https://www.liatleshem.com/tv' },
  { slug: 'radio', url: 'https://www.liatleshem.com/radio' },
  { slug: 'movies', url: 'https://www.liatleshem.com/movies' },
  { slug: 'dubbing', url: 'https://www.liatleshem.com/dubbing' },
  { slug: 'on-camera', url: 'https://www.liatleshem.com/on-camera' },
  { slug: 'acting', url: 'https://www.liatleshem.com/acting' },
  { slug: 'presenting', url: 'https://www.liatleshem.com/presenting' },
  { slug: 'pix', url: 'https://www.liatleshem.com/pix' },
  { slug: 'web', url: 'https://www.liatleshem.com/web' },
  { slug: 'contact', url: 'https://www.liatleshem.com/contact' },
  { slug: 'english', url: 'https://www.liatleshem.com/english' },
  { slug: 'extras', url: 'https://www.liatleshem.com/extras' },
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

interface ScrapedPage {
  slug: string;
  url: string;
  title: string;
  textContent: string[];
  youtubeVideos: { id: string; title: string }[];
  wixVideos: string[];
  audioTracks: string[];
  images: string[];
  iframeUrls: string[];
  links: { text: string; href: string }[];
}

async function scrapePage(
  browser: puppeteer.Browser,
  slug: string,
  url: string
): Promise<ScrapedPage> {
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'he-IL,he;q=0.9' });

  console.log(`\n🌐 Scraping: ${slug} (${url})`);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
  } catch (e) {
    console.log(`⚠️  Timeout on ${slug}, continuing with partial content...`);
  }

  // Wait for Wix initial render
  await new Promise((r) => setTimeout(r, 4000));

  // Scroll through the page to trigger lazy loading
  console.log(`⏳ Scrolling ${slug} to load dynamic content...`);
  for (let pass = 0; pass < 2; pass++) {
    const scrollHeight = await page.evaluate('document.body.scrollHeight') as number;
    for (let y = 0; y < scrollHeight; y += 300) {
      await page.evaluate(`window.scrollTo(0, ${y})`);
      await new Promise((r) => setTimeout(r, 200));
    }
    await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
    await new Promise((r) => setTimeout(r, 1500));
  }

  // Wait for all content to settle
  await new Promise((r) => setTimeout(r, 3000));

  // Extract all content from the page
  const data = await page.evaluate(() => {
    const result = {
      title: document.title || '',
      textContent: [] as string[],
      youtubeVideos: [] as { id: string; title: string }[],
      wixVideos: [] as string[],
      audioTracks: [] as string[],
      images: [] as string[],
      iframeUrls: [] as string[],
      links: [] as { text: string; href: string }[],
    };

    // Extract text content from visible elements
    const textElements = document.querySelectorAll(
      'h1, h2, h3, h4, h5, h6, p, span, [data-hook], [class*="rich-text"], [class*="WRchTxt"]'
    );
    const seenText = new Set<string>();
    textElements.forEach((el) => {
      const text = (el as HTMLElement).innerText?.trim();
      if (text && text.length > 2 && !seenText.has(text)) {
        seenText.add(text);
        result.textContent.push(text);
      }
    });

    // Extract YouTube videos from iframes
    const iframes = document.querySelectorAll('iframe');
    const seenYT = new Set<string>();
    iframes.forEach((iframe) => {
      const src = iframe.src || iframe.getAttribute('data-src') || '';
      result.iframeUrls.push(src);

      // YouTube embed URLs
      const ytMatch = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
      if (ytMatch && !seenYT.has(ytMatch[1])) {
        seenYT.add(ytMatch[1]);
        result.youtubeVideos.push({
          id: ytMatch[1],
          title: iframe.title || '',
        });
      }

      // YouTube watch URLs in iframes
      const ytWatch = src.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
      if (ytWatch && !seenYT.has(ytWatch[1])) {
        seenYT.add(ytWatch[1]);
        result.youtubeVideos.push({
          id: ytWatch[1],
          title: iframe.title || '',
        });
      }
    });

    // Also check for YouTube links in the page
    document.querySelectorAll('a[href*="youtube.com"], a[href*="youtu.be"]').forEach((a) => {
      const href = (a as HTMLAnchorElement).href;
      const match = href.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
      if (match && !seenYT.has(match[1])) {
        seenYT.add(match[1]);
        result.youtubeVideos.push({
          id: match[1],
          title: (a as HTMLElement).innerText?.trim() || '',
        });
      }
    });

    // Extract Wix video components
    document.querySelectorAll('[data-hook*="video"], video, [class*="video"]').forEach((el) => {
      const src = (el as HTMLVideoElement).src || el.getAttribute('data-video-url') || '';
      if (src) result.wixVideos.push(src);
    });

    // Extract audio tracks
    document.querySelectorAll('audio, [data-hook*="audio"], [class*="audio"]').forEach((el) => {
      const src = (el as HTMLAudioElement).src || el.getAttribute('data-src') || '';
      if (src) result.audioTracks.push(src);
    });

    // Extract images (filter out tiny icons)
    const seenImg = new Set<string>();
    document.querySelectorAll('img').forEach((img) => {
      const src = img.src || img.getAttribute('data-src') || '';
      if (
        src &&
        !seenImg.has(src) &&
        !src.includes('social') &&
        !src.includes('flag') &&
        !src.includes('accessibility') &&
        img.naturalWidth > 50 &&
        img.naturalHeight > 50
      ) {
        seenImg.add(src);
        result.images.push(src);
      }
    });

    // Also check for background images in Wix galleries
    document.querySelectorAll('[style*="background-image"]').forEach((el) => {
      const match = (el as HTMLElement).style.backgroundImage?.match(/url\(["']?(.*?)["']?\)/);
      if (match && match[1] && !seenImg.has(match[1])) {
        seenImg.add(match[1]);
        result.images.push(match[1]);
      }
    });

    // Extract links
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = (a as HTMLAnchorElement).href;
      const text = (a as HTMLElement).innerText?.trim();
      if (href && text && !href.startsWith('javascript:')) {
        result.links.push({ text, href });
      }
    });

    return result;
  });

  // Also check iframes for embedded content (Wix galleries, video players)
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const frameData = await frame.evaluate(() => {
        const ytVideos: { id: string; title: string }[] = [];
        const audios: string[] = [];
        const imgs: string[] = [];

        // YouTube in iframes within iframes
        document.querySelectorAll('iframe[src*="youtube"]').forEach((iframe) => {
          const src = (iframe as HTMLIFrameElement).src;
          const match = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
          if (match) {
            ytVideos.push({ id: match[1], title: (iframe as HTMLIFrameElement).title || '' });
          }
        });

        // Wix music player tracks
        document.querySelectorAll('[data-track-url], audio source, [data-src*=".mp3"], [data-src*=".wav"]').forEach((el) => {
          const src = (el as HTMLElement).getAttribute('data-track-url') ||
                     (el as HTMLSourceElement).src ||
                     (el as HTMLElement).getAttribute('data-src') || '';
          if (src) audios.push(src);
        });

        // Gallery images
        document.querySelectorAll('img[src*="wixstatic"], img[src*="wixmp"]').forEach((img) => {
          if ((img as HTMLImageElement).naturalWidth > 50) {
            imgs.push((img as HTMLImageElement).src);
          }
        });

        return { ytVideos, audios, imgs };
      });

      data.youtubeVideos.push(...frameData.ytVideos);
      data.audioTracks.push(...frameData.audios);
      data.images.push(...frameData.imgs);
    } catch {
      // Frame may be cross-origin, skip
    }
  }

  // Deduplicate YouTube videos
  const seenIds = new Set<string>();
  data.youtubeVideos = data.youtubeVideos.filter((v) => {
    if (seenIds.has(v.id)) return false;
    seenIds.add(v.id);
    return true;
  });

  await page.close();

  console.log(`  📄 Title: ${data.title}`);
  console.log(`  📝 Text blocks: ${data.textContent.length}`);
  console.log(`  🎬 YouTube videos: ${data.youtubeVideos.length}`);
  console.log(`  🎥 Wix videos: ${data.wixVideos.length}`);
  console.log(`  🎵 Audio tracks: ${data.audioTracks.length}`);
  console.log(`  🖼️  Images: ${data.images.length}`);
  console.log(`  🔗 Iframes: ${data.iframeUrls.length}`);

  return {
    slug,
    url,
    ...data,
  };
}

async function main() {
  ensureDir(OUTPUT_DIR);

  const singleSlug = process.argv[2];
  const pagesToScrape = singleSlug
    ? PAGES.filter((p) => p.slug === singleSlug)
    : PAGES;

  if (pagesToScrape.length === 0) {
    console.error(`❌ Unknown page slug: ${singleSlug}`);
    console.log('Available:', PAGES.map((p) => p.slug).join(', '));
    process.exit(1);
  }

  console.log(`🚀 Scraping ${pagesToScrape.length} page(s) from liatleshem.com...\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=he-IL'],
    defaultViewport: { width: 1280, height: 900 },
  });

  const allResults: ScrapedPage[] = [];

  for (const { slug, url } of pagesToScrape) {
    try {
      const result = await scrapePage(browser, slug, url);
      allResults.push(result);

      // Save individual page data
      const outPath = path.join(OUTPUT_DIR, `${slug}.json`);
      fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
      console.log(`  ✅ Saved: ${outPath}`);
    } catch (err) {
      console.error(`  ❌ Error scraping ${slug}:`, err);
    }
  }

  // Save combined results
  const combinedPath = path.join(OUTPUT_DIR, '_all-pages.json');
  fs.writeFileSync(combinedPath, JSON.stringify(allResults, null, 2), 'utf-8');
  console.log(`\n📦 Combined results saved: ${combinedPath}`);

  // Print summary
  console.log('\n═══════════════════════════════════');
  console.log('📊 SCRAPING SUMMARY');
  console.log('═══════════════════════════════════');
  let totalVideos = 0;
  for (const r of allResults) {
    totalVideos += r.youtubeVideos.length;
    if (r.youtubeVideos.length > 0) {
      console.log(`\n${r.slug}:`);
      r.youtubeVideos.forEach((v) => {
        console.log(`  🎬 ${v.id}${v.title ? ` - ${v.title}` : ''}`);
      });
    }
    if (r.audioTracks.length > 0) {
      console.log(`\n${r.slug}: 🎵 ${r.audioTracks.length} audio tracks`);
    }
  }
  console.log(`\n📊 Total YouTube videos found: ${totalVideos}`);
  console.log('═══════════════════════════════════\n');

  await browser.close();
}

main().catch(console.error);
