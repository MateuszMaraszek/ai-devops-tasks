Stworzę diagram Mermaid przedstawiający kompletny pipeline CI/CD dla aplikacji webowej.



Stworzyłem diagram Mermaid przedstawiający kompletny pipeline CI/CD dla aplikacji webowej. Diagram zawiera wszystkie wymagane etapy oraz dodatkowe elementy zapewniające jakość i bezpieczeństwo. Oto kluczowe elementy:

1. **Etapy wstępne**
   - Checkout kodu
   - Budowanie aplikacji
   - Testy jednostkowe

2. **Quality Gates**
   - Analiza statyczna kodu
   - Skanowanie bezpieczeństwa
   - Punkty decyzyjne (Code Quality OK?, Security OK?)

3. **Etapy Docker i integracji**
   - Budowanie obrazu Docker
   - Testy integracyjne

4. **Wdrożenie**
   - Wdrożenie na staging
   - Testy na stagingu
   - Wdrożenie na produkcję
   - Smoke tests

5. **Obsługa błędów**
   - Ścieżki błędów z każdego etapu
   - Automatyczny rollback
   - Punkty końcowe dla błędów

Diagram używa różnych kolorów dla lepszej czytelności:
- Niebieski: procesy
- Żółty: punkty decyzyjne
- Zielony: sukces
- Czerwony: błędy

Dodatkowo, do diagramu dołączyłem szczegółowy opis każdego etapu, który wyjaśnia:
- Co dokładnie dzieje się w każdym etapie
- Jakie są kryteria przejścia do następnego etapu
- Jak obsługiwane są błędy
- Jakie są quality gates

Czy chciałbyś, żebym wyjaśnił któryś z etapów bardziej szczegółowo lub wprowadził jakieś modyfikacje do diagramu?
