import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

const videos = [
  { title: '', embedId: 'KvMTkJrExo8' },
  { title: '', embedId: 'pOou2QGHw2I' },
  { title: '', embedId: 'H5hQmyD8JB0' },
  { title: '', embedId: 'RQS94mFfo6g' },
  { title: '', embedId: 'Fbrz628e3H4' },
  { title: '', embedId: 'xbdsdWs-pCY' },
];

export default function Presenting() {
  const { isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'הגשה/הדגמה/הסברה מול מצלמה' : 'Presenting On-Camera'}
        subtitle={isRtl
          ? 'מגישה אתרים, אפליקציות, סרטי תדמית והדרכה - יצוגית/קומית/רשמית, אני כחומר גלם בידיכם.'
          : 'Presenting websites, apps, corporate & training videos - demo/comedic/formal, I\'m raw material in your hands.'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoGrid videos={videos} />
        </div>
      </section>
    </>
  );
}
