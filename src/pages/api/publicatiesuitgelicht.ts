import supabase from '../../../utils/supabase';

export type PublicatiesUit = {
  id: string;
  titel: string;
  beschrijving: string;
  image: string;
  datum: string;
  pubuit_url: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPublicatiesUit(): Promise<PublicatiesUit[]> {
  const { data, error } = await supabase.from('PublicatiesUitgelicht').select('*').order('datum', {ascending: false});

  if (error) {
    throw error;
  }

  return data.map((publicatie) => {
    const {id, titel, image, beschrijving, datum, pubuit_url} = publicatie;
    return {
        id, 
	    image: BASE_FILE_STORAGE_URL + image,
        beschrijving,
        datum,
        titel,
        pubuit_url,
    };
  });
}

export async function getPublicatieUit(titel: string): Promise<PublicatiesUit | null> {
  return (await getAllPublicatiesUit()).find((publicatieuit) => publicatieuit.titel === titel) ?? null;
}	