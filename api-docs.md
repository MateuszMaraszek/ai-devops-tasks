# API Documentation

## GET /api/users

Pobiera listę użytkowników z możliwością paginacji i filtrowania.

### Parametry zapytania

| Parametr | Typ    | Wymagany | Domyślna wartość | Opis                                    |
|----------|--------|----------|------------------|----------------------------------------|
| page     | number | Nie      | 1                | Numer strony wyników                   |
| limit    | number | Nie      | 10               | Liczba wyników na stronę (max 100)     |
| role     | string | Nie      | -                | Filtrowanie według roli użytkownika    |

### Przykładowe żądanie

```http
GET /api/users?page=2&limit=20&role=admin
```

### Przykładowa odpowiedź

```json
{
  "data": [
    {
      "id": 21,
      "username": "john.doe",
      "email": "john.doe@example.com",
      "role": "admin",
      "createdAt": "2024-01-15T10:30:00Z",
      "lastLogin": "2024-03-19T08:45:00Z"
    },
    {
      "id": 22,
      "username": "jane.smith",
      "email": "jane.smith@example.com",
      "role": "admin",
      "createdAt": "2024-01-16T14:20:00Z",
      "lastLogin": "2024-03-18T16:30:00Z"
    }
  ],
  "pagination": {
    "currentPage": 2,
    "totalPages": 5,
    "totalItems": 85,
    "itemsPerPage": 20
  }
}
```

### Kody odpowiedzi

| Kod | Opis                                    |
|-----|----------------------------------------|
| 200 | Pomyślnie pobrano listę użytkowników   |
| 400 | Nieprawidłowe parametry zapytania      |
| 401 | Brak autoryzacji                       |
| 403 | Brak uprawnień do pobrania listy       |
| 500 | Błąd serwera                           |

### Uwagi

- Maksymalna liczba wyników na stronę to 100
- Jeśli podano nieprawidłową wartość parametru `page`, zwracana jest pierwsza strona
- Jeśli podano nieprawidłową wartość parametru `limit`, używana jest wartość domyślna
- Parametr `role` akceptuje następujące wartości: "admin", "user", "moderator"

### Przykłady użycia

1. Pobranie pierwszej strony z domyślnymi parametrami:
```http
GET /api/users
```

2. Pobranie drugiej strony z 50 wynikami:
```http
GET /api/users?page=2&limit=50
```

3. Filtrowanie użytkowników według roli:
```http
GET /api/users?role=user
```

4. Łączenie parametrów:
```http
GET /api/users?page=1&limit=25&role=moderator
``` 