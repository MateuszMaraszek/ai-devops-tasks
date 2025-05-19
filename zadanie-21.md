Utworzę skrypt JavaScript, który przekształci dane JSON do formatu CSV.



Utworzyłem skrypt, który konwertuje dane JSON do formatu CSV. Wynikowa struktura CSV będzie wyglądać tak:

```csv
id,name,email,roles
1,"Jan Kowalski",jan@example.com,"admin;user"
2,"Anna Nowak",anna@example.com,"user"
```

Skrypt zawiera:

1. **Funkcję konwersji** `convertToCSV`, która:
   - Tworzy nagłówki kolumn
   - Przetwarza dane użytkowników
   - Łączy role użytkownika średnikiem
   - Dodaje cudzysłowy dla wartości zawierających spacje lub średniki

2. **Obsługę specjalnych przypadków**:
   - Wartości ze spacjami są otoczone cudzysłowami
   - Tablica ról jest łączona średnikami
   - Zachowanie formatu CSV

3. **Zapis do pliku**:
   - Wyświetlenie wyniku w konsoli
   - Opcjonalny zapis do pliku CSV

Aby uruchomić skrypt:
```bash
node json-to-csv.js
```

Czy chciałbyś, żebym dodał jakieś dodatkowe funkcjonalności lub wyjaśnił któryś z aspektów bardziej szczegółowo?
