# Liat Leshem - Portfolio Website

Portfolio website for Liat Leshem - voice-over artist, actress, and on-camera presenter.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **React Router v7** for client-side routing
- **Lucide React** for icons

## Features

- Hebrew/English bilingual support with RTL layout
- Video pages with YouTube embeds (TV, Movies, Dubbing, Acting, Presenting)
- Radio page with 30 self-hosted MP3 audio players organized by voice-over style
- Contact page with agent info and contact form
- Social media links (Facebook, Instagram, YouTube, TikTok, LinkedIn, SoundCloud)
- Responsive design with mobile navigation
- Smooth page transitions and scroll animations

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  components/   # Shared components (Navbar, Footer, PageHero, VideoGrid, SectionCard)
  pages/        # Route pages (Home, VoiceOver, TV, Radio, Movies, Dubbing, etc.)
  hooks/        # Custom hooks (useLanguage for i18n)
  i18n/         # Translation strings
public/
  audio/        # 30 MP3 radio demo tracks
  images/       # Hero image and assets
```
