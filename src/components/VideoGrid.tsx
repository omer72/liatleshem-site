import { motion } from 'framer-motion';

interface Video {
  title: string;
  embedId: string;
}

interface VideoGridProps {
  videos: Video[];
  columns?: 2 | 3;
}

export default function VideoGrid({ videos, columns = 2 }: VideoGridProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {videos.map((video, i) => (
        <motion.div
          key={video.embedId}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="group"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-light border border-white/5 group-hover:border-accent/20 transition-colors">
            <iframe
              src={`https://www.youtube.com/embed/${video.embedId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
          {video.title && (
            <p className="mt-3 text-sm text-white/60 group-hover:text-white/80 transition-colors">
              {video.title}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
