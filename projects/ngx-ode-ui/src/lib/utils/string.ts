import { removeAccents } from '../helpers/accents.helper';

export function trim(text: string): string {
    if (text && text.length > 0) {
        return text.trim();
    }
    return text;
}

export function standardise(str: string): string{
  return removeAccents(str != null ? str : '').toLowerCase().replace('\\s+', ' ');
}
