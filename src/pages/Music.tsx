import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Search, ListMusic, Clock } from 'lucide-react';
import { TRACKS } from '../constants';
import { useAudio } from '../context/AudioContext';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export function Music() {
  const { currentTrack, isPlaying, playTrack } = useAudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const q = query(collection(db, 'tracks'), orderBy('title'));
        const querySnapshot = await getDocs(q);
        const fetchedTracks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // If firestore has data, use it; otherwise fallback to constants
        setTracks(fetchedTracks.length > 0 ? fetchedTracks : TRACKS.map(t => ({...t, artistName: t.artist})));
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setTracks(TRACKS.map(t => ({...t, artistName: t.artist})));
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  const filteredTracks = tracks.filter(track => 
    (track.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (track.artistName || track.artist || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b-2 border-bento-border pb-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">مكتبة <span className="text-bento-accent">الصوت</span></h1>
          <p className="text-gray-400 text-lg max-w-xl font-light">
            استكشف أحدث الإصدارات، الكلاسيكيات، والتراكات الحصرية من قلب الشارع.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-bento-accent w-5 h-5" />
          <input
            type="text"
            placeholder="ابحث..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bento-card border-2 border-bento-border rounded-none py-4 pr-12 pl-6 focus:outline-none focus:border-bento-accent transition-all uppercase font-bold text-sm tracking-widest"
          />
        </div>
      </header>

      <div className="bg-bento-card border-2 border-bento-border">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-10 py-6 border-b-2 border-bento-border text-xs font-black uppercase tracking-[0.3em] text-gray-500">
          <div className="col-span-1">#</div>
          <div className="col-span-6">العنوان</div>
          <div className="col-span-3">الفنان</div>
          <div className="col-span-2 text-left flex items-center justify-end gap-2"><Clock className="w-4 h-4" /> الوقت</div>
        </div>

        {/* Track List */}
        <div className="flex flex-col">
          {filteredTracks.map((track, i) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 px-8 md:px-10 py-6 items-center cursor-pointer transition-all group border-b border-bento-border last:border-0 ${
                  isCurrent ? 'bg-bento-active border-r-4 border-r-bento-accent' : 'hover:bg-bento-active'
                }`}
                onClick={() => playTrack(track)}
              >
                <div className="hidden md:block col-span-1 text-gray-500 font-mono text-sm">
                  {isCurrent && isPlaying ? (
                    <div className="flex items-center gap-0.5 h-4">
                      <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-bento-accent" />
                      <motion.div animate={{ height: [16, 4, 16] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 bg-bento-accent" />
                      <motion.div animate={{ height: [8, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 bg-bento-accent" />
                    </div>
                  ) : (
                    String(i + 1).padStart(2, '0')
                  )}
                </div>

                <div className="col-span-11 md:col-span-6 flex items-center gap-6">
                  <div className="relative w-14 h-14 bg-bento-border flex-shrink-0 border border-bento-border overflow-hidden">
                    <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {isCurrent && isPlaying ? (
                        <Pause className="w-6 h-6 text-bento-accent fill-current" />
                      ) : (
                        <Play className="w-6 h-6 text-bento-accent fill-current" />
                      )}
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <h4 className={`text-xl font-black italic uppercase truncate ${isCurrent ? 'text-bento-accent' : ''}`}>{track.title}</h4>
                    <p className="text-xs text-gray-500 uppercase md:hidden tracking-widest">{track.artist}</p>
                  </div>
                </div>

                <div className={`hidden md:block col-span-3 text-sm font-bold uppercase tracking-widest ${isCurrent ? 'text-bento-accent' : 'text-gray-400'}`}>
                  {track.artist}
                </div>

                <div className="hidden md:block col-span-2 text-left font-mono text-gray-500 text-sm">
                  {track.duration}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredTracks.length === 0 && (
          <div className="p-32 text-center">
            <ListMusic className="w-20 h-20 text-bento-border mx-auto mb-6" />
            <p className="text-gray-600 font-black italic uppercase tracking-[0.2em]">لم يتم العثور على نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
}
