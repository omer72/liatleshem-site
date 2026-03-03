import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';
import VideoGrid from '../components/VideoGrid';

const videos = [
  { title: 'שופרסל פארם', embedId: 'Grd_aIEIbuI' },
  { title: 'קריינות מכירתית כפולה - תשדירי ML', embedId: '_xxCRlGENhA' },
  { title: 'קריינות הארדסל לעזריאלי סייל', embedId: 'H2HkVGwQqhE' },
  { title: 'רול:אביב של אמ:פמ', embedId: 'vPnTHm-ZRw8' },
  { title: 'קריינות שובבה - Yoplait', embedId: '2fHV9UZCzco' },
  { title: 'קריינות ממזרתית - בוניטה דה מאס 2', embedId: 'ECKH22NvR8I' },
  { title: 'קריינות סקסית - בוניטה דה מאס', embedId: 'KnfiSYUPXHs' },
  { title: 'קריינות סקסית בפרומואים yes', embedId: '16obsVU01N4' },
  { title: 'קריינות חמה - פקטורי 54', embedId: '1bFVi4xj7S4' },
  { title: 'ברנפלקס תלמה', embedId: 'dVzfyiCKnYc' },
  { title: 'קריינות מחוות בריאות - ברנפלקס', embedId: '_lHeXWrrdEc' },
  { title: 'ישראל היום', embedId: 'clv3JVMN5Ok' },
  { title: 'קריינות לתחושת רכות - נטורלה', embedId: 'eFwTkRBUPoQ' },
  { title: 'קריינות מתובלת - אסם', embedId: 'vvE-cANZKTk' },
  { title: 'קריינות שלווה - רימונים', embedId: 'hoS7ySZYbWM' },
  { title: 'סופר סטיי של מייבלין', embedId: 'vriD7lazKQ4' },
  { title: 'ניוטרוג\'ינה', embedId: 'P4J9reJZJno' },
  { title: 'דיבוב וקריינות - ליידי רוטושייב', embedId: '7sr-i3qlPEk' },
];

export default function TV() {
  const { isRtl } = useLanguage();

  return (
    <>
      <PageHero
        title={isRtl ? 'טלוויזיה - פרסומות ופרומואים' : 'Television - Commercials & Promos'}
        subtitle={isRtl
          ? 'קטעי הוידאו מסודרים בגלריות לפי סגנון הקריינות, דפדפו בכל גלריה לדוגמאות'
          : 'Video clips organized by voice-over style, browse each gallery for examples'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoGrid videos={videos} columns={3} />
        </div>
      </section>
    </>
  );
}
