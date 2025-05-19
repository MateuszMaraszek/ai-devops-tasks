Pytanie.1
Popraw błędy:
services: 
  web:
    image: nginx
    ports:
      - "80:80"
  app:
    build: .
    ports
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD=password

Oczywiście! Zauważyłem kilka błędów w Twoim pliku `docker-compose.yml`. Oto, co trzeba poprawić:

1. **Brak dwukropka po `ports` w usłudze `app`** – `ports` muszą być zapisane z dwukropkiem, a nie tylko z myślnikiem.
2. **Zagnieżdżenie `depends_on`** – nie ma błędu w tym elemencie, ale warto dodać to poprawnie w odniesieniu do usługi `db`.
3. **Brak poprawnego wcięcia lub dodatkowe spacje** – YAML jest bardzo wrażliwy na wcięcia, a Twoje wcięcia są poprawne, ale warto się upewnić, że nie występują niepotrzebne spacje.

Oto poprawiona wersja Twojego pliku:

```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
```

### Co poprawiono:

1. **Błąd w sekcji `app`**: Brak dwukropka po `ports` został naprawiony.
2. **Poprawne wcięcia**: Wszystkie sekcje są poprawnie zagnieżdżone.
3. **`POSTGRES_PASSWORD`**: Przypisanie wartości dla `POSTGRES_PASSWORD` jest teraz poprawne (klucz: wartość).

Po tych poprawkach plik powinien działać poprawnie. Jeśli masz dodatkowe pytania lub inne problemy, daj znać!
