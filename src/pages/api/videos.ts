import supabase from '../../../utils/supabase';

export type Video = {
  id: string;
  titel: string;
  beschrijving: string;
  images: string[];
  datum: string;
  vid_url: string;
  tags: string[];
  icon: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase.from('Videos').select('*');

  if (error) {
    throw error;
  }

  return data.map((video) => {
    const {id, titel, image, datum, vid_url, beschrijving ,tags, icon} = video;
    return {
        id, 
        titel,
        beschrijving,
	    images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        datum,
        vid_url,
        tags,
        icon,
    };
  });
}

export async function getVideo(titel: string): Promise<Video | null> {
  return (await getAllVideos()).find((video) => video.titel === titel) ?? null;
}	