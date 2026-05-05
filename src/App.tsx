import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AudioPlayer } from './components/player/AudioPlayer';

// Lazy load pages
import Home from './pages/Home';
import { Artists } from './pages/Artists';
import { Music } from './pages/Music';
import { News } from './pages/News';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <AudioProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-sans text-white">
          <Navbar />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/music" element={<Music />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <AudioPlayer />
        </div>
      </Router>
    </AudioProvider>
  );
}
