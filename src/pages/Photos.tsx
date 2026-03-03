import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';

// Placeholder images - replace with real headshots/stills
const galleries = [
  {
    title: { he: 'הדשוטים', en: 'Headshots' },
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop',
    ],
  },
  {
    title: { he: 'בעבודה', en: 'At Work' },
    images: [
      'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=500&fit=crop',
    ],
  },
];

export default function Photos() {
  const { isRtl, lang } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'גלריות תמונות' : 'Photo Galleries'}
        subtitle={isRtl
          ? 'אזהרה: סיגריות מצטלמות טוב, אך מזיקות לכל השאר. אני כבר לא.'
          : 'Warning: cigarettes photograph well but harm everything else. I no longer smoke them.'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleries.map((gallery, gi) => (
            <div key={gi} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-white mb-6">{gallery.title[lang]}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.images.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-light"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-white/30 text-sm mt-8">
            {isRtl ? 'תמונות להמחשה - יוחלפו בתמונות אמיתיות' : 'Placeholder images - to be replaced with real photos'}
          </p>
        </div>
      </section>
    </>
  );
}
