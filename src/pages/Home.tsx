import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, TrendingUp, Music as MusicIcon, Disc, Zap } from 'lucide-react';
import { TRACKS, ARTISTS } from '../constants';
import { useAudio } from '../context/AudioContext';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';

export default function Home() {
  const { playTrack } = useAudio();
  const [tracks, setTracks] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracksSnap = await getDocs(query(collection(db, 'tracks'), limit(10)));
        const fetchedTracks = tracksSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setTracks(fetchedTracks.length > 0 ? fetchedTracks : TRACKS.map(t => ({...t, artistName: t.artist})));

        const artistsSnap = await getDocs(query(collection(db, 'artists'), limit(10)));
        const fetchedArtists = artistsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setArtists(fetchedArtists.length > 0 ? fetchedArtists : ARTISTS);

        const newsSnap = await getDocs(query(collection(db, 'news'), orderBy('date', 'desc'), limit(1)));
        const fetchedNews = newsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setNews(fetchedNews);
      } catch (err) {
        console.error("Home fetch error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 pb-24 overflow-hidden">
      <div className="bento-grid min-h-[80vh]">
        {/* HERO SECTION */}
        <div className="col-span-4 lg:col-span-2 row-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-bento-border relative overflow-hidden flex flex-col justify-end p-8 min-h-[400px]">
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-black text-bento-accent px-2 py-1 text-[10px] font-bold tracking-widest border border-bento-accent">حصرياً</span>
          </div>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #CCFF00 0%, transparent 50%)' }}></div>
            <div className="h-full w-full flex items-center justify-center text-[180px] font-black opacity-10 leading-none select-none italic transform -rotate-12">
              RAP
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none mb-4 relative z-10">
            إيقاع <span className="text-bento-accent">الشارع</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-sm mb-6 relative z-10 leading-relaxed font-light">
            أكبر منصة لموسيقى الراب العربي. استكشف الفنانين الجدد وأحدث الإصدارات من قلب الثقافة.
          </p>
          <div className="flex gap-4 relative z-10">
            <button onClick={() => playTrack(tracks[0])} className="bg-white text-black px-8 py-3 font-black text-sm uppercase hover:bg-bento-accent transition-colors">استمع الآن</button>
            <Link to="/artists" className="border border-white text-white px-8 py-3 font-black text-sm uppercase hover:bg-white/10 transition-colors flex items-center justify-center">اكتشف</Link>
          </div>
        </div>

        {/* LATEST RELEASES */}
        <div className="col-span-4 lg:col-span-1 row-span-2 bg-bento-card border-2 border-bento-border flex flex-col p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6 border-b border-bento-border pb-2">
            <h2 className="font-black text-xl italic uppercase">أحدث الأغاني</h2>
            <Link to="/music" className="text-[10px] text-bento-accent font-bold uppercase hover:underline">الكل</Link>
          </div>
          <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                onClick={() => playTrack(track)}
                className="flex items-center gap-4 bg-bento-active p-2 border-r-2 border-transparent hover:border-bento-accent cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 bg-bento-border flex-shrink-0 overflow-hidden">
                  <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="font-bold truncate text-sm">{track.title}</div>
                  <div className="text-[10px] text-gray-500 uppercase">{track.artistName || track.artist}</div>
                </div>
                <div className="text-bento-accent text-xs font-mono">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>

        {/* NEWS PREVIEW */}
        <Link to="/news" className="col-span-2 lg:col-span-1 row-span-1 bg-bento-accent text-black p-6 flex flex-col justify-between group cursor-pointer overflow-hidden shadow-bento hover:shadow-2xl transition-all">
          <div className="flex justify-between items-start">
            <h2 className="font-black text-2xl leading-none uppercase italic">آخر<br/>الأخبار</h2>
            <div className="text-3xl animate-pulse">⚡</div>
          </div>
          <div>
            <p className="font-bold text-sm mb-2 leading-tight uppercase line-clamp-2">
              {news[0]?.title || 'إلغاء حفل "البيج" في القاهرة لأسباب أمنية'}
            </p>
            <div className="text-[10px] font-black underline cursor-pointer hover:no-underline uppercase">اقرأ المزيد</div>
          </div>
        </Link>

        {/* SOCIALS */}
        <div className="col-span-2 lg:col-span-1 row-span-1 bg-bento-card border-2 border-bento-border p-6 flex flex-col justify-center items-center gap-2">
          <div className="text-bento-accent font-black text-[10px] uppercase mb-2 tracking-widest">تواصل معنا</div>
          <div className="flex gap-4 mb-4">
            <div className="w-10 h-10 border border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all cursor-pointer font-bold text-xs">IG</div>
            <div className="w-10 h-10 border border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all cursor-pointer font-bold text-xs">YT</div>
            <div className="w-10 h-10 border border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all cursor-pointer font-bold text-xs">X</div>
          </div>
          <div className="text-[10px] text-gray-500 font-mono">HELLO@RAP-X.COM</div>
        </div>

        {/* ARTISTS PREVIEW (BOTTOM) */}
        <div className="col-span-4 row-span-1 bg-bento-card border-2 border-bento-border flex items-center px-8 gap-8 overflow-x-auto scrollbar-hide">
          <div className="flex-shrink-0">
            <h2 className="font-black text-2xl italic text-bento-border uppercase">الفنانين</h2>
          </div>
          <div className="flex flex-1 justify-around items-center min-w-[600px] gap-8">
            {artists.map(artist => (
              <Link key={artist.id} to="/artists" className="flex flex-col items-center group flex-shrink-0">
                <div className="w-20 h-20 rounded-full border-4 border-transparent group-hover:border-bento-accent transition-all mb-2 overflow-hidden bg-bento-border">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter group-hover:text-bento-accent">{artist.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
