import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-bento-bg border-t-2 border-bento-border pt-16 pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-4xl font-black italic tracking-tighter text-bento-accent border-2 border-bento-accent px-4 py-2 bg-black inline-block mb-8">
            إيقاع الراب
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed font-light italic">
            المنصة الأولى لثقافة الهيب هوب في الوطن العربي. نحن نصنع التاريخ، ونوثق الرحلة، وندعم المواهب التي تعيد تعريف الموسيقى.
          </p>
          <div className="flex gap-4 mt-8">
            <a href="#" className="w-12 h-12 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-bold">IG</a>
            <a href="#" className="w-12 h-12 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-bold">TW</a>
            <a href="#" className="w-12 h-12 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-bold">YT</a>
          </div>
        </div>

        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-600 mb-8 border-r-2 border-bento-accent pr-4">روابط سريعة</h4>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            <li><a href="/" className="hover:text-bento-accent transition-colors">الرئيسية</a></li>
            <li><a href="/artists" className="hover:text-bento-accent transition-colors">الفنانين</a></li>
            <li><a href="/music" className="hover:text-bento-accent transition-colors">الأغاني</a></li>
            <li><a href="/news" className="hover:text-bento-accent transition-colors">الأخبار</a></li>
          </ul>
        </div>

        <div>
           <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-600 mb-8 border-r-2 border-bento-accent pr-4">التواصل</h4>
           <div className="space-y-4 text-sm font-bold text-gray-400">
              <p className="hover:text-white transition-colors cursor-pointer">INFO@RAP-X.COM</p>
              <p className="hover:text-white transition-colors cursor-pointer">+20 100 000 000</p>
           </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-bento-border text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">© 2024 RAP-X CULTURE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
