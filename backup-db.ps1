# Skrypt do backupu bazy danych w PowerShell

# Konfiguracja
$DB_NAME = "app_database"
$BACKUP_DIR = "C:\Backups\DB"
$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$FILENAME = Join-Path $BACKUP_DIR "${DB_NAME}_${DATE}.sql.gz"

# Sprawdź czy katalog istnieje
if (-not (Test-Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR -Force | Out-Null
    Write-Host "Utworzono katalog $BACKUP_DIR"
}

# Wykonaj backup
Write-Host "Rozpoczynam backup bazy $DB_NAME..."

try {
    # Zakładając, że mysqldump jest dostępny w systemie
    # Jeśli nie, należy dodać pełną ścieżkę do mysqldump.exe
    mysqldump -u root -p $DB_NAME | gzip > $FILENAME
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Backup zakończony sukcesem: $FILENAME"
    } else {
        throw "Błąd podczas wykonywania backupu!"
    }
} catch {
    Write-Error "Wystąpił błąd: $_"
    exit 1
} 