import supabase from '../../../utils/supabase';

export type Uitlichting = {
  id: string;
  titel: string;
  beschrijving: string;
  tags: string[];
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllUitlichtings(lang: any): Promise<Uitlichting[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('initiatieven').select('*');

  if (error) {
    throw error;
  }

  return data.map((uitlichting) => {
    const {id, titel, beschrijving, tags, titel_EN, besc_EN} = uitlichting;
    return {
        id, 
        titel: isDutch ? titel : titel_EN ?? null,
        beschrijving: isDutch ? beschrijving : besc_EN ? besc_EN : beschrijving,
        tags
    };
  });
}

export async function getUitlichting(titel: string, lang: any): Promise<Uitlichting | null> {
  return (await getAllUitlichtings(lang)).find((uitlichting) => uitlichting.titel === titel) ?? null;
}	