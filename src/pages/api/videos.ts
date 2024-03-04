import supabase from '../../../utils/supabase';

export type Video = {
  id: string;
  titel: string;
  image: string;
  datum: string;
  vid_url: string;
  tags: string[];
  icon: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllVideos(lang: any): Promise<Video[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Videos').select('*');

  if (error) {
    throw error;
  }

  return data.map((video) => {
    const {id, titel, image, datum, vid_url, tags, icon, titel_EN} = video;
    return {
        id, 
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        image: BASE_FILE_STORAGE_URL + image,
        datum,
        vid_url,
        tags,
        icon,
    };
  });
}

export async function getVideo(titel: string, lang: any): Promise<Video | null> {
  return (await getAllVideos(lang)).find((video) => video.titel === titel) ?? null;
}	