Przeanalizuję algorytm i zaproponuję jego optymalizację.



Przeanalizowałem oryginalny algorytm i zaproponowałem jego optymalizację. Oto główne wnioski:

1. **Oryginalny algorytm**:
   - Złożoność czasowa: O(n²) - ze względu na zagnieżdżone pętle
   - Złożoność pamięciowa: O(n) - dla przechowywania par

2. **Zoptymalizowana wersja**:
   - Złożoność czasowa: O(n) - jedna pętla i operacje O(1) na Set
   - Złożoność pamięciowa: O(n) - dla Set i tablicy par

3. **Główne różnice**:
   - Zoptymalizowana wersja używa Set do przechowywania już sprawdzonych liczb
   - Zamiast sprawdzać każdą parę, szukamy dopełnienia do aktualnej liczby
   - Znacznie lepsza wydajność dla dużych zbiorów danych

4. **Kiedy używać której wersji**:
   - Oryginalna: dla małych tablic, gdy ważna jest prostota kodu
   - Zoptymalizowana: dla dużych tablic, gdy wydajność jest kluczowa

Czy chciałbyś, żebym wyjaśnił któryś z aspektów bardziej szczegółowo lub pokazał więcej przykładów?
