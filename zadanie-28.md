Stworzę skrypt w Pythonie do interakcji z Jenkins API.



Stworzyłem skrypt `jenkins_api_client.py`, który umożliwia interakcję z Jenkins API. Oto szczegółowe wyjaśnienie:

### Używane biblioteki:
1. `python-jenkins` - główna biblioteka do komunikacji z Jenkins API
2. `rich` - do ładnego formatowania wyjścia w konsoli
3. `argparse` - do obsługi argumentów wiersza poleceń
4. `typing` - do typowania statycznego
5. `datetime` - do formatowania dat
6. `json` - do obsługi parametrów w formacie JSON

### Główne funkcjonalności:

1. **Klasa JenkinsClient**
   - Inicjalizacja połączenia z Jenkins
   - Obsługa błędów połączenia
   - Metody do interakcji z API

2. **Listowanie zadań**
   - Pobieranie listy wszystkich zadań
   - Wyświetlanie w formie tabeli
   - Informacje o statusie i ostatnich buildach

3. **Sprawdzanie statusu**
   - Pobieranie informacji o ostatnim buildzie
   - Szczegóły: numer, status, czas, czas trwania

4. **Uruchamianie zadań**
   - Możliwość uruchomienia z parametrami
   - Obsługa błędów
   - Potwierdzenie uruchomienia

### Przykłady użycia:

1. **Listowanie wszystkich zadań:**
```bash
python jenkins_api_client.py \
    --url "http://jenkins.example.com" \
    --username "admin" \
    --token "your-api-token" \
    --action list
```

2. **Sprawdzanie statusu zadania:**
```bash
python jenkins_api_client.py \
    --url "http://jenkins.example.com" \
    --username "admin" \
    --token "your-api-token" \
    --action status \
    --job "my-job-name"
```

3. **Uruchamianie zadania bez parametrów:**
```bash
python jenkins_api_client.py \
    --url "http://jenkins.example.com" \
    --username "admin" \
    --token "your-api-token" \
    --action build \
    --job "my-job-name"
```

4. **Uruchamianie zadania z parametrami:**
```bash
python jenkins_api_client.py \
    --url "http://jenkins.example.com" \
    --username "admin" \
    --token "your-api-token" \
    --action build \
    --job "my-job-name" \
    --parameters '{"param1": "value1", "param2": "value2"}'
```

### Obsługa błędów:
- Sprawdzanie połączenia przy inicjalizacji
- Obsługa błędów API
- Walidacja argumentów
- Kolorowe komunikaty błędów

### Wymagania:
```bash
pip install python-jenkins rich
```

### Bezpieczeństwo:
- Używanie tokenu API zamiast hasła
- Bezpieczne przekazywanie parametrów
- Obsługa błędów autoryzacji

### Rozszerzenia:
Skrypt można rozszerzyć o dodatkowe funkcjonalności:
1. Monitorowanie postępu buildu
2. Pobieranie logów
3. Zarządzanie węzłami
4. Konfiguracja zadań

Czy chciałbyś, żebym wyjaśnił któryś z aspektów bardziej szczegółowo lub dodał jakieś dodatkowe funkcjonalności?
