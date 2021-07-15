import { trim, removeAccents } from './string'

describe('string utils', () => {
    describe('trim', () => {
        it('should return "input" when given " input "', () => {
            expect(trim(' input ')).toBe('input');
        });
        it('should return "input" when given " input"', () => {
            expect(trim(' input')).toBe('input');
        });
        it('should return "input" when given "input "', () => {
            expect(trim('input ')).toBe('input');
        });
        it('should return "input" when given "input"', () => {
            expect(trim('input')).toBe('input');
        });

        it('should remove all diacritics in "àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ"', () => {
            expect(removeAccents('àáâãäçèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ'))
                           .toBe('aaaaaceeeeiiiinooooouuuuyyAAAAACEEEEIIIINOOOOOUUUUY');
        });
    });
});
