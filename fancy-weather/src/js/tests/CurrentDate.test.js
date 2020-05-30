import CurrentDate from '../CurrentDate';
import { DAYS_OF_WEEK, MONTHS } from '../constants';

const now = new CurrentDate();
const date = new Date();

describe('getCurrentDayOfWeek', () => {
  it('result should be defined', () => {
    expect(now.getCurrentDayOfWeek()).toBeDefined();
  });
   

  it('should return String', () => {
    expect(typeof now.getCurrentDayOfWeek() === 'string').toBeTruthy();
  });

  it('should return right value', () => {
    expect(now.getCurrentDayOfWeek()).toEqual(DAYS_OF_WEEK[date.getDay()]);
  });

});

describe('getCurrentMonth', () => {
  it('result should be defined', () => {
    expect(now.getCurrentMonth()).toBeDefined();
  });


  it('should return String', () => {
    expect(typeof now.getCurrentMonth() === 'string').toBeTruthy();
  });

  it('should return right value', () => {
    expect(now.getCurrentMonth()).toEqual(MONTHS[date.getMonth()]);
  });

});

describe('getCurrentSeason', () => {
  it('result should be defined', () => {
    expect(now.getCurrentSeason()).toBeDefined();
  });


  it('should return String', () => {
    expect(typeof now.getCurrentSeason() === 'string').toBeTruthy();
  });

  it('should return right value', () => {
    expect(now.getCurrentSeason()).toEqual('spring' || 'summer');
  });

});


