import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Edit2, Music, Users, Newspaper, Shield, LogOut } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { cn } from '../lib/utils';

// Helper for admin check
const ADMIN_EMAIL = 'nassermokhter50@gmail.com';

export function Admin() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tracks' | 'artists' | 'news'>('tracks');
  
  // Data states
  const [tracks, setTracks] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      if (u && u.email === ADMIN_EMAIL) {
        fetchData();
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const tracksSnap = await getDocs(query(collection(db, 'tracks'), orderBy('title')));
      setTracks(tracksSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const artistsSnap = await getDocs(query(collection(db, 'artists'), orderBy('name')));
      setArtists(artistsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const newsSnap = await getDocs(query(collection(db, 'news'), orderBy('date', 'desc')));
      setNews(newsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => signOut(auth);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-bento-bg text-bento-accent text-2xl font-black italic">RAP-X LOADING...</div>;

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bento-bg px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card p-12 max-w-md w-full text-center"
        >
          <Shield className="w-16 h-16 text-bento-accent mx-auto mb-6" />
          <h1 className="text-4xl font-black italic mb-4">منطقة محظورة</h1>
          <p className="text-gray-400 mb-8 font-light">يجب أن تكون مسؤولاً للوصول إلى هذه الصفحة.</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-bento-accent text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-colors"
          >
            دخول المسؤول
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bento-bg pt-24 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b-2 border-bento-border pb-8">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">لوحة <span className="text-bento-accent">التحكم</span></h1>
            <p className="text-gray-500 uppercase tracking-[0.3em] font-bold text-xs mt-2">مرحباً، {user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-black uppercase text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> تسجيل الخروج
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <aside className="space-y-4">
            <TabButton 
              active={activeTab === 'tracks'} 
              onClick={() => setActiveTab('tracks')}
              icon={<Music className="w-5 h-5" />}
              label="الأغاني"
              count={tracks.length}
            />
            <TabButton 
              active={activeTab === 'artists'} 
              onClick={() => setActiveTab('artists')}
              icon={<Users className="w-5 h-5" />}
              label="الفنانين"
              count={artists.length}
            />
            <TabButton 
              active={activeTab === 'news'} 
              onClick={() => setActiveTab('news')}
              icon={<Newspaper className="w-5 h-5" />}
              label="الأخبار"
              count={news.length}
            />
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-3">
            <div className="bg-bento-card border-2 border-bento-border p-8">
               {activeTab === 'tracks' && <ManagerSection title="إدارة الأغاني" items={tracks} type="tracks" onRefresh={fetchData} />}
               {activeTab === 'artists' && <ManagerSection title="إدارة الفنانين" items={artists} type="artists" onRefresh={fetchData} />}
               {activeTab === 'news' && <ManagerSection title="إدارة الأخبار" items={news} type="news" onRefresh={fetchData} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, count }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 border-2 transition-all font-black uppercase tracking-widest text-sm",
        active ? "bg-bento-accent text-black border-bento-accent" : "bg-bento-card text-gray-500 border-bento-border hover:border-gray-600"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      <span className="text-xs opacity-50">{count}</span>
    </button>
  );
}

function ManagerSection({ title, items, type, onRefresh }: any) {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await deleteDoc(doc(db, type, id));
      onRefresh();
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${type}/${id}`);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black italic">{title}</h2>
        <button 
          onClick={() => { setEditingItem(null); setShowForm(true); }}
          className="bg-bento-accent text-black p-2 hover:bg-white transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {showForm ? (
        <div className="mb-12">
            <Form 
              type={type} 
              editItem={editingItem} 
              onClose={() => setShowForm(false)} 
              onSuccess={() => { setShowForm(false); onRefresh(); }} 
            />
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-bento-border hover:bg-bento-bg/50 transition-colors">
              <div className="flex items-center gap-4">
                {item.image || item.coverImage ? (
                  <img src={item.image || item.coverImage} className="w-12 h-12 object-cover border border-bento-border" alt="" />
                ) : (
                  <div className="w-12 h-12 bg-bento-border flex items-center justify-center">
                    <Music className="w-6 h-6 text-gray-600" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold">{item.name || item.title}</h4>
                  <p className="text-xs text-gray-500 uppercase">{item.specialty || item.artistName || item.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => { setEditingItem(item); setShowForm(true); }}
                  className="p-2 text-gray-500 hover:text-bento-accent transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-12 text-center text-gray-600 font-bold uppercase tracking-widest border-2 border-dashed border-bento-border">
              لا يوجد بيانات حالياً
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Form({ type, editItem, onClose, onSuccess }: any) {
  const [formData, setFormData] = useState(editItem || {});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editItem) {
        await updateDoc(doc(db, type, editItem.id), formData);
      } else {
        await addDoc(collection(db, type), {
          ...formData,
          createdAt: new Date().toISOString(),
          date: new Date().toLocaleDateString('ar-EG'),
        });
      }
      onSuccess();
    } catch (err) {
      handleFirestoreError(err, editItem ? OperationType.UPDATE : OperationType.CREATE, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-bento-bg p-8 border border-bento-border">
      {type === 'tracks' && (
        <>
          <InputField label="العنوان" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} />
          <InputField label="اسم الفنان" value={formData.artistName} onChange={(v) => setFormData({...formData, artistName: v})} />
          <InputField label="رابط الغلاف (URL)" value={formData.coverImage} onChange={(v) => setFormData({...formData, coverImage: v})} />
          <InputField label="رابط الصوت (URL)" value={formData.audioUrl} onChange={(v) => setFormData({...formData, audioUrl: v})} />
          <InputField label="المدة (مثال 3:45)" value={formData.duration} onChange={(v) => setFormData({...formData, duration: v})} />
        </>
      )}

      {type === 'artists' && (
        <>
          <InputField label="الاسم" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
          <InputField label="رابط الصورة (URL)" value={formData.image} onChange={(v) => setFormData({...formData, image: v})} />
          <InputField label="التخصص" value={formData.specialty} onChange={(v) => setFormData({...formData, specialty: v})} />
          <textarea 
            placeholder="السيرة الذاتية"
            className="w-full bg-bento-card border-2 border-bento-border p-4 outline-none focus:border-bento-accent font-bold"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            rows={4}
          />
        </>
      )}

      {type === 'news' && (
        <>
          <InputField label="العنوان" value={formData.title} onChange={(v) => setFormData({...formData, title: v})} />
          <InputField label="رابط الصورة (URL)" value={formData.image} onChange={(v) => setFormData({...formData, image: v})} />
          <InputField label="الفئة" value={formData.category} onChange={(v) => setFormData({...formData, category: v})} />
          <textarea 
            placeholder="المحتوى"
            className="w-full bg-bento-card border-2 border-bento-border p-4 outline-none focus:border-bento-accent font-bold"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            rows={6}
          />
        </>
      )}

      <div className="flex gap-4 pt-4">
        <button type="submit" className="flex-1 bg-bento-accent text-black font-black py-4 uppercase tracking-widest hover:bg-white transition-colors">
          حفظ
        </button>
        <button type="button" onClick={onClose} className="flex-1 border-2 border-bento-border text-gray-500 font-black py-4 uppercase tracking-widest hover:bg-white/5 transition-colors">
          إلغاء
        </button>
      </div>
    </form>
  );
}

function InputField({ label, value, onChange }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">{label}</label>
      <input 
        required
        type="text"
        className="w-full bg-bento-card border-2 border-bento-border p-4 outline-none focus:border-bento-accent transition-colors font-bold"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
