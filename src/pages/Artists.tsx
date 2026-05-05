import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Instagram, Youtube, Music } from 'lucide-react';
import { ARTISTS } from '../constants';
import { Artist } from '../types';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export function Artists() {
  const [selectedArtist, setSelectedArtist] = useState<any | null>(null);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const q = query(collection(db, 'artists'), orderBy('name'));
        const querySnapshot = await getDocs(q);
        const fetchedArtists = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArtists(fetchedArtists.length > 0 ? fetchedArtists : ARTISTS.map(a => ({...a, specialty: a.genres.join(' • ')})));
      } catch (error) {
        console.error("Error fetching artists:", error);
        setArtists(ARTISTS.map(a => ({...a, specialty: a.genres.join(' • ')})));
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 border-b-2 border-bento-border pb-8">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">أباطرة <span className="text-bento-accent">المشهد</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl font-light">
          نخبة من فناني الراب الذين بصموا التاريخ بكلماتهم وألحانهم الفريدة.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {artists.map((artist, i) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative h-[450px] bento-card overflow-hidden cursor-pointer"
            onClick={() => setSelectedArtist(artist)}
          >
            <img
              src={artist.image}
              alt={artist.name}
              className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 transform group-hover:translate-y-[-10px] transition-transform">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-bento-accent mb-4 border-r-2 border-bento-accent pr-3">
                {artist.specialty || artist.genres?.join(' • ')}
              </div>
              <h3 className="text-4xl font-black italic uppercase leading-tight mb-2">{artist.name}</h3>
              <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100">
                <p className="text-gray-400 text-xs line-clamp-2 italic">
                  {artist.bio}
                </p>
              </div>
            </div>
            
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-bento-accent text-black p-2 font-black text-xs uppercase">عرض البروفايل</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArtist && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setSelectedArtist(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-5xl bg-bento-card border-4 border-bento-border overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-8 right-8 z-20 w-12 h-12 bg-bento-accent text-black flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-80 md:h-[600px] border-l-2 border-bento-border">
                  <img
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bento-card via-transparent to-transparent" />
                </div>
                
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <span className="text-bento-accent text-xs font-black uppercase tracking-[0.3em] mb-6 inline-block">الملف الشخصي</span>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase mb-8 leading-none tracking-tighter">{selectedArtist.name}</h2>
                  <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light italic">
                    {selectedArtist.bio}
                  </p>
                  
                  <div className="flex gap-6 mb-12 items-center">
                    <span className="text-xs font-black uppercase text-gray-600 tracking-widest">Social:</span>
                    <a href="#" className="text-white hover:text-bento-accent transition-colors"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="text-white hover:text-bento-accent transition-colors"><Youtube className="w-6 h-6" /></a>
                  </div>

                  <button className="bg-white text-black font-black py-5 text-lg uppercase tracking-widest hover:bg-bento-accent transition-colors flex items-center justify-center gap-4">
                    <Music className="w-6 h-6" />
                    أهم الإصدارات
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
