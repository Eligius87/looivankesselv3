import dictionaryEN from '../../dictionaries/dictionary_en.json';
import dictionaryNL from '../../dictionaries/dictionary_nl.json';

export type Dictionary = {
    dictionary: any;
}

export async function getDictionary(lang: any): Promise<any> {
    if (lang === 'nl') {
        return dictionaryNL;
    } else {
        return dictionaryEN;
    }
}