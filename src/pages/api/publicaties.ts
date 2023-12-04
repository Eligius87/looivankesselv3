import supabase from '../../../utils/supabase';

export type Publicaties = {
  id: string;
  titel: string;
  beschrijving: string;
  images: string[];
  datum: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPublicaties(): Promise<Publicaties[]> {
  const { data, error } = await supabase.from('Publicaties').select('*');

  if (error) {
    throw error;
  }

  return data.map((publicatie) => {
    const {id, titel, image, beschrijving, datum} = publicatie;
    return {
        id, 
	    images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        beschrijving,
        datum,
        titel,
    };
  });
}

export async function getPublicatie(titel: string): Promise<Publicaties | null> {
  return (await getAllPublicaties()).find((publicatie) => publicatie.titel === titel) ?? null;
}	