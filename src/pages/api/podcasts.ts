import supabase from '../../../utils/supabase';

export type Podcast = {
  id: string;
  titel: string;
  images: string[];
  datum: string;
  url: string;
  tags: string[];
  icon: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPodcasts(lang: any): Promise<Podcast[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Podcasts').select('*').order('datum', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((podcast) => {
    const {id, titel, image, datum, url, tags, icon, titel_EN} = podcast;
    return {
        id, 
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        datum,
        url,
        tags,
        icon,
    };
  });
}

export async function getPodcast(titel: string, lang: any): Promise<Podcast | null> {
  return (await getAllPodcasts(lang)).find((podcast) => podcast.titel === titel) ?? null;
}	