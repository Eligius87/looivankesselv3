import supabase from '../../../utils/supabase';

export type Blogs = {
  id: string;
  titel: string;
  beschrijving: string;
  datum: string;
  url: string;
  tags: string[];
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllBlogs(lang: any): Promise<Blogs[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('BlogInterview').select('*').order('datum', {ascending: false});

  if (error) {
    throw error;
  }

  return data.map((blog) => {
    const {id, url, titel, beschrijving, datum, tags, titel_EN, besc_EN} = blog;
    return {
        id, 
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        beschrijving: isDutch ? beschrijving : besc_EN ? besc_EN : beschrijving,
        datum,
        url,
        tags,
    };
  });
}

export async function getBlogs(titel: string, lang: any): Promise<Blogs | null> {
  return (await getAllBlogs(lang)).find((blog) => blog.titel === titel) ?? null;
}	