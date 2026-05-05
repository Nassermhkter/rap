export interface Artist {
  id: string;
  name: string;
  bio: string;
  image: string;
  genres: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  audioUrl: string;
  coverImage: string;
  duration: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  author: string;
}
