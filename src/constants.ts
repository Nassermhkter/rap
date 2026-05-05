import { Artist, Track, NewsItem } from './types';

export const ARTISTS: Artist[] = [
  {
    id: '1',
    name: 'ويجز',
    bio: 'أحد أبرز رواد الراب المصري الحديث، تميز بأسلوبه الفريد ومزجه بين الموسيقى الغربية والتراث المصري.',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
    genres: ['راب مصري', 'تراب'],
  },
  {
    id: '2',
    name: 'مروان بابلو',
    bio: 'الملقب بالأب الروحي للتراب المصري، أحدث ثورة في المشهد الموسيقي عاد بعد اعتزال قصير ليتصدر القوائم.',
    image: 'https://images.unsplash.com/photo-1571675123474-13edf5029e8c?q=80&w=2070&auto=format&fit=crop',
    genres: ['تراب', 'راب'],
  },
  {
    id: '3',
    name: 'تولايت',
    bio: 'الفنان الغامض ذو القناع، استطاع في وقت قصير لفت الأنظار بموسيقاه التي تمزج بين البوب والسينث براب.',
    image: 'https://images.unsplash.com/photo-1520127877033-d9cc3208753a?q=80&w=1964&auto=format&fit=crop',
    genres: ['بوب راب', 'إيندي'],
  },
  {
    id: '4',
    name: 'زياد ظاظا',
    bio: 'صوت جديد وقوي من القاهرة، يتميز بكلماته الواقعية وتدفقاته السريعة والمبتكرة.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
    genres: ['دريل', 'راب'],
  },
];

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'البخت',
    artist: 'ويجز',
    artistId: '1',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverImage: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop',
    duration: '3:45',
  },
  {
    id: '2',
    title: 'فري',
    artist: 'مروان بابلو',
    artistId: '2',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
    duration: '3:12',
  },
  {
    id: '3',
    title: 'ماتيجي نعدي',
    artist: 'تولايت',
    artistId: '3',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverImage: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop',
    duration: '4:20',
  },
  {
    id: '4',
    title: 'دوشة',
    artist: 'زياد ظاظا',
    artistId: '4',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverImage: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
    duration: '2:58',
  },
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'ويجز يتصدر قوائم التشغيل العالمية في 2024',
    description: 'مرة أخرى يثبت ويجز جدارته بتصدر قوائم الأكثر استماعاً في الوطن العربي والعالم.',
    content: 'تفاصيل الخبر هنا حول الإنجازات والأرقام القياسية التي حققها الفنان...',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop',
    date: '5 مايو 2024',
    author: 'أحمد علي',
  },
  {
    id: '2',
    title: 'عودة مروان بابلو بألبوم جديد قريباً',
    description: 'تسريبات عن تعاونات قادمة ومفاجآت في الألبوم المنتظر المنتظر صدوره الصيف القادم.',
    content: 'المعجبون في حالة انتظار شديد بعد نشر بابلو لصورة غامضة من داخل الاستوديو...',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8d48800d1?q=80&w=1924&auto=format&fit=crop',
    date: '3 مايو 2024',
    author: 'سارة خالد',
  },
];
