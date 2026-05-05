import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { motion, AnimatePresence } from 'motion/react';

export function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useAudio();

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-0"
        >
          <div className="h-24 bg-bento-card border-t-2 border-bento-accent flex items-center px-8 justify-between shadow-2xl">
            <div className="flex items-center gap-4 w-1/4">
              <div className="w-12 h-12 bg-bento-accent flex-shrink-0 overflow-hidden">
                 <img src={currentTrack.coverImage} alt={currentTrack.title} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-black italic truncate">{currentTrack.title}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest truncate">{currentTrack.artist}</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="flex items-center gap-8 text-xl">
                <button className="text-gray-500 hover:text-bento-accent transition-colors">
                  <SkipBack className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-full hover:bg-bento-accent transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <button className="text-gray-500 hover:text-bento-accent transition-colors">
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>
              <div className="w-1/2 h-1 bg-bento-border relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-bento-accent"
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? '100%' : '30%' }}
                  transition={{ duration: 100, ease: 'linear' }}
                />
              </div>
            </div>

            <div className="hidden md:flex w-1/4 justify-end gap-6 items-center text-[10px] font-black uppercase text-gray-500">
               <span className="hover:text-bento-accent cursor-pointer transition-colors flex items-center gap-2">
                 <ListMusic className="w-4 h-4" />
                 قائمة التشغيل
               </span>
               <div className="flex items-center gap-2">
                 <Volume2 className="w-4 h-4" />
                 <div className="w-20 h-1 bg-bento-border rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-white" />
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
