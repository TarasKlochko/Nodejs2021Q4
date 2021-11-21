import { cipher } from '../cipher.js';

describe('Test cipher function', () => {
  describe('Test Caesar cipher', () => {
    test('Should return "A" with config C0', () => {
      expect(cipher('B', 1, 0)).toBe('A');
    });
    test('Should return "b" with config C1', () => {
      expect(cipher('a', 1, 1)).toBe('b');
    });
    test('Should return "Ф" with config С0', () => {
      expect(cipher('Ф', 8, 0)).toBe('Ф');
    });
  });

  describe('Test Atbash cipher', () => {
    test('Should return "M" with config A', () => {
      expect(cipher('N', 1, 1, 1)).toBe('M');
    });
    test('Should return "n" with config A', () => {
      expect(cipher('m', 1, 0, 1)).toBe('n');
    });
    test('Should return "!" with config A', () => {
      expect(cipher('!', 1, 1, 1)).toBe('!');
    });
  });

  describe('Test ROT-8 cipher', () => {
    test('Should return "U" with config R1', () => {
      expect(cipher('M', 8, 1, 0)).toBe('U');
    });

    test('Should return "e" with config R0', () => {
      expect(cipher('m', 8, 0)).toBe('e');
    });
    test('Should return "5" with config R0', () => {
      expect(cipher('5', 8, 0)).toBe('5');
    });
  });
});
