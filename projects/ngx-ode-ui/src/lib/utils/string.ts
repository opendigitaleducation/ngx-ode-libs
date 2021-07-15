export function trim(text: string): string {
    if (text && text.length > 0) {
        return text.trim();
    }
    return text;
}

export function standardise(str: string): string{
  return removeAccents(str != null ? str : '').toLowerCase().replace('\\s+', ' ');
}

export const removeAccents = (str: string) => str.normalize("NFD").replace(/\p{Diacritic}/gu, '');
