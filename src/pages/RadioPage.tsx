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
      { name: 'קק"ל מזמינה אתכם לטייל', mp3: 'https://music.wixstatic.com/mp3/65ce29_4fbd3a955b8048a5be7334a503c9b336.mp3' },
      { name: 'אותות תחנה לרדיו חיפה (עם גיל קומר והראל סלוצקי)', mp3: 'https://music.wixstatic.com/mp3/65ce29_23fee3436eb84539a2fdd1eb0b421d4b.mp3' },
      { name: 'רשות הטבע והגנים', mp3: 'https://music.wixstatic.com/mp3/65ce29_ff32e29e0ec14e6b87ee2f364616f2b1.mp3' },
      { name: 'פיאט 500', mp3: 'https://music.wixstatic.com/mp3/65ce29_f208c0e7435f4a58b47388a2c007afa4.mp3' },
      { name: 'דלונגי דרגון מבית ניופאן', mp3: 'https://music.wixstatic.com/mp3/65ce29_a801f60cc25443f9aa5bd8788cb3ba0f.mp3' },
    ],
  },
  {
    title: { he: 'קריינות משוחקת', en: 'Dramatic / Playful' },
    tracks: [
      { name: 'סלקום (עם עודד דוידוב)', mp3: 'https://music.wixstatic.com/mp3/65ce29_4d7462e3ae17466d9e7ddde2f26cd45a.mp3' },
      { name: 'המשביר לצרכן (עם גל נדיבי)', mp3: 'https://music.wixstatic.com/mp3/65ce29_2efb09e37f2c4d24ad52b30b6c3b3c21.mp3' },
      { name: 'הוט טריפל + הוט מובייל (עם נעם אבירם)', mp3: 'https://music.wixstatic.com/mp3/65ce29_fa4acbe79ba0443a8032027fce4799cc.mp3' },
      { name: 'רוטס HR, אני קלודין (עם סנדרה רינגלר וזיו תדהר)', mp3: 'https://music.wixstatic.com/mp3/65ce29_e7453ac032c34ae785296ea5c7a8ed80.mp3' },
      { name: 'סבוקלם (עם גדי לוי, אלון זמק ונעם אבירם)', mp3: 'https://music.wixstatic.com/mp3/65ce29_9c6d403bf1b14800869f3a4ca6e7dc8e.mp3' },
    ],
  },
  {
    title: { he: 'קריינות דידקטית', en: 'Didactic / Informative' },
    tracks: [
      { name: 'תשדירי מידע בנושא אוסטיאופורוזיס', mp3: 'https://music.wixstatic.com/mp3/65ce29_2abae3ef9abb45239f8e8fbefac9d1b7.mp3' },
      { name: 'מבצע אכיפה של משטרת התנועה (עם רפי גינת)', mp3: 'https://music.wixstatic.com/mp3/65ce29_75e0ebed0a9c498ba4e81eb0a20c8c1d.mp3' },
      { name: 'משרד התמ"ת, אכיפת חוק הטרדה מינית', mp3: 'https://music.wixstatic.com/mp3/65ce29_2bff7464bab446b690b1e9697f28da98.mp3' },
      { name: 'מימון ישיר (עם שמוליק לוי ונעם אבירם)', mp3: 'https://music.wixstatic.com/mp3/65ce29_d309438fadcd417e9d67c3aa97407894.mp3' },
      { name: 'האקדמית ת"א יפו (מתחיל דידקטי ממשיך שמייח)', mp3: 'https://music.wixstatic.com/mp3/65ce29_b595331708014fe8acb036b1967ed69b.mp3' },
    ],
  },
  {
    title: { he: 'קריינות רכה', en: 'Soft' },
    tracks: [
      { name: 'פזגז (עם יואב יפת)', mp3: 'https://music.wixstatic.com/mp3/65ce29_87717951d32148feb53478be00222031.mp3' },
      { name: 'תדר חדש ל-88fm באילת', mp3: 'https://music.wixstatic.com/mp3/65ce29_08970b2d17394d25a95ccea54a461c18.mp3' },
      { name: 'פרומו יום האישה ב-88fm', mp3: 'https://music.wixstatic.com/mp3/65ce29_873a41c89f0e4e9a868de09e153cf70e.mp3' },
      { name: 'סימילאק (עם יואב יפת)', mp3: 'https://music.wixstatic.com/mp3/65ce29_4a8a66a4870f487d8f19a2201e804c9c.mp3' },
      { name: 'משרד הבינוי והשיכון', mp3: 'https://music.wixstatic.com/mp3/65ce29_292daadbfffd45778365611ca3964a02.mp3' },
    ],
  },
  {
    title: { he: 'קריינות מכירתית', en: 'Commercial / Sales' },
    tracks: [
      { name: 'סקודה בתוכנית הבוקר של רדיו ת"א 102fm', mp3: 'https://music.wixstatic.com/mp3/65ce29_408f06a5dbab443ea98944b55db084af.mp3' },
      { name: 'yes חוויה קולנועית גדולה מהחיים', mp3: 'https://music.wixstatic.com/mp3/65ce29_01da3616c67540dd8d2386bcad14958f.mp3' },
      { name: 'ווירפול מבית אלקטרה', mp3: 'https://music.wixstatic.com/mp3/65ce29_a0425e4422e74781abae5037d0e79b2a.mp3' },
      { name: 'רשת תכשיטי רויאלטי', mp3: 'https://music.wixstatic.com/mp3/65ce29_01233beb57cc41d1b09815c1858dd693.mp3' },
      { name: 'גוטקס / פלפל / אוברזון', mp3: 'https://music.wixstatic.com/mp3/65ce29_efe7215f9e304b47baca099ed5ac7b18.mp3' },
    ],
  },
  {
    title: { he: 'קריינות אינפורמטיבית', en: 'Informative' },
    tracks: [
      { name: 'הפרעת קשב וריכוז בחסות חברת יאנסן', mp3: 'https://music.wixstatic.com/mp3/65ce29_ffab9493ae3049de8dfac044207e91d7.mp3' },
      { name: 'מסרים ירוקים במעברונים לרדיו אקו 99fm', mp3: 'https://music.wixstatic.com/mp3/65ce29_33f942d975b34d7a89163f8bbcf817fb.mp3' },
      { name: 'חושבים, חיים - הרשות הלאומית לביטחון בדרכים', mp3: 'https://music.wixstatic.com/mp3/65ce29_e87450c71026412290e0b936d25f4197.mp3' },
      { name: 'מסרים תזונתיים - חלב וי של תנובה', mp3: 'https://music.wixstatic.com/mp3/65ce29_2d2a20e1d017466887a9c8f4763c81ce.mp3' },
      { name: 'הביטוח הלאומי, הביטחון שלך ושלי', mp3: 'https://music.wixstatic.com/mp3/65ce29_af8ad499ce8249deb38c543da229e85c.mp3' },
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
