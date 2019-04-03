import {averageXP} from './GraphLogic'

 const listOf = [{xp:300, xp:400, xp: 500}]


describe('Making sure the library works', () => {
    test(
      'Jest works', () => {
        expect('string').toBe('string');
        expect(2).toBe(2);
        // ===
      }
    )
   })
   describe('Going over matchers', () => {
    beforeAll(()=>{
      // e.g. setup a connection to a mock database
    })
    test('other comparisons', () => {
      expect({ person: 'Joe' }).toEqual({ person: 'Joe' });
      expect(2).not.toBe(4);
      // !==
    })
   
    test('Number comparisons', () => {
      expect(2).toBeGreaterThan(1);
      expect(4).toBeGreaterThanOrEqual(4);
      expect(4).toBeGreaterThanOrEqual(1);
      expect(3).toBeLessThan(4);
      expect(2).toBeLessThanOrEqual(5);
      expect(2).toBeLessThanOrEqual(2);
    })
   
    test('misc', () => {
      let pizza = 'yum';
      expect(null).toBeNull();
      expect(undefined).toBeUndefined();
      expect(pizza).toBeDefined();
      expect(NaN).toBeFalsy();
    })
   
   })
   describe('averageXp tests', () => {
    test('returns a truthy value', () => {
      let result = averageXP(listOf);
      expect(result).toBeTruthy();
    })
   })
   describe('test driven', () => {
    test('it should exist', () => {
      expect(averageXP).toBeDefined();
    })
    test('it should return a number', () => {
      let result = averageXP(listOf)
      expect(typeof result).toBe('number')
    })

   })


