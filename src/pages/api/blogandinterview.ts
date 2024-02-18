import supabase from '../../../utils/supabase';

export type Blogs = {
  id: string;
  titel: string;
  beschrijving: string;
  datum: string;
  url: string;
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllBlogs(): Promise<Blogs[]> {
  const { data, error } = await supabase.from('BlogInterview').select('*').order('datum', {ascending: false});

  if (error) {
    throw error;
  }

  return data.map((blog) => {
    const {id, url, titel, beschrijving, datum} = blog;
    return {
        id, 
        titel,
        beschrijving,
        datum,
        url,
    };
  });
}

export async function getBlogs(titel: string): Promise<Blogs | null> {
  return (await getAllBlogs()).find((blog) => blog.titel === titel) ?? null;
}	