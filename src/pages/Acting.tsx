import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

const videos = [
  { title: '', embedId: 'AFWOllsYTuM' },
  { title: '', embedId: 'dC8cc318NA8' },
  { title: '', embedId: 'SE831UmvFFw' },
  { title: '', embedId: '33gxo8kF46g' },
  { title: '', embedId: 'erLsnxqpRoM' },
  { title: '', embedId: 'nzp7JH2O-bI' },
  { title: '', embedId: 'PQtymnbqq74' },
  { title: '', embedId: 'nS-ib-Fpi6c' },
];

export default function Acting() {
  const { isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'משחק מול מצלמה' : 'Acting On-Camera'}
        subtitle={isRtl
          ? 'פרסומות, פרומואים, תוכניות, סרטים ויראליים - עושה הכל (טוב כמעט), דברו עם הסוכנת שלי.'
          : 'Commercials, promos, shows, viral videos - I do it all (well, almost). Talk to my agent.'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoGrid videos={videos} columns={3} />
        </div>
      </section>
    </>
  );
}
