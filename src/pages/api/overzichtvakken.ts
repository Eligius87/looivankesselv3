import supabase from '../../../utils/supabase';

export type Vakken = {
  id: string;
  titel: string;
  traject: string;
  periode: string;
};

export async function getAllVakken(): Promise<Vakken[]> {
  const { data, error } = await supabase.from('Overzichtvakken').select('*');

  if (error) {
    throw error;
  }

  return data.map((vak) => {
    const {id, titel, traject, periode} = vak;
    return {
        id, 
        titel,
        traject,
        periode
    };
  });
}

export async function getVak(titel: string): Promise<Vakken | null> {
  return (await getAllVakken()).find((vak) => vak.titel === titel) ?? null;
}	