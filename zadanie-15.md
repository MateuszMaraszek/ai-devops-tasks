Zrefaktoryzuję tę funkcję, aby była bardziej czytelna i łatwiejsza w utrzymaniu. Główne zmiany to:
1. Wydzielenie konfiguracji do osobnego obiektu
2. Uproszczenie logiki wyboru środowiska
3. Dodanie domyślnej konfiguracji
4. Użycie bardziej deklaratywnego podejścia



Zrefaktoryzowałem funkcję `getEnvironmentConfig` wprowadzając kilka istotnych ulepszeń. Główne zmiany to:

1. Wydzielenie domyślnej konfiguracji do stałej `DEFAULT_CONFIG`
2. Utworzenie obiektu `ENVIRONMENT_CONFIGS` zawierającego konfiguracje dla wszystkich środowisk
3. Uproszczenie funkcji do jednej linii kodu używającej operatora `||`
4. Wykorzystanie spread operatora (`...`) do dziedziczenia domyślnych wartości

Nowa wersja jest:
- Bardziej czytelna - wszystkie konfiguracje są w jednym miejscu
- Łatwiejsza w utrzymaniu - dodanie nowego środowiska to tylko nowy wpis w obiekcie
- Bardziej wydajna - używa bezpośredniego dostępu do obiektu zamiast warunków
- Bardziej elastyczna - łatwo dodać nowe właściwości lub środowiska

Czy chciałbyś, żebym wyjaśnił któryś z aspektów refaktoryzacji bardziej szczegółowo?
