import supabase from '../../../utils/supabase';

export type Publicaties = {
  id: string;
  titel: string;
  datum: string;
  publicatie_url: string;
  zin_besc: string;
  type: string;
  uitgelicht: boolean;
  image: string;
  tags: string[];
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPublicaties(lang: any): Promise<Publicaties[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Publicaties').select('*').order('datum', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((publicatie) => {
    const {id, type, titel, datum, publicatie_url, zin_besc, uitgelicht, image, tags, titel_EN, besc_EN} = publicatie;
    return {
        id, 
        datum,
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        publicatie_url,
        zin_besc: isDutch ? zin_besc : besc_EN ? besc_EN : zin_besc,
        type,
        uitgelicht,
        image: BASE_FILE_STORAGE_URL + image,
        tags,
    };
  });
}

export async function getPublicatie(titel: string, lang: any): Promise<Publicaties | null> {
  return (await getAllPublicaties(lang)).find((publicatie) => publicatie.titel === titel) ?? null;
}	