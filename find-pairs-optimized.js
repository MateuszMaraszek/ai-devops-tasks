/**
 * Znajduje wszystkie pary liczb w tablicy, których suma równa się targetSum (zoptymalizowana wersja)
 * @param {number[]} arr - Tablica liczb
 * @param {number} targetSum - Docelowa suma
 * @returns {number[][]} - Tablica par liczb
 */
function findPairsOptimized(arr, targetSum) {
  const pairs = [];
  const seen = new Set();
  
  for (const num of arr) {
    const complement = targetSum - num;
    
    if (seen.has(complement)) {
      pairs.push([complement, num]);
    }
    
    seen.add(num);
  }
  
  return pairs;
}

// Przykłady użycia
const testCases = [
  {
    arr: [1, 5, 7, 3, 9, 2, 8],
    targetSum: 10,
    expected: [[1, 9], [5, 5], [7, 3], [2, 8]]
  },
  {
    arr: [1, 2, 3, 4, 5],
    targetSum: 6,
    expected: [[1, 5], [2, 4]]
  },
  {
    arr: [1, 1, 1, 1],
    targetSum: 2,
    expected: [[1, 1], [1, 1], [1, 1]]
  }
];

// Testy
console.log("Testowanie zoptymalizowanej implementacji:");
testCases.forEach((test, index) => {
  const result = findPairsOptimized(test.arr, test.targetSum);
  console.log(`\nTest ${index + 1}:`);
  console.log(`Tablica: ${test.arr}`);
  console.log(`Docelowa suma: ${test.targetSum}`);
  console.log(`Znalezione pary: ${JSON.stringify(result)}`);
  console.log(`Oczekiwane pary: ${JSON.stringify(test.expected)}`);
  console.log(`Test ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'PASSED' : 'FAILED'}`);
});

// Porównanie wydajności
console.log("\nPorównanie wydajności:");
const largeArray = Array.from({length: 10000}, (_, i) => i + 1);
const target = 10000;

console.time('Oryginalna implementacja');
const { findPairs } = require('./find-pairs');
findPairs(largeArray, target);
console.timeEnd('Oryginalna implementacja');

console.time('Zoptymalizowana implementacja');
findPairsOptimized(largeArray, target);
console.timeEnd('Zoptymalizowana implementacja');

module.exports = {
  findPairsOptimized
}; 