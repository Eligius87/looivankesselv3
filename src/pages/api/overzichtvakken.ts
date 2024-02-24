import supabase from '../../../utils/supabase';

export type Vakken = {
  id: string;
  link: string;
  titel: string;
  traject: string;
  periode: string;
  tags: string[];
};

export async function getAllVakken(): Promise<Vakken[]> {
  const { data, error } = await supabase.from('Overzichtvakken').select('*');

  if (error) {
    throw error;
  }

  return data.map((vak) => {
    const {id, link, titel, traject, periode, tags} = vak;
    return {
        link,
        id, 
        titel,
        traject,
        periode,
        tags
    };
  });
}

export async function getVak(titel: string): Promise<Vakken | null> {
  return (await getAllVakken()).find((vak) => vak.titel === titel) ?? null;
}	