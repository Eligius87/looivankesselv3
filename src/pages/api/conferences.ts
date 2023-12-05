import supabase from '../../../utils/supabase';

export type Conference = {
  id: string;
  titel: string;
  beschrijving: string;
  images: string[];
  datum: string;
  url: string;
  tags: string[];
  icon: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllConferences(): Promise<Conference[]> {
  const { data, error } = await supabase.from('Conferences').select('*');

  if (error) {
    throw error;
  }

  return data.map((podcast) => {
    const {id, titel, image, datum, url, beschrijving ,tags, icon} = Conference;
    return {
        id, 
        titel,
        beschrijving,
	    images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        datum,
        url,
        tags,
        icon,
    };
  });
}

export async function getConference(titel: string): Promise<Conference | null> {
  return (await getAllConferences()).find((Conference) => Conference.titel === titel) ?? null;
}	