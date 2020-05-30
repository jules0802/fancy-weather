import { getLanguageFromStorage } from '../storageService';

describe('getLanguageFromStorage', () => {
  it('should return right lang', () => {
    expect(getLanguageFromStorage()).toEqual('en' || 'ru');
  });
});