import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clapperboard, Presentation, ImageIcon } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';

export default function OnCamera() {
  const { t, lang } = useLanguage();

  const cards = [
    { title: t.sections.oncamera.acting, icon: <Clapperboard size={32} />, path: '/acting', desc: lang === 'he' ? 'משחק בטלוויזיה, סטרימינג, סרטי תדמית ועוד' : 'Acting for TV, streaming, corporate videos and more' },
    { title: t.sections.oncamera.presenting, icon: <Presentation size={32} />, path: '/presenting', desc: lang === 'he' ? 'הגשה מול מצלמה - תוכניות, סרטונים, אירועים' : 'On-camera presenting - shows, videos, events' },
    { title: t.sections.oncamera.photos, icon: <ImageIcon size={32} />, path: '/pix', desc: lang === 'he' ? 'גלריות תמונות סטילס' : 'Still photo galleries' },
  ];

  return (
    <>
      <PageHero
        title={t.sections.oncamera.title}
        subtitle={t.sections.oncamera.description}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={card.path}
                  className="group block p-8 rounded-2xl bg-surface-light/40 border border-white/5 hover:border-accent/30 hover:shadow-[0_0_40px_-10px_var(--color-accent)] transition-all duration-300 text-center"
                >
                  <div className="text-accent mb-5 inline-flex group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-sm">{card.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
