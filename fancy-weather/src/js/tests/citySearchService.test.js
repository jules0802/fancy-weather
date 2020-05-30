import getRequestedGeoData from '../citySearchService.js';


describe('getRequestedGeoData', () => {
  it('should resolve with Object', () => {
    expect(getRequestedGeoData('Moscow')).resolves.toBeInstanceOf(Object);
    expect(getRequestedGeoData('Moscow').then((data) => data.results)).resolves.toBeInstanceOf(Array);
  });
});
