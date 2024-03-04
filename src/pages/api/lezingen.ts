import supabase from '../../../utils/supabase';

export type Lezingen = {
  id: string;
  titel: string;
  datum: string;
  url: string;
  beschrijving: string;
  tags: string[];
  type: string;
  image: string;
  uitgelicht: boolean;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllLezingen(lang: any): Promise<Lezingen[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Lezingen').select('*').order('datum', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((lezing) => {
    const {id, type, uitgelicht, titel, datum, url, beschrijving, tags, image, besc_EN, titel_EN} = lezing;
    return {
        id, 
        uitgelicht,
        datum,
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        url,
        beschrijving: isDutch ? beschrijving : besc_EN ? besc_EN : beschrijving,
        type,
        tags,
        image: BASE_FILE_STORAGE_URL + image,
    };
  });
}

export async function getLezing(titel: string, lang: any): Promise< Lezingen | null> {
  return (await getAllLezingen(lang)).find((lezing) => lezing.titel === titel) ?? null;
}	