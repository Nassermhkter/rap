import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail, Instagram, Twitter, Youtube } from 'lucide-react';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم استلام رسالتك! ابقَ حقيقياً.');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      <header className="mb-16 border-b-2 border-bento-border pb-8">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase mb-4 tracking-tighter">اترك <span className="text-bento-accent">أثراً</span></h1>
        <p className="text-gray-400 text-lg max-w-2xl font-light">
          للتعاون، الاستفسارات، أو إرسال ديمو خاص بك. نحن في قلب الحدث.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bento-card p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">اسم المستخدم</label>
              <input
                required
                type="text"
                placeholder="أدخل اسمك..."
                className="w-full bg-bento-bg border-2 border-bento-border p-4 outline-none focus:border-bento-accent transition-colors font-bold uppercase text-sm"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">البريد الإلكتروني</label>
              <input
                required
                type="email"
                placeholder="EMAIL@EXAMPLE.COM"
                className="w-full bg-bento-bg border-2 border-bento-border p-4 outline-none focus:border-bento-accent transition-colors font-bold uppercase text-sm"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">الرسالة</label>
              <textarea
                required
                rows={5}
                placeholder="اكتب هنا..."
                className="w-full bg-bento-bg border-2 border-bento-border p-4 outline-none focus:border-bento-accent transition-colors resize-none font-bold text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-bento-accent text-black font-black py-5 uppercase tracking-[0.2em] hover:bg-white transition-colors text-lg"
            >
              إرسال
            </button>
          </form>
        </motion.div>

        {/* Info & Socials */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
             <div className="bento-card p-8 flex flex-col justify-center items-center text-center">
                <MapPin className="w-8 h-8 text-bento-accent mb-4" />
                <h4 className="font-black italic uppercase text-xs mb-2">الموقع</h4>
                <p className="text-gray-500 text-[10px] font-bold">القاهرة، مصر</p>
             </div>
             <div className="bento-card p-8 flex flex-col justify-center items-center text-center">
                <Mail className="w-8 h-8 text-bento-accent mb-4" />
                <h4 className="font-black italic uppercase text-xs mb-2">رسمي</h4>
                <p className="text-gray-500 text-[10px] font-bold">HELLO@RAP-X.COM</p>
             </div>
          </div>

          <div className="bento-card p-10 flex-1">
            <h4 className="text-3xl font-black italic uppercase mb-8 border-r-4 border-bento-accent pr-6 leading-none">مواقعنا</h4>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="w-16 h-16 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-black text-xl">IG</a>
              <a href="#" className="w-16 h-16 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-black text-xl">X</a>
              <a href="#" className="w-16 h-16 border-2 border-bento-border flex items-center justify-center hover:border-bento-accent hover:text-bento-accent transition-all font-black text-xl">YT</a>
            </div>
            
            <div className="mt-12 relative h-32 opacity-10 flex items-center justify-center">
               <div className="text-8xl font-black italic tracking-tighter select-none">EST 2024</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
