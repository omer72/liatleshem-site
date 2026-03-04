/**
 * Scrape social media links from liatleshem.com
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
  await page.goto('https://www.liatleshem.com/contact', { waitUntil: 'networkidle2', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 5000));

  // Scroll to bottom to load footer
  await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
  await new Promise((r) => setTimeout(r, 3000));

  const socialLinks = await page.evaluate(() => {
    const links: { href: string; ariaLabel: string; classes: string }[] = [];

    // Check all links
    document.querySelectorAll('a').forEach((a) => {
      const href = a.href || '';
      const ariaLabel = a.getAttribute('aria-label') || '';
      const classes = a.className || '';

      if (
        href.includes('facebook') ||
        href.includes('instagram') ||
        href.includes('youtube') ||
        href.includes('twitter') ||
        href.includes('linkedin') ||
        href.includes('tiktok') ||
        href.includes('whatsapp') ||
        ariaLabel.toLowerCase().includes('facebook') ||
        ariaLabel.toLowerCase().includes('instagram') ||
        ariaLabel.toLowerCase().includes('youtube') ||
        ariaLabel.toLowerCase().includes('twitter')
      ) {
        links.push({ href, ariaLabel, classes });
      }
    });

    // Also check for social bar elements
    document.querySelectorAll('[data-hook*="social"], [class*="social"], [id*="social"]').forEach((el) => {
      const innerLinks = el.querySelectorAll('a');
      innerLinks.forEach((a) => {
        links.push({
          href: a.href || '',
          ariaLabel: a.getAttribute('aria-label') || '',
          classes: a.className || '',
        });
      });
    });

    // Check all links with icon SVGs that might be social
    document.querySelectorAll('a svg, a img[alt*="facebook"], a img[alt*="instagram"]').forEach((el) => {
      const parent = el.closest('a');
      if (parent) {
        links.push({
          href: parent.href || '',
          ariaLabel: parent.getAttribute('aria-label') || '',
          classes: parent.className || '',
        });
      }
    });

    return links;
  });

  console.log('Social links found:', JSON.stringify(socialLinks, null, 2));

  // Also get all unique external links to identify social profiles
  const allExternalLinks = await page.evaluate(() => {
    const links: string[] = [];
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = (a as HTMLAnchorElement).href;
      if (href && !href.includes('liatleshem.com') && !href.startsWith('javascript:') && !href.startsWith('mailto:')) {
        links.push(href);
      }
    });
    return [...new Set(links)];
  });

  console.log('\nAll external links:', JSON.stringify(allExternalLinks, null, 2));

  await browser.close();
}

main().catch(console.error);
