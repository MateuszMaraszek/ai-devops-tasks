# Simple Task API

Proste REST API do zarządzania zadaniami, napisane w Node.js z Express i MongoDB.

## Opis

Simple Task API to backendowa aplikacja umożliwiająca zarządzanie zadaniami. System oferuje podstawowe operacje CRUD na zadaniach, filtrowanie oraz prostą autoryzację użytkowników.

### Główne funkcje:
- Tworzenie, odczytywanie, aktualizacja i usuwanie zadań
- Filtrowanie zadań według statusu i priorytetów
- Autoryzacja użytkowników
- Walidacja danych wejściowych
- Obsługa błędów

## Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/username/simple-task-api.git
cd simple-task-api
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Skonfiguruj zmienne środowiskowe:
```bash
cp .env.example .env
```
Edytuj plik `.env` i ustaw odpowiednie wartości:
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/task-api
JWT_SECRET=your-secret-key
```

4. Uruchom aplikację:
```bash
npm start
```

## Użycie

### Przykładowe żądanie:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Nowe zadanie",
    "description": "Opis zadania",
    "priority": "high",
    "status": "pending"
  }'
```

## Endpointy API

### Zadania

#### GET /api/tasks
Pobiera listę zadań.

Parametry zapytania:
- `status` - filtrowanie według statusu
- `priority` - filtrowanie według priorytetu
- `page` - numer strony (domyślnie 1)
- `limit` - liczba wyników na stronę (domyślnie 10)

#### POST /api/tasks
Tworzy nowe zadanie.

Wymagane pola:
- `title` - tytuł zadania
- `description` - opis zadania
- `priority` - priorytet (low, medium, high)
- `status` - status (pending, in_progress, completed)

#### GET /api/tasks/:id
Pobiera szczegóły zadania.

#### PUT /api/tasks/:id
Aktualizuje zadanie.

#### DELETE /api/tasks/:id
Usuwa zadanie.

### Autoryzacja

#### POST /api/auth/register
Rejestracja nowego użytkownika.

Wymagane pola:
- `email` - adres email
- `password` - hasło
- `name` - imię i nazwisko

#### POST /api/auth/login
Logowanie użytkownika.

Wymagane pola:
- `email` - adres email
- `password` - hasło

## Technologie

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (autoryzacja)
- Joi (walidacja)

## Licencja

MIT
