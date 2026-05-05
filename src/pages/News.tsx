import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { NEWS } from '../constants';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';

export function News() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedNews = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNews(fetchedNews.length > 0 ? fetchedNews : NEWS.map(n => ({...n, content: n.description})));
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews(NEWS.map(n => ({...n, content: n.description})));
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 border-b-2 border-bento-border pb-8">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">نبض <span className="text-bento-accent">الشارع</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl font-light">
          آخر الأخبار، التقارير الحصرية، ومقابلات من قلب كواليس مشهد الراب العربي.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {news.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group cursor-pointer bento-card p-4"
          >
            <div className="relative aspect-video overflow-hidden mb-8 border-2 border-bento-border">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6 flex gap-3">
                <span className="bg-bento-accent text-black px-4 py-1.5 text-xs font-black uppercase tracking-widest">جديد</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[10px] text-gray-500 mb-4 font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2">
                <Calendar className="w-3 h-3 text-bento-accent" />
                {item.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-3 h-3 text-bento-accent" />
                بواسطة {item.author || 'RAP-X'}
              </span>
            </div>

            <h2 className="text-3xl font-black italic mb-6 leading-tight group-hover:text-bento-accent transition-colors">
              {item.title}
            </h2>
            
            <p className="text-gray-400 text-base font-light leading-relaxed mb-8 line-clamp-3 italic">
              {item.content || item.summary}
            </p>

            <button className="flex items-center gap-3 text-bento-accent font-black uppercase tracking-[0.2em] group/btn text-xs">
              <span>اقرأ المزيد</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover/btn:-translate-x-2" />
            </button>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <section className="mt-32 p-12 bg-bento-card border-2 border-bento-border relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-4xl font-black mb-6 italic uppercase tracking-tighter">لا تفوت أي <span className="text-bento-accent">تراك</span></h3>
          <p className="text-gray-400 text-lg mb-8 font-light">اشترك في نشرتنا البريدية لتصلك أحدث الإصدارات والأخبار الحصرية مباشرة على بريدك الإلكتروني.</p>
          
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="بريدك الإلكتروني..."
              className="flex-grow bg-bento-bg border-2 border-bento-border py-4 px-6 focus:outline-none focus:border-bento-accent transition-colors font-bold uppercase text-sm"
            />
            <button className="bg-bento-accent text-black font-black px-10 py-4 uppercase tracking-widest hover:bg-white transition-colors">
              اشتراك
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
