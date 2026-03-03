import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import PageHero from '../components/PageHero';

interface Track {
  name: string;
  mp3: string;
}

interface TrackCategory {
  title: { he: string; en: string };
  tracks: Track[];
}

const categories: TrackCategory[] = [
  {
    title: { he: 'קריינות מחוייכת', en: 'Warm & Friendly' },
    tracks: [
      { name: 'קק"ל מזמינה אתכם לטייל', mp3: '/audio/track-01.mp3' },
      { name: 'אותות תחנה לרדיו חיפה (עם גיל קומר והראל סלוצקי)', mp3: '/audio/track-02.mp3' },
      { name: 'רשות הטבע והגנים', mp3: '/audio/track-03.mp3' },
      { name: 'פיאט 500', mp3: '/audio/track-04.mp3' },
      { name: 'דלונגי דרגון מבית ניופאן', mp3: '/audio/track-05.mp3' },
    ],
  },
  {
    title: { he: 'קריינות משוחקת', en: 'Dramatic / Playful' },
    tracks: [
      { name: 'סלקום (עם עודד דוידוב)', mp3: '/audio/track-06.mp3' },
      { name: 'המשביר לצרכן (עם גל נדיבי)', mp3: '/audio/track-07.mp3' },
      { name: 'הוט טריפל + הוט מובייל (עם נעם אבירם)', mp3: '/audio/track-08.mp3' },
      { name: 'רוטס HR, אני קלודין (עם סנדרה רינגלר וזיו תדהר)', mp3: '/audio/track-09.mp3' },
      { name: 'סבוקלם (עם גדי לוי, אלון זמק ונעם אבירם)', mp3: '/audio/track-10.mp3' },
    ],
  },
  {
    title: { he: 'קריינות דידקטית', en: 'Didactic / Informative' },
    tracks: [
      { name: 'תשדירי מידע בנושא אוסטיאופורוזיס', mp3: '/audio/track-11.mp3' },
      { name: 'מבצע אכיפה של משטרת התנועה (עם רפי גינת)', mp3: '/audio/track-12.mp3' },
      { name: 'משרד התמ"ת, אכיפת חוק הטרדה מינית', mp3: '/audio/track-13.mp3' },
      { name: 'מימון ישיר (עם שמוליק לוי ונעם אבירם)', mp3: '/audio/track-14.mp3' },
      { name: 'האקדמית ת"א יפו (מתחיל דידקטי ממשיך שמייח)', mp3: '/audio/track-15.mp3' },
    ],
  },
  {
    title: { he: 'קריינות רכה', en: 'Soft' },
    tracks: [
      { name: 'פזגז (עם יואב יפת)', mp3: '/audio/track-16.mp3' },
      { name: 'תדר חדש ל-88fm באילת', mp3: '/audio/track-17.mp3' },
      { name: 'פרומו יום האישה ב-88fm', mp3: '/audio/track-18.mp3' },
      { name: 'סימילאק (עם יואב יפת)', mp3: '/audio/track-19.mp3' },
      { name: 'משרד הבינוי והשיכון', mp3: '/audio/track-20.mp3' },
    ],
  },
  {
    title: { he: 'קריינות מכירתית', en: 'Commercial / Sales' },
    tracks: [
      { name: 'סקודה בתוכנית הבוקר של רדיו ת"א 102fm', mp3: '/audio/track-21.mp3' },
      { name: 'yes חוויה קולנועית גדולה מהחיים', mp3: '/audio/track-22.mp3' },
      { name: 'ווירפול מבית אלקטרה', mp3: '/audio/track-23.mp3' },
      { name: 'רשת תכשיטי רויאלטי', mp3: '/audio/track-24.mp3' },
      { name: 'גוטקס / פלפל / אוברזון', mp3: '/audio/track-25.mp3' },
    ],
  },
  {
    title: { he: 'קריינות אינפורמטיבית', en: 'Informative' },
    tracks: [
      { name: 'הפרעת קשב וריכוז בחסות חברת יאנסן', mp3: '/audio/track-26.mp3' },
      { name: 'מסרים ירוקים במעברונים לרדיו אקו 99fm', mp3: '/audio/track-27.mp3' },
      { name: 'חושבים, חיים - הרשות הלאומית לביטחון בדרכים', mp3: '/audio/track-28.mp3' },
      { name: 'מסרים תזונתיים - חלב וי של תנובה', mp3: '/audio/track-29.mp3' },
      { name: 'הביטוח הלאומי, הביטחון שלך ושלי', mp3: '/audio/track-30.mp3' },
    ],
  },
];

function AudioTrack({ track, isPlaying, onToggle }: { track: Track; isPlaying: boolean; onToggle: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    onToggle();
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(pct) ? 0 : pct);
  };

  const handleEnded = () => {
    setProgress(0);
    onToggle();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${isPlaying ? 'bg-accent/10 border-accent/30' : 'bg-surface-light/40 border-white/5 hover:border-accent/20 hover:bg-surface-light/70'}`}>
      <audio
        ref={audioRef}
        src={track.mp3}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="none"
      />
      <button
        onClick={handleToggle}
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-accent text-white' : 'bg-accent/10 text-accent hover:bg-accent/20'}`}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm mb-2 transition-colors ${isPlaying ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>
          {track.name}
        </p>
        <div
          className="w-full h-1 bg-white/10 rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-accent rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default function RadioPage() {
  const { isRtl, lang } = useLanguage();
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  const handleToggle = (mp3: string) => {
    if (playingTrack === mp3) {
      setPlayingTrack(null);
    } else {
      // Pause any currently playing track
      if (playingTrack) {
        const prevAudio = document.querySelector(`audio[src="${playingTrack}"]`) as HTMLAudioElement;
        prevAudio?.pause();
      }
      setPlayingTrack(mp3);
    }
  };

  return (
    <>
      <PageHero
        title={isRtl ? 'רדיו - פרסומות / אותות תחנה / מעברונים' : 'Radio - Commercials / Station IDs / Transitions'}
        subtitle={isRtl
          ? 'לנוחיותכם, קטעי האודיו מסודרים בנגנים לפי סגנון הקריינות, קליק אנד ליסטן.'
          : 'Audio clips organized by voice-over style for your convenience.'}
      />
      <section className="py-20 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {categories.map((category, ci) => (
              <motion.div
                key={ci}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.05 }}
              >
                <h2 className="text-xl font-bold text-accent mb-4">
                  {category.title[lang]}
                </h2>
                <div className="space-y-2">
                  {category.tracks.map((track, ti) => (
                    <motion.div
                      key={ti}
                      initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ti * 0.03 }}
                    >
                      <AudioTrack
                        track={track}
                        isPlaying={playingTrack === track.mp3}
                        onToggle={() => handleToggle(track.mp3)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
