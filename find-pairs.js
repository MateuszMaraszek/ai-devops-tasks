/**
 * Znajduje wszystkie pary liczb w tablicy, których suma równa się targetSum
 * @param {number[]} arr - Tablica liczb
 * @param {number} targetSum - Docelowa suma
 * @returns {number[][]} - Tablica par liczb
 */
function findPairs(arr, targetSum) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === targetSum) {
        pairs.push([arr[i], arr[j]]);
      }
    }
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
console.log("Testowanie oryginalnej implementacji:");
testCases.forEach((test, index) => {
  const result = findPairs(test.arr, test.targetSum);
  console.log(`\nTest ${index + 1}:`);
  console.log(`Tablica: ${test.arr}`);
  console.log(`Docelowa suma: ${test.targetSum}`);
  console.log(`Znalezione pary: ${JSON.stringify(result)}`);
  console.log(`Oczekiwane pary: ${JSON.stringify(test.expected)}`);
  console.log(`Test ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'PASSED' : 'FAILED'}`);
});

module.exports = {
  findPairs
}; 