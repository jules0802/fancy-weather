import { calcFtoC, calcCtoF, getIconPath } from '../weatherService.js';

describe('calcFtoC', () => {
  it('result should be defined', () => {
    expect(calcFtoC(0)).toBeDefined();
    expect(calcFtoC(1)).toBeDefined();
    expect(calcFtoC(-50)).toBeDefined();
    expect(calcFtoC(1000)).toBeDefined();
  });

  it('should return Number', () => {
    expect(typeof calcFtoC(0) === 'number').toBeTruthy();
    expect(typeof calcFtoC(1) === 'number').toBeTruthy();
    expect(typeof calcFtoC(-50) === 'number').toBeTruthy();
    expect(typeof calcFtoC(1000) === 'number').toBeTruthy();
  });

  it('should return right value', () => {
    expect(calcFtoC(0)).toEqual(-18);
    expect(calcFtoC(1)).toEqual(-17);
    expect(calcFtoC(-50)).toEqual(-46);
    expect(calcFtoC(1000)).toEqual(538);
  });

});

describe('calcCtoF', () => {
  it('result should be defined', () => {
    expect(calcCtoF(0)).toBeDefined();
    expect(calcCtoF(1)).toBeDefined();
    expect(calcCtoF(-50)).toBeDefined();
    expect(calcCtoF(1000)).toBeDefined();
  });

  it('should return Number', () => {
    expect(typeof calcCtoF(0) === 'number').toBeTruthy();
    expect(typeof calcCtoF(1) === 'number').toBeTruthy();
    expect(typeof calcCtoF(-50) === 'number').toBeTruthy();
    expect(typeof calcCtoF(1000) === 'number').toBeTruthy();
  });

  it('should return right value', () => {
    expect(calcCtoF(0)).toEqual(32);
    expect(calcCtoF(1)).toEqual(34);
    expect(calcCtoF(-50)).toEqual(-58);
    expect(calcCtoF(1000)).toEqual(1832);
  });

});

describe('getIconPath', () => {
  it('result should be defined', () => {
    expect(getIconPath('03n')).toBeDefined();
    expect(getIconPath('10d')).toBeDefined();
  });

  it('should return String', () => {
    expect(typeof getIconPath('03n') === 'string').toBeTruthy();
    expect(typeof getIconPath('10d') === 'string').toBeTruthy();
  });

  it('should return right value', () => {
    expect(getIconPath('03n')).toEqual('../assets/icons/scattered_clouds.svg');
    expect(getIconPath('10d')).toEqual('../assets/icons/rain_day.svg');
  });

});