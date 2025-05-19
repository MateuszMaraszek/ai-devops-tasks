Pytanie.1
Jak rozwiązać problem z dużym zużyciem pamięci przez kontener Docker?

Duże zużycie pamięci przez kontener Docker może prowadzić do spadku wydajności, awarii kontenerów lub nawet całego hosta. Oto **kompleksowa lista przyczyn i sposobów rozwiązania problemu**:

---

## 🧠 1. **Zdiagnozuj problem – sprawdź zużycie pamięci**

### 📊 Sprawdź, które kontenery zużywają dużo pamięci:

```bash
docker stats
```

Lub tylko jeden kontener:

```bash
docker stats <nazwa_kontenera>
```

Zobaczysz m.in. kolumny `MEM USAGE / LIMIT`.

---

## 🧰 2. **Ogranicz zużycie pamięci – ustaw limity**

Domyślnie kontener może używać całej dostępnej pamięci hosta. Można to ograniczyć:

```bash
docker run --memory="512m" --memory-swap="1g" <image>
```

**Parametry:**

* `--memory="512m"` – maksymalna pamięć RAM.
* `--memory-swap="1g"` – łącznie RAM + swap. Jeśli nie ustawisz `--memory-swap`, kontener może używać nieograniczonego swapu.

---

## 🔍 3. **Zidentyfikuj, co w kontenerze zużywa pamięć**

### Wejdź do kontenera i sprawdź procesy:

```bash
docker exec -it <nazwa_kontenera> bash
top
```

Albo:

```bash
ps aux --sort=-%mem
```

Zobaczysz, który proces zużywa najwięcej pamięci.

---

## 🧼 4. **Zoptymalizuj aplikację w kontenerze**

Możliwe przyczyny nadmiernego zużycia pamięci:

* **Nieoptymalny kod** – np. w Pythonie lub Node.js źle zarządzane obiekty w pamięci.
* **Brak limitów w aplikacji** – np. baza danych bez ograniczenia cache/bufferów.
* **Wycieki pamięci** – np. zapomniane obiekty w językach z garbage collectorem.

🔧 Wskazówka: dodaj monitoring do aplikacji (np. Prometheus, Heap Snapshoty, profiler).

---

## 🗃️ 5. **Ogranicz dane tymczasowe / logi**

* Czy aplikacja zapisuje dużo danych do `/tmp` lub `/var/log`?

* Sprawdź rozmiar katalogów:

  ```bash
  du -sh /*
  ```

* Zastosuj rotację logów, np. przez `logrotate` albo ustaw limit logów Dockerowych:

  ```bash
  docker run --log-opt max-size=10m --log-opt max-file=3 ...
  ```

---

## 🛠️ 6. **Użyj narzędzi do monitorowania i alertów**

* **cAdvisor** – monitorowanie zasobów kontenerów.
* **Grafana + Prometheus** – wizualizacja i alerty.
* **Docker Desktop (GUI)** – dla szybkiej diagnostyki (na Windows/macOS).

---

## 💡 7. **Sprawdź, czy obraz kontenera nie jest zbyt „ciężki”**

Niektóre obrazy mają zbędne zależności, np. `ubuntu` vs `alpine`.

* Używaj lekkich obrazów bazowych (`python:3.11-slim`, `node:alpine`, itp.)
* Optymalizuj `Dockerfile` – np. łącz `RUN` w jednym kroku, usuwaj cache.

---

## 🔐 8. **Ustaw OOM killer i restart policy**

Jeśli kontener przekroczy limit RAM-u, może zostać zabity przez OOM killer.

Dodaj politykę restartu, np.:

```bash
docker run --restart=on-failure:5 ...
```

---

## Podsumowanie

| Działanie                   | Co robi                         |
| --------------------------- | ------------------------------- |
| `--memory`, `--memory-swap` | Ogranicza pamięć kontenera      |
| `docker stats`              | Monitoruje zużycie pamięci      |
| `top`, `ps aux`             | Diagnozuje procesy w kontenerze |
| Lekkie obrazy               | Mniejsze zużycie pamięci        |
| Monitorowanie (Prometheus)  | Wczesne wykrywanie problemów    |
| Optymalizacja aplikacji     | Mniej wycieków, mniej RAM-u     |

---

Jeśli chcesz, mogę przeanalizować Twój konkretny przypadek – podaj `Dockerfile`, logi z `docker stats`, lub opis działania aplikacji w kontenerze.
---------------------------------
Pytanie.2
Jesteś doświadczonym DevOps Engineerem z 10-letnim doświadczeniem. Jak rozwiązać problem z dużym zużyciem pamięci przez kontener Docker?

Jasne — podejdźmy do problemu tak, jak zrobiłby to **doświadczony DevOps Engineer z 10+ latami praktyki**. Poniżej znajdziesz **usystematyzowane podejście do diagnozy i rozwiązania problemu nadmiernego zużycia pamięci przez kontener Docker**, oparte na realnych praktykach z produkcji.

---

