import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';

export default function Contact() {
  const { t, isRtl } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHero title={t.sections.contact.title} compact />

      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-surface-light/40 border border-white/5"
              >
                <h3 className="text-lg font-semibold text-accent mb-4">{t.sections.contact.voiceAgent}</h3>
                <p className="text-white font-medium text-lg">טריקה זוהר</p>
                <a href="tel:054-6883886" className="flex items-center gap-2 mt-2 text-white/50 hover:text-white transition-colors">
                  <Phone size={16} /> 054-6883886
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl bg-surface-light/40 border border-white/5"
              >
                <h3 className="text-lg font-semibold text-accent mb-4">{t.sections.contact.cameraAgent}</h3>
                <p className="text-white font-medium text-lg">חני שלום</p>
                <a href="tel:052-3854411" className="flex items-center gap-2 mt-2 text-white/50 hover:text-white transition-colors">
                  <Phone size={16} /> 052-3854411
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl bg-surface-light/40 border border-white/5"
              >
                <h3 className="text-lg font-semibold text-accent mb-4">
                  {isRtl ? 'פנייה ישירה' : 'Direct Contact'}
                </h3>
                <a href="mailto:contact@liatleshem.com" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
                  <Mail size={16} /> contact@liatleshem.com
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {sent ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">✓</div>
                    <p className="text-white text-xl font-medium">
                      {isRtl ? 'ההודעה נשלחה בהצלחה!' : 'Message sent successfully!'}
                    </p>
                    <p className="text-white/50 mt-2">
                      {isRtl ? 'אחזור אליכם בהקדם' : 'I\'ll get back to you soon'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-white/50 mb-2">{t.sections.contact.name}</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-surface-light/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-2">{t.sections.contact.email}</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-surface-light/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/50 mb-2">{t.sections.contact.message}</label>
                    <textarea
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-surface-light/50 border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-accent/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-accent text-white font-medium rounded-full hover:bg-accent-light transition-colors shadow-[0_0_30px_-5px_var(--color-accent)]"
                  >
                    <Send size={16} />
                    {t.sections.contact.send}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
