import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VoiceOver from './pages/VoiceOver';
import TV from './pages/TV';
import RadioPage from './pages/RadioPage';
import Movies from './pages/Movies';
import Dubbing from './pages/Dubbing';
import OnCamera from './pages/OnCamera';
import Acting from './pages/Acting';
import Presenting from './pages/Presenting';
import Photos from './pages/Photos';
import Web from './pages/Web';
import Contact from './pages/Contact';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/voice-over" element={<VoiceOver />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/dubbing" element={<Dubbing />} />
            <Route path="/on-camera" element={<OnCamera />} />
            <Route path="/acting" element={<Acting />} />
            <Route path="/presenting" element={<Presenting />} />
            <Route path="/pix" element={<Photos />} />
            <Route path="/web" element={<Web />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/english" element={<Home />} />
            <Route path="/extras" element={<Web />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
