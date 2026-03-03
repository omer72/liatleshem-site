import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tv, Radio, Film, Languages } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';

const cards = [
  { key: 'tv', icon: <Tv size={28} />, path: '/tv' },
  { key: 'radio', icon: <Radio size={28} />, path: '/radio' },
  { key: 'corporate', icon: <Film size={28} />, path: '/movies' },
  { key: 'dubbing', icon: <Languages size={28} />, path: '/dubbing' },
] as const;

export default function VoiceOver() {
  const { t, lang } = useLanguage();

  return (
    <>
      <PageHero
        title={t.sections.voiceover.title}
        subtitle={t.sections.voiceover.description}
      />

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Voice style categories */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              {lang === 'he' ? 'סגנונות קריינות' : 'Voice-Over Styles'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(t.sections.voiceover.categories).map(([key, label], i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-surface-light/40 border border-white/5 hover:border-accent/30 hover:bg-surface-light/70 transition-all cursor-default"
                >
                  <p className="text-white/80 font-medium text-sm">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sub-page links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={card.path}
                  className="group flex flex-col items-center p-8 rounded-2xl bg-surface/80 border border-white/5 hover:border-accent/30 hover:shadow-[0_0_40px_-10px_var(--color-accent)] transition-all duration-300"
                >
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-white font-medium group-hover:text-accent transition-colors">
                    {t.nav[card.key]}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
