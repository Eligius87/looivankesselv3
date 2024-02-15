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
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPublicaties(): Promise<Publicaties[]> {
  const { data, error } = await supabase.from('Publicaties').select('*').order('datum', { ascending: false });

  if (error) {
    throw error;
  }

  return data.map((publicatie) => {
    const {id, type, titel, datum, publicatie_url, zin_besc, uitgelicht, image} = publicatie;
    return {
        id, 
        datum,
        titel,
        publicatie_url,
        zin_besc,
        type,
        uitgelicht,
        image: BASE_FILE_STORAGE_URL + image,
    };
  });
}

export async function getPublicatie(titel: string): Promise<Publicaties | null> {
  return (await getAllPublicaties()).find((publicatie) => publicatie.titel === titel) ?? null;
}	