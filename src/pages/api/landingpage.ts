import supabase from '../../../utils/supabase';

export type Preview = {
  id: string;
  titel: string;
  images: string[];
  datum: string;
  type: string;
  link: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllPreviews(lang: any): Promise<Preview[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Landingpage').select('*');

  if (error) {
    throw error;
  }

  return data.map((preview) => {
    const {id, image, titel, titel_EN, datum, type, link} = preview;
    return {
        id, 
	    images: [image].map(src => BASE_FILE_STORAGE_URL + src),
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        datum,
        type,
        link,
    };
  });
}

export async function getPreview(beschrijving: string, lang: any): Promise<Preview | null> {
  return (await getAllPreviews(lang)).find((preview) => preview.titel === beschrijving) ?? null;
}	
