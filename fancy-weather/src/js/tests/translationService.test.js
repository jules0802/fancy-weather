import { getTranslation, translateDayOfWeek } from '../translationService';

describe('getTranslation', () => {
  it('should resolve with translation', () => {
    expect(getTranslation('свет', 'en')).resolves.toBe('light');
    expect(getTranslation('blood', 'ru')).resolves.toBe('кровь');
  });
});

describe('translateDayOfWeek', () => {
  it('should return right translation', () => {
    expect(translateDayOfWeek('TUESDAY', 'ru')).toEqual('Вторник'.toUpperCase());
    expect(translateDayOfWeek('Tuesday'.toUpperCase(), 'be')).toEqual('Аўторак'.toUpperCase());
    expect(translateDayOfWeek('Среда'.toUpperCase(), 'en')).toEqual('Wednesday'.toUpperCase());
    expect(translateDayOfWeek('Суббота'.toUpperCase(), 'be')).toEqual('Субота'.toUpperCase());
    expect(translateDayOfWeek('Панядзелак'.toUpperCase(), 'ru')).toEqual('Понедельник'.toUpperCase());
    expect(translateDayOfWeek('Асяроддзе'.toUpperCase(), 'en')).toEqual('Wednesday'.toUpperCase());
  });
});