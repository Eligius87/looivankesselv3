import supabase from '../../../utils/supabase';

export type Preview = {
  id: string;
  beschrijving: string;
  images: string[];
  datum: string;
  type: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPreviews(): Promise<Preview[]> {
  const { data, error } = await supabase.from('Landingpage').select('*');

  if (error) {
    throw error;
  }

  return data.map((preview) => {
    const {id, image, beschrijving, datum, type} = preview;
    return {
        id, 
	    images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        beschrijving,
        datum,
        type,
    };
  });
}

export async function getPreview(beschrijving: string): Promise<Preview | null> {
  return (await getAllPreviews()).find((preview) => preview.beschrijving === beschrijving) ?? null;
}	
