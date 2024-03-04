import supabase from '../../../utils/supabase';

export type Vakken = {
  id: string;
  link: string;
  titel: string;
  traject: string;
  periode: string;
  tags: string[];
};

export async function getAllVakken(lang: any): Promise<Vakken[]> {
  const isDutch = lang === 'nl';
  const { data, error } = await supabase.from('Overzichtvakken').select('*');

  if (error) {
    throw error;
  }

  return data.map((vak) => {
    const {id, link, titel, traject, periode, tags, titel_EN, traject_EN} = vak;
    return {
        link,
        id, 
        titel: isDutch ? titel : titel_EN ? titel_EN : titel,
        traject: isDutch ? traject : traject_EN ? traject_EN : traject,
        periode,
        tags
    };
  });
}

export async function getVak(titel: string, lang: any): Promise<Vakken | null> {
  return (await getAllVakken(lang)).find((vak) => vak.titel === titel) ?? null;
}	