// __tests__/sum.test.js
const sum = require('../sum');  // Importujemy funkcję sum z pliku sum.js

// Test 1: Sprawdzenie, czy sumowanie 1 + 2 daje 3
test('dodaje 1 + 2 do 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Test 2: Sprawdzenie, czy sumowanie -1 + 1 daje 0
test('dodaje -1 + 1 do 0', () => {
  expect(sum(-1, 1)).toBe(0);
});

// Test 3: Sprawdzenie, czy sumowanie 0 + 0 daje 0
test('dodaje 0 + 0 do 0', () => {
  expect(sum(0, 0)).toBe(0);
});
