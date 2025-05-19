Przekonwertuję skrypt bash na skrypt PowerShell, zachowując tę samą funkcjonalność, ale dostosowując go do specyfiki Windows.



Utworzyłem skrypt PowerShell `backup-database.ps1`, który jest odpowiednikiem skryptu bash. Główne zmiany i dostosowania to:

1. **Zmienne i składnia:**
   - Użycie `$` zamiast `$` dla zmiennych
   - Użycie `Get-Date` zamiast `date`
   - Użycie `Join-Path` do łączenia ścieżek (zgodnie z konwencjami Windows)

2. **Ścieżki:**
   - Zmiana formatu ścieżek na Windows (`C:\Backups\DB`)
   - Użycie `Join-Path` do bezpiecznego łączenia ścieżek

3. **Sprawdzanie katalogu:**
   - Użycie `Test-Path` zamiast `[ ! -d ]`
   - Użycie `New-Item` zamiast `mkdir`
   - Dodanie `Out-Null` aby wyciszyć output z `New-Item`

4. **Obsługa błędów:**
   - Użycie bloku `try-catch` zamiast sprawdzania `$?`
   - Użycie `$LASTEXITCODE` do sprawdzania statusu ostatniego polecenia
   - Użycie `Write-Error` do wyświetlania błędów

5. **Output:**
   - Użycie `Write-Host` zamiast `echo`

Aby uruchomić ten skrypt w PowerShell, należy:
1. Zapisać go z rozszerzeniem `.ps1`
2. Upewnić się, że mysqldump jest dostępny w systemie (lub dodać pełną ścieżkę)
3. Uruchomić PowerShell jako administrator
4. Wykonać skrypt używając `.\backup-database.ps1`

Czy chciałbyś, żebym dodał jakieś dodatkowe funkcjonalności lub wyjaśnił któryś z aspektów bardziej szczegółowo?
