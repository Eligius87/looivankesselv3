import supabase from '../../../utils/supabase';

export type Lezingen = {
  id: string;
  titel: string;
  datum: string;
  url: string;
  beschrijving: string;
  tags: string[];
  icon: string;
  type: string;
  image: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllLezingen(): Promise<Lezingen[]> {
  const { data, error } = await supabase.from('Lezingen').select('*').order('datum', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((lezing) => {
    const {id, type, titel, datum, url, beschrijving, tags, icon, image} = lezing;
    return {
        id, 
        datum,
        titel,
        url,
        beschrijving,
        type,
        icon,
        tags,
        image: BASE_FILE_STORAGE_URL + image,
    };
  });
}

export async function getLezing(titel: string): Promise< Lezingen | null> {
  return (await getAllLezingen()).find((lezing) => lezing.titel === titel) ?? null;
}	