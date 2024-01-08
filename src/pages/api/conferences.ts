import supabase from '../../../utils/supabase';

export type Lezing = {
  id: string;
  titel: string;
  beschrijving: string;
  image: string;
  datum: string;
  url: string;
  tags: string[];
  icon: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllLezingen(): Promise<Lezing[]> {
  const { data, error } = await supabase.from('Lezingen').select('*');

  if (error) {
    throw error;
  }

  return data.map((lezing) => {
    const {id, titel, image, datum, url, beschrijving ,tags, icon} = lezing;
    return {
        id, 
        titel,
        beschrijving,
        image: BASE_FILE_STORAGE_URL + image,
        datum,
        url,
        tags,
        icon,
    };
  });
}

export async function getLezing(titel: string): Promise<Lezing | null> {
  return (await getAllLezingen()).find((lezing) => lezing.titel === titel) ?? null;
}	