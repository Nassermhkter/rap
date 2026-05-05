import { Link, useLocation } from 'react-router-dom';
import { Music, Users, Home, Newspaper, Send, Play, UserCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const navItems = [
  { path: '/', label: 'الرئيسية', icon: Home },
  { path: '/artists', label: 'الفنانين', icon: Users },
  { path: '/music', label: 'الأغاني', icon: Music },
  { path: '/news', label: 'الأخبار', icon: Newspaper },
  { path: '/contact', label: 'تواصل معنا', icon: Send },
];

const ADMIN_EMAIL = 'nassermokhter50@gmail.com';

export function Navbar() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setShowLogin(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] bg-bento-bg/90 backdrop-blur-md border-b-2 border-bento-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="text-2xl font-black italic tracking-tighter text-bento-accent border-2 border-bento-accent px-3 py-1 bg-black">
              راب-إكس
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 font-bold text-sm uppercase">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "transition-colors",
                    isActive ? "text-bento-accent underline underline-offset-4 decoration-2" : "text-white/70 hover:text-bento-accent"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {user?.email === ADMIN_EMAIL && (
              <Link 
                to="/admin" 
                className={cn(
                  "text-bento-accent border-bento-accent border px-3 py-1 bg-bento-accent/10 hover:bg-bento-accent hover:text-black transition-all",
                  location.pathname === '/admin' && "bg-bento-accent text-black"
                )}
              >
                المسؤول
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-[10px] font-black uppercase text-gray-500 hidden sm:block">
                  {user.displayName || user.email}
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 text-xs font-bold transition-all"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-bento-accent text-black font-black px-6 py-2 text-xs uppercase hover:bg-white transition-all border border-bento-accent"
              >
                دخول
              </button>
            )}
          </div>
        </div>

        {/* Mobile Nav Trigger (Bottom Scrollable) */}
        <div className="lg:hidden mt-4 flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "whitespace-nowrap text-xs px-4 py-1.5 border-2 transition-all font-bold uppercase",
                  isActive ? "bg-bento-accent text-black border-bento-accent" : "text-white/70 border-bento-border bg-bento-card"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          {user?.email === ADMIN_EMAIL && (
            <Link
              to="/admin"
              className={cn(
                "whitespace-nowrap text-xs px-4 py-1.5 border-2 transition-all font-bold uppercase",
                location.pathname === '/admin' ? "bg-bento-accent text-black border-bento-accent" : "text-bento-accent border-bento-accent bg-black"
              )}
            >
              المسؤول
            </Link>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/95 backdrop-blur-sm"
               onClick={() => setShowLogin(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md bg-bento-card border-2 border-bento-accent rounded-none p-10 shadow-2xl shadow-bento"
            >
              <h2 className="text-4xl font-black italic uppercase mb-2">الدخول</h2>
              <p className="text-white/50 text-xs mb-8 tracking-widest uppercase">انضم لثقافة الشارع العربي</p>
              
              <div className="space-y-6">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-white text-black font-black py-3 text-sm uppercase flex items-center justify-center gap-3"
                >
                  <Play className="w-4 h-4 fill-current" />
                  جوجل
                </button>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-bento-border"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold"><span className="bg-bento-card px-2 text-white/30 tracking-widest">أو</span></div>
                </div>
                <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-bento-bg border-2 border-bento-border p-3 outline-none focus:border-bento-accent transition-colors" />
                <input type="password" placeholder="كلمة المرور" className="w-full bg-bento-bg border-2 border-bento-border p-3 outline-none focus:border-bento-accent transition-colors" />
                <button className="w-full bg-bento-accent text-black font-black py-4 uppercase tracking-tighter text-lg">ارسال</button>
              </div>
              
              <p className="mt-8 text-center text-xs text-white/30 font-bold uppercase tracking-widest">
                ليس لديك حساب؟ <a href="#" className="text-bento-accent underline">سجل الآن</a>
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
