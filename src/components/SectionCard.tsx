import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface SectionCardProps {
  title: string;
  description: string;
  to: string;
  icon: React.ReactNode;
  index?: number;
}

export default function SectionCard({ title, description, to, icon, index = 0 }: SectionCardProps) {
  const { isRtl } = useLanguage();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={to}
        className="group block p-6 bg-surface-light/50 rounded-2xl border border-white/5 hover:border-accent/30 transition-all duration-300 hover:bg-surface-light/80 hover:shadow-[0_0_40px_-10px_var(--color-accent)]"
      >
        <div className="text-accent mb-4 text-3xl">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all">
          <Arrow size={16} />
        </span>
      </Link>
    </motion.div>
  );
}