# 🧠 **Strategia rozwiązywania problemu z pamięcią w kontenerze Docker**

## 🎯 **CEL:** Zidentyfikować i ograniczyć zużycie pamięci RAM przez kontener, aby uniknąć degradacji wydajności, OOM killerów i nieprzewidzianych restartów.

---

## 1. 🔍 **DIAGNOZA – najpierw pomiar, potem działanie**

### 🔧 Narzędzia:

* `docker stats` — do wstępnego przeglądu RAM
* `docker top` lub `ps aux` w kontenerze — identyfikacja procesów
* `cadvisor`, `prometheus`, `grafana` — historia i korelacja z innymi metrykami
* `dmesg` / logi jądra — sprawdzenie, czy OOM killer zabił kontener

### 📌 Sprawdzenie na poziomie hosta:

```bash
docker stats --no-stream
free -m
vmstat 1 5
dmesg | grep -i oom
```

---

## 2. 🧪 **LOKALIZACJA PROBLEMU – co dokładnie zużywa pamięć?**

### A. W kontenerze:

```bash
docker exec -it <kontener> bash
ps aux --sort=-%mem | head -n 10
```

> Szukamy procesów, które pożerają RAM. Często są to:
>
> * Bazy danych (np. PostgreSQL z dużym cache)
> * Serwery aplikacji (Node.js, Python, Java)
> * Nieoptymalne skrypty (np. przetwarzające duże pliki w RAM-ie)

---

## 3. ⚙️ **ZARZĄDZANIE ZASOBAMI – limity i zabezpieczenia**

### 🧩 Ograniczenie pamięci przy uruchamianiu kontenera:

```bash
docker run --memory="512m" --memory-swap="1g" --oom-kill-disable=false --restart=always ...
```

* `--memory` – twardy limit RAM
* `--memory-swap` – RAM + swap (często 2x RAM)
* `--oom-kill-disable=false` – pozwól kernelowi zabić proces, zamiast przeciążać hosta

### 🧠 Rekomendacja:

> Nigdy nie pozwól kontenerom produkcyjnym używać nieograniczonej pamięci RAM — **ustaw limity zgodne z wymaganiami aplikacji i dostępnymi zasobami hosta.**

---

## 4. 🔧 **OPTYMALIZACJA APLIKACJI W ŚRODKU KONTENERA**

### Przykłady:

* **Node.js**: zwiększ limity GC jeśli potrzebujesz (np. `--max-old-space-size=256`)
* **Java**: ustaw `-Xmx512m` – bez tego JVM zużyje tyle, ile chce
* **Python**: zidentyfikuj wycieki pamięci przez `tracemalloc`, `objgraph`, `memory_profiler`
* **Serwery www** (Nginx, Apache): ogranicz liczbę workerów/procesów

---

## 5. 📉 **ZOPTYMALIZUJ OBRAZ I WARSTWY SYSTEMU**

* Używaj **lightweight base images** (`alpine`, `distroless`)
* Czyścić cache po instalacjach:

  ```dockerfile
  RUN apt-get update && apt-get install -y pkg && apt-get clean && rm -rf /var/lib/apt/lists/*
  ```
* Usuń zbędne procesy tła – często kontenery odpalają więcej niż trzeba

---

## 6. 🧼 **ZARZĄDZANIE LOGAMI I TMP**

* Logi mogą zjadać RAM, jeśli log-driver to `json-file` bez limitów.
  Ustaw limit logów:

  ```bash
  --log-driver=json-file --log-opt max-size=10m --log-opt max-file=3
  ```

* Czyszczenie katalogów tymczasowych w aplikacji (`/tmp`, `/cache`)

---

## 7. 📈 **MONITORING I ALERTY – nie czekaj, aż się wysypie**

Zaimplementuj monitorowanie:

* `Prometheus + Grafana`
* `cAdvisor`
* `Alertmanager` – alert przy 80-90% użycia RAM przez kontener
* W firmie: integracja z Slack / PagerDuty / Teams

---

## 8. 🧪 **PRZYKŁAD PRAKTYCZNY (Node.js)**

```bash
docker run \
  --memory="256m" \
  --memory-swap="512m" \
  --log-opt max-size=5m \
  -e NODE_OPTIONS="--max-old-space-size=192" \
  -d node-app:latest
```

---

## ✅ PODSUMOWANIE – CHECKLISTA DO PRACY Z RAM-em w Dockerze

| Element                       | Czy zrobione? |
| ----------------------------- | ------------- |
| Monitorowanie `docker stats`  | ✅             |
| Limity pamięci RAM i swap     | ✅             |
| Analiza procesów w kontenerze | ✅             |
| Optymalizacja aplikacji       | ✅             |
| Lekkie obrazy bazowe          | ✅             |
| Zarządzanie logami i TMP      | ✅             |
| Alerty przy przekroczeniach   | ✅             |

---

Jeśli chcesz — mogę przeanalizować **Twój `Dockerfile`, aplikację lub stack** i doradzić konkretnie, co można poprawić. Wystarczy, że mi go pokażesz.
