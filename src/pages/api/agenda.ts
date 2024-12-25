import supabase from '../../../utils/supabase';

export type Agendas = {
  id: string;
  titel: string;
  beschrijving: string;
  image: string;
  datum: string;
  type: string;
  tijd: string;
  link: string;
  locatie: string;
};


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

export async function getAllAgendas(): Promise<Agendas[]> {
  const { data, error } = await supabase.from('Agenda').select('*');

  if (error) {
    throw error;
  }

  return data.map((agenda) => {
    const {id, titel, image, datum, beschrijving, type, tijd, link, locatie} = agenda;
    return {
        id, 
        titel,
        beschrijving,
	    image:  BASE_FILE_STORAGE_URL + image,
        datum,
        type,
        tijd,
        link,
        locatie,
    };
  });
}

export async function getAgenda(titel: string): Promise<Agendas | null> {
  return (await getAllAgendas()).find((agenda) => agenda.titel === titel) ?? null;
}	