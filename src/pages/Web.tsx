import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

// Mix of videos from across the site as a "best of" archive
const recentVideos = [
  { title: 'שופרסל פארם', embedId: 'Grd_aIEIbuI' },
  { title: '', embedId: 'SE831UmvFFw' },
  { title: '', embedId: 'KvMTkJrExo8' },
  { title: 'קריינות מכירתית כפולה', embedId: '_xxCRlGENhA' },
  { title: '', embedId: 'AFWOllsYTuM' },
  { title: '', embedId: 'NdD4b1VIIx0' },
  { title: '', embedId: 'UJv3BJ3lxlI' },
  { title: '', embedId: 'pOou2QGHw2I' },
  { title: '', embedId: 'XnKGFFD_Ot4' },
];

export default function Web() {
  const { t, isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={t.sections.web.title}
        subtitle={t.sections.web.description}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.a
            href="https://www.youtube.com/user/liatleshem"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-12 bg-accent/10 text-accent border border-accent/20 rounded-full hover:bg-accent hover:text-white transition-all"
          >
            <ExternalLink size={16} />
            {isRtl ? 'לערוץ היוטיוב המלא' : 'Visit Full YouTube Channel'}
          </motion.a>

          <VideoGrid videos={recentVideos} columns={3} />
        </div>
      </section>
    </>
  );
}
