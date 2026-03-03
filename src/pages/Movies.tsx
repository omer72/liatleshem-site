import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

const videos = [
  { title: '', embedId: 'NdD4b1VIIx0' },
  { title: '', embedId: 'T5kY7q8Yk6Y' },
  { title: '', embedId: 'aITbQd9FBp4' },
  { title: '', embedId: 'rUkRF7N6etk' },
  { title: '', embedId: 'WzyfXkDecjc' },
  { title: '', embedId: 'pVz_URFJnn8' },
  { title: '', embedId: 'pfZdwsc_j4A' },
  { title: '', embedId: 'bUPaB6MFFWU' },
];

export default function Movies() {
  const { isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'סרטי תדמית/הדרכה/קייס סטאדיז ושות\'' : 'Corporate & Training Videos'}
        subtitle={isRtl ? 'קריינות לסרטי תדמית, הדרכה והסברה' : 'Voice-over for corporate, training, and educational videos'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoGrid videos={videos} columns={3} />
        </div>
      </section>
    </>
  );
}
