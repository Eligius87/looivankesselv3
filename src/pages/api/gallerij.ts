import supabase from '../../../utils/supabase';

export type Gallerijen = {
  id: string;
  images: string[];
  naam: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllGallerijen(): Promise<Gallerijen[]> {
  const { data, error } = await supabase.from('gallerij').select('*');

  if (error) {
    throw error;
  }

  return data.map((gallerij) => {
    const {id, image, naam} = gallerij;
    return {
        id, 
	      images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        naam,
    };
  });
}

export async function getGallerij(naam: string): Promise<Gallerijen | null> {
  return (await getAllGallerijen()).find((gallerij) => gallerij.naam === naam) ?? null;
}	
