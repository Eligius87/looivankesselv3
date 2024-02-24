import supabase from '../../../utils/supabase';

export type Uitlichting = {
  id: string;
  titel: string;
  beschrijving: string;
  tags: string[];
};

const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllUitlichtings(): Promise<Uitlichting[]> {
  const { data, error } = await supabase.from('uitlichtingvakken').select('*');

  if (error) {
    throw error;
  }

  return data.map((uitlichting) => {
    const {id, titel, beschrijving, tags} = uitlichting;
    return {
        id, 
        titel,
        beschrijving,
        tags
    };
  });
}

export async function getUitlichting(titel: string): Promise<Uitlichting | null> {
  return (await getAllUitlichtings()).find((uitlichting) => uitlichting.titel === titel) ?? null;
}	