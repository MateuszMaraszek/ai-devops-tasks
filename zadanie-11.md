Pytanie.1
Funkcja, którą podałeś, jest prostą funkcją sumującą dwie liczby. Oto, co robi:

```javascript
function sum(a, b) {
  return a + b;
}
```

### Wyjaśnienie:

1. **`function sum(a, b)`**:

   * Definiuje funkcję o nazwie `sum`, która przyjmuje dwa argumenty: `a` i `b`. Argumenty te reprezentują liczby, które zostaną dodane.
2. **`return a + b;`**:

   * Funkcja zwraca wynik dodawania dwóch liczb `a` i `b`.

### Przykład użycia:

Jeśli wywołasz tę funkcję w następujący sposób:

```javascript
let result = sum(3, 5);
console.log(result);  // Wynik: 8
```

Wartością zmiennej `result` będzie `8`, ponieważ funkcja dodaje `3` i `5`.

### Podsumowanie:

Funkcja `sum` jest prostym sposobem na dodawanie dwóch liczb i zwracanie ich sumy.

------------------------
Pytanie.2
Napisz prosty test jednostkowy dla tej funkcji używając Jest. Wyjaśnij, czym jest Jest, jak go zainstalować w projekcie i jak uruchomić ten test. Podaj również strukturę plików projektu.

### Co to jest **Jest**?

**Jest** to framework do testów jednostkowych, który jest powszechnie używany w ekosystemie JavaScript, szczególnie w projektach wykorzystujących React, Node.js, oraz inne technologie JavaScriptowe. Jest prosty w konfiguracji, oferuje łatwe w użyciu funkcje do testowania, mockowania oraz asercji (sprawdzania wyników), a także świetną integrację z narzędziami do testów UI.

### Instalacja **Jest** w projekcie

1. **Zainstaluj Jest w projekcie**:
   Najpierw musisz zainstalować Jest jako zależność deweloperską. Otwórz terminal w katalogu swojego projektu i uruchom:

   ```bash
   npm install --save-dev jest
   ```

   To zainstaluje Jest i doda go do sekcji `devDependencies` w pliku `package.json`.

2. **Skonfiguruj skrypt testowy**:
   Aby móc uruchomić testy, musisz dodać skrypt w pliku `package.json`. Otwórz `package.json` i dodaj poniższy skrypt w sekcji `"scripts"`:

   ```json
   "scripts": {
     "test": "jest"
   }
   ```

   Dzięki temu możesz uruchomić testy za pomocą polecenia `npm test`.

### Tworzenie testu jednostkowego

1. **Utwórz folder na testy**:
   Aby utrzymać porządek, zaleca się utworzenie folderu, np. `__tests__`, w którym będą przechowywane pliki testów.

2. **Tworzenie testu**:
   Załóżmy, że masz funkcję `sum` w pliku `sum.js`:

   ```javascript
   // sum.js
   function sum(a, b) {
     return a + b;
   }

   module.exports = sum;
   ```

   Teraz stwórz test dla tej funkcji w pliku `sum.test.js` w folderze `__tests__`:

   ```javascript
   // __tests__/sum.test.js
   const sum = require('../sum');  // Załaduj funkcję sum

   test('dodaje 1 + 2 do 3', () => {
     expect(sum(1, 2)).toBe(3);  // Sprawdź, czy 1 + 2 = 3
   });

   test('dodaje -1 + 1 do 0', () => {
     expect(sum(-1, 1)).toBe(0);  // Sprawdź, czy -1 + 1 = 0
   });

   test('dodaje 0 + 0 do 0', () => {
     expect(sum(0, 0)).toBe(0);  // Sprawdź, czy 0 + 0 = 0
   });
   ```

### Wyjaśnienie testu:

1. **`const sum = require('../sum');`** – Importujesz funkcję `sum` z pliku `sum.js`.
2. **`test('dodaje 1 + 2 do 3', () => { ... })`** – Określasz test z opisem (pierwszy argument) oraz funkcję testową (drugi argument), która zawiera kod sprawdzający wynik.
3. **`expect(sum(1, 2)).toBe(3);`** – Używasz metody `expect()`, aby porównać wynik funkcji `sum(1, 2)` z oczekiwaną wartością `3`.

### Struktura plików projektu

Po utworzeniu testów struktura plików Twojego projektu powinna wyglądać mniej więcej tak:

```
my-project/
├── __tests__/
│   └── sum.test.js
├── node_modules/
├── package.json
└── sum.js
```

### Uruchomienie testów

Aby uruchomić testy, wystarczy uruchomić polecenie:

```bash
npm test
```

Jest automatycznie znajdzie pliki z testami (wszystkie pliki z rozszerzeniem `.test.js`) i wykona testy. Powinieneś zobaczyć wynik w terminalu, który pokazuje, czy wszystkie testy przeszły pomyślnie.

### Wynik uruchomienia testów:

Po uruchomieniu testów powinnaś/powinieneś zobaczyć coś podobnego do tego:

```
PASS  __tests__/sum.test.js
  ✓ dodaje 1 + 2 do 3 (5 ms)
  ✓ dodaje -1 + 1 do 0 (3 ms)
  ✓ dodaje 0 + 0 do 0 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.742 s, estimated 5 s
```

### Podsumowanie:

1. **Jest** to popularny framework do testów jednostkowych w ekosystemie JavaScript.
2. Aby zainstalować Jest, należy użyć `npm install --save-dev jest`.
3. Testy jednostkowe są pisane w plikach z rozszerzeniem `.test.js`.
4. Można uruchomić testy za pomocą `npm test`, co uruchomi wszystkie testy w projekcie.

