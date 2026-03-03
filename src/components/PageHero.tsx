import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export default function PageHero({ title, subtitle, compact }: PageHeroProps) {
  return (
    <section className={`relative ${compact ? 'pt-28 pb-12' : 'pt-32 pb-16'} bg-gradient-to-b from-surface via-primary to-primary`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_60%)] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
