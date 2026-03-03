import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

const videos = [
  { title: '', embedId: 'UJv3BJ3lxlI' },
  { title: '', embedId: 'yYBzj2Bbxlg' },
  { title: '', embedId: 'FcEVutxqf00' },
  { title: '', embedId: 'dlPPw1iDSx8' },
  { title: '', embedId: '9ezi-3OA-3c' },
  { title: '', embedId: 'q9DsP5lkLUI' },
  { title: '', embedId: 't9UBBkZO66Y' },
];

export default function Dubbing() {
  const { isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'דיבוב/קריינות משוחקת' : 'Dubbing & Dramatic Voice-Over'}
        subtitle={isRtl ? 'דוגמיות נוספות של משחק מאחורי מיקרופון - בעמוד הרדיו' : 'More behind-the-mic acting demos on the Radio page'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-white/40 text-sm">
            <Link to="/radio" className="text-accent hover:text-accent-light transition-colors">
              {isRtl ? 'לדוגמיות נוספות של משחק מאחורי מיקרופון - בעמוד הרדיו (קליק כאן)' : 'More behind-the-mic acting demos on the Radio page (click here)'}
            </Link>
          </p>
          <VideoGrid videos={videos} columns={3} />
        </div>
      </section>
    </>
  );
}
