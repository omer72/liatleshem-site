import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const { t, toggleLang, isRtl } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-accent'
        : 'text-white/80 hover:text-white'
    }`;

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-accent transition-colors">
            {isRtl ? 'ליאת לשם' : 'Liat Leshem'}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={linkClass('/')}>
              {t.nav.home}
            </Link>

            {/* Voice-Over Dropdown */}
            <div className="relative" onMouseEnter={() => setVoiceOpen(true)} onMouseLeave={() => setVoiceOpen(false)}>
              <Link to="/voice-over" className={`${linkClass('/voice-over')} flex items-center gap-1`}>
                {t.nav.voiceover}
                <ChevronDown size={14} className={`transition-transform ${voiceOpen ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {voiceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1 bg-surface-light/95 backdrop-blur-xl rounded-lg border border-white/10 py-2 min-w-[160px] shadow-2xl"
                    style={{ [isRtl ? 'right' : 'left']: 0 }}
                  >
                    <Link to="/tv" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setVoiceOpen(false)}>{t.nav.tv}</Link>
                    <Link to="/radio" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setVoiceOpen(false)}>{t.nav.radio}</Link>
                    <Link to="/movies" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setVoiceOpen(false)}>{t.nav.corporate}</Link>
                    <Link to="/dubbing" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setVoiceOpen(false)}>{t.nav.dubbing}</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* On-Camera Dropdown */}
            <div className="relative" onMouseEnter={() => setCameraOpen(true)} onMouseLeave={() => setCameraOpen(false)}>
              <Link to="/on-camera" className={`${linkClass('/on-camera')} flex items-center gap-1`}>
                {t.nav.oncamera}
                <ChevronDown size={14} className={`transition-transform ${cameraOpen ? 'rotate-180' : ''}`} />
              </Link>
              <AnimatePresence>
                {cameraOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-1 bg-surface-light/95 backdrop-blur-xl rounded-lg border border-white/10 py-2 min-w-[160px] shadow-2xl"
                    style={{ [isRtl ? 'right' : 'left']: 0 }}
                  >
                    <Link to="/acting" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setCameraOpen(false)}>{t.nav.acting}</Link>
                    <Link to="/presenting" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setCameraOpen(false)}>{t.nav.presenting}</Link>
                    <Link to="/pix" className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setCameraOpen(false)}>{t.nav.photos}</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/web" className={linkClass('/web')}>
              {t.nav.web}
            </Link>
            <Link to="/contact" className={linkClass('/contact')}>
              {t.nav.contact}
            </Link>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/60 hover:text-white border border-white/10 rounded-full hover:border-white/30 transition-all ms-2"
            >
              <Globe size={14} />
              {t.nav.langSwitch}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <Link to="/" className="block py-2 text-white/80 hover:text-white" onClick={closeMobile}>{t.nav.home}</Link>
              <div className="text-xs text-white/40 uppercase tracking-wider pt-2 pb-1">{t.nav.voiceover}</div>
              <Link to="/tv" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.tv}</Link>
              <Link to="/radio" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.radio}</Link>
              <Link to="/movies" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.corporate}</Link>
              <Link to="/dubbing" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.dubbing}</Link>
              <div className="text-xs text-white/40 uppercase tracking-wider pt-2 pb-1">{t.nav.oncamera}</div>
              <Link to="/acting" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.acting}</Link>
              <Link to="/presenting" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.presenting}</Link>
              <Link to="/pix" className="block py-2 ps-4 text-white/60 hover:text-white" onClick={closeMobile}>{t.nav.photos}</Link>
              <Link to="/web" className="block py-2 text-white/80 hover:text-white" onClick={closeMobile}>{t.nav.web}</Link>
              <Link to="/contact" className="block py-2 text-white/80 hover:text-white" onClick={closeMobile}>{t.nav.contact}</Link>
              <button onClick={() => { toggleLang(); closeMobile(); }} className="flex items-center gap-2 py-2 text-white/60 hover:text-white">
                <Globe size={16} /> {t.nav.langSwitch}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
