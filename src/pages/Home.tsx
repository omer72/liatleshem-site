import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, Camera, ArrowDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import SectionCard from '../components/SectionCard';

export default function Home() {
  const { t, isRtl } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface to-primary" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-primary)_70%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-start"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent text-sm font-medium tracking-[0.3em] uppercase mb-6"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-6xl sm:text-7xl md:text-8xl font-black text-white leading-[0.9] tracking-tight"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
            >
              {isRtl
                ? 'קריינית ומדבבת רב-גונית ומנוסה. עברית ואנגלית. מקליטה גם מהבית.'
                : t.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-col sm:flex-row items-center md:items-start gap-4"
            >
              <Link
                to="/contact"
                className="px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-colors shadow-[0_0_30px_-5px_var(--color-accent)]"
              >
                {t.hero.cta}
              </Link>
              <Link
                to="/voice-over"
                className="px-8 py-3 border border-white/20 text-white/80 font-medium rounded-full hover:border-white/40 hover:text-white transition-all"
              >
                {t.hero.showreel}
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-gold/20 blur-2xl" />
              <img
                src="/images/liat-hero.webp"
                alt="ליאת לשם"
                fetchPriority="high"
                className="relative w-full h-full object-cover rounded-full border-2 border-white/10 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown size={20} className="text-white/20 animate-bounce" />
        </motion.div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {isRtl ? 'בקיצור, גם קריינות וגם מול מצלמה. כזו אני. גם וגם. ועוד.' : 'In short, I do both. That\'s who I am. Both. And more.'}
            </h2>
            <p className="mt-4 text-white/40">
              {isRtl ? 'נווטו כאן למעלה לכל הדוגמיות שתוכלו לאכול ועוד ועוד, בתאבון :)' : 'Browse through all the demos you can handle and more, bon appétit :)'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionCard
              title={t.sections.voiceover.title}
              description={isRtl ? 'פרסומות, פרומואים, תוכניות, מענים קוליים, סרטי תדמית ועוד' : t.sections.voiceover.description}
              to="/voice-over"
              icon={<Mic />}
              index={0}
            />
            <SectionCard
              title={t.sections.oncamera.title}
              description={isRtl ? 'מגישה ומשחקת מול מצלמה. עברית ואנגלית. מנוסה בכל סוגי ההפקות.' : t.sections.oncamera.description}
              to="/on-camera"
              icon={<Camera />}
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Agent Contact Strip */}
      <section className="py-16 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-surface-light/50 border border-white/5"
            >
              <p className="text-accent text-sm font-medium mb-2">{t.sections.contact.voiceAgent}</p>
              <p className="text-white text-lg font-semibold">תאריקה זוהר</p>
              <a href="tel:054-6883886" className="text-white/50 hover:text-white transition-colors">054-6883886</a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-surface-light/50 border border-white/5"
            >
              <p className="text-accent text-sm font-medium mb-2">{t.sections.contact.cameraAgent}</p>
              <p className="text-white text-lg font-semibold">חני שלום</p>
              <a href="tel:052-3854411" className="text-white/50 hover:text-white transition-colors">052-3854411</a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
