Pytanie.1
Napisz prosty skrypt bash, który sprawdza, czy usługa Docker działa, a jeśli nie - próbuje ją uruchomić.

Pewnie! Oto **prosty skrypt Bash**, który sprawdza, czy usługa **Docker** działa, a jeśli nie – podejmuje próbę jej uruchomienia:

```bash
#!/bin/bash

# Sprawdź status usługi Docker
if systemctl is-active --quiet docker; then
    echo "✅ Docker działa."
else
    echo "⚠️  Docker nie działa. Próba uruchomienia..."

    # Spróbuj uruchomić usługę Docker
    sudo systemctl start docker

    # Ponownie sprawdź, czy się udało
    if systemctl is-active --quiet docker; then
        echo "✅ Docker został pomyślnie uruchomiony."
    else
        echo "❌ Nie udało się uruchomić Dockera. Sprawdź logi: 'journalctl -u docker.service'"
        exit 1
    fi
fi
```

---

### 📌 Jak używać:

1. Zapisz do pliku, np. `check-docker.sh`
2. Nadaj uprawnienia do uruchamiania:

   ```bash
   chmod +x check-docker.sh
   ```
3. Uruchom:

   ```bash
   ./check-docker.sh
   ```

---

### 🧠 Uwagi:

* Skrypt korzysta z `systemctl`, więc działa na systemach z systemd (np. Ubuntu, Debian, CentOS 7+).
* `sudo` może wymagać hasła – chyba że masz skonfigurowany `sudo` bez hasła dla tej komendy.
* Dla systemów bez `systemctl` (np. Alpine), trzeba użyć innej komendy (`service docker start`).

Chcesz wersję działającą też np. na macOS lub z dodatkowym logowaniem do pliku?
-----------------------------------------------
Pytanie.2
Wyjaśnij działanie tego skryptu linia po linii, tak jakbyś tłumaczył osobie początkującej.

Jasne! Poniżej wyjaśniam **każdą linijkę skryptu Bash krok po kroku**, tak jak tłumaczyłbym to osobie początkującej w Linuksie i skryptach powłoki:

---

### 📜 Skrypt:

```bash
#!/bin/bash
```

🔹 **To tzw. shebang** – mówi systemowi, że ten skrypt ma być uruchomiony za pomocą interpretera `/bin/bash` (czyli Bash – najpopularniejsza powłoka w Linuksie).

---

```bash
# Sprawdź status usługi Docker
```

🔹 **Komentarz** – nie jest wykonywany, tylko opisuje, co robi kolejna linijka. Pomaga czytelności skryptu.

---

```bash
if systemctl is-active --quiet docker; then
```

🔹 **Sprawdzenie, czy Docker działa (jest aktywny)**:

* `systemctl is-active docker` zwraca "active", jeśli usługa działa.
* `--quiet` wyłącza wypisywanie tekstu – interesuje nas tylko wynik (czy działa = sukces, czy nie = błąd).
* `if ...; then` oznacza: **jeśli ta komenda zakończy się sukcesem (czyli kodem wyjścia 0), to wykonaj dalsze instrukcje**.

---

```bash
    echo "✅ Docker działa."
```

🔹 Jeśli Docker działa, wypisujemy komunikat dla użytkownika.

---

```bash
else
```

🔹 **Jeśli Docker nie działa**, przechodzimy do tego bloku (czyli alternatywna ścieżka).

---

```bash
    echo "⚠️  Docker nie działa. Próba uruchomienia..."
```

🔹 Informujemy użytkownika, że Docker nie działa, i że spróbujemy go włączyć.

---

```bash
    sudo systemctl start docker
```

🔹 **Uruchamiamy usługę Docker** za pomocą `systemctl start docker`.

* Używamy `sudo`, ponieważ startowanie usług wymaga uprawnień administratora (roota).

---

```bash
    # Ponownie sprawdź, czy się udało
```

🔹 Komentarz wyjaśniający, co się dzieje w kolejnych liniach.

---

```bash
    if systemctl is-active --quiet docker; then
```

🔹 **Sprawdzamy jeszcze raz**, czy Docker się uruchomił po naszej próbie.

---

```bash
        echo "✅ Docker został pomyślnie uruchomiony."
```

🔹 Jeśli tym razem Docker działa – informujemy użytkownika, że wszystko poszło dobrze.

---

```bash
    else
        echo "❌ Nie udało się uruchomić Dockera. Sprawdź logi: 'journalctl -u docker.service'"
```

🔹 Jeśli Docker nadal nie działa – wypisujemy błąd i podpowiadamy, żeby sprawdzić logi Dockera:

```bash
journalctl -u docker.service
```

Ta komenda pokaże dziennik systemowy związany z usługą Docker – przydatna do diagnozy błędów.

---

```bash
        exit 1
```

🔹 **Kończymy skrypt kodem 1**, co oznacza błąd (kod `0` to sukces, `1` lub więcej – błąd).
Inne skrypty mogą odczytać ten kod i zareagować, np. zakończyć cały proces CI/CD.

---

### ✅ Podsumowanie:

Ten skrypt:

1. Sprawdza, czy Docker działa.
2. Jeśli nie działa, próbuje go uruchomić.
3. Informuje użytkownika o sukcesie lub błędzie.
4. Daje prostą diagnozę w razie problemów.

---

Chcesz, żebym przerobił go np. na wersję działającą też na macOS lub bez `systemctl` (dla np. WSL lub Alpine)?