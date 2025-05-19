```mermaid
graph TD
    Start[Start Pipeline] --> Checkout[Checkout Code]
    
    %% Build and Test Phase
    Checkout --> Build[Build Application]
    Build --> UnitTests[Unit Tests]
    UnitTests --> CodeAnalysis[Static Code Analysis]
    CodeAnalysis --> SecurityScan[Security Scan]
    
    %% Quality Gates
    CodeAnalysis --> |Quality Gate| CodeQuality{Code Quality OK?}
    SecurityScan --> |Security Gate| SecurityCheck{Security OK?}
    
    %% Docker and Integration
    CodeQuality --> |Yes| DockerBuild[Build Docker Image]
    SecurityCheck --> |Yes| DockerBuild
    DockerBuild --> IntegrationTests[Integration Tests]
    
    %% Staging Deployment
    IntegrationTests --> |Tests Pass| StagingDeploy[Deploy to Staging]
    StagingDeploy --> StagingTests[Staging Tests]
    
    %% Production Deployment
    StagingTests --> |Tests Pass| ProductionDeploy[Deploy to Production]
    ProductionDeploy --> SmokeTests[Smoke Tests]
    
    %% Failure Paths
    CodeQuality --> |No| BuildFailed[Build Failed]
    SecurityCheck --> |No| BuildFailed
    UnitTests --> |Tests Fail| BuildFailed
    IntegrationTests --> |Tests Fail| BuildFailed
    StagingTests --> |Tests Fail| BuildFailed
    SmokeTests --> |Tests Fail| Rollback[Rollback Deployment]
    
    %% Success Path
    SmokeTests --> |Tests Pass| Success[Deployment Successful]
    
    %% Styling
    classDef success fill:#90EE90,stroke:#333,stroke-width:2px
    classDef failure fill:#FFB6C1,stroke:#333,stroke-width:2px
    classDef process fill:#E6F3FF,stroke:#333,stroke-width:2px
    classDef decision fill:#FFE4B5,stroke:#333,stroke-width:2px
    
    class Start,Checkout,Build,UnitTests,CodeAnalysis,SecurityScan,DockerBuild,IntegrationTests,StagingDeploy,StagingTests,ProductionDeploy,SmokeTests process
    class CodeQuality,SecurityCheck decision
    class Success success
    class BuildFailed,Rollback failure
```

# Opis etapów pipeline'u CI/CD

## 1. Checkout Code
- Pobranie kodu z repozytorium
- Sprawdzenie odpowiedniej gałęzi
- Weryfikacja uprawnień

## 2. Build Application
- Instalacja zależności
- Kompilacja kodu
- Generowanie artefaktów

## 3. Unit Tests
- Uruchomienie testów jednostkowych
- Generowanie raportów pokrycia
- Weryfikacja wyników testów

## 4. Static Code Analysis
- Analiza jakości kodu
- Sprawdzenie standardów kodowania
- Generowanie raportów

## 5. Security Scan
- Skanowanie podatności
- Analiza zależności
- Sprawdzenie konfiguracji

## 6. Build Docker Image
- Budowanie obrazu Docker
- Tagowanie obrazu
- Weryfikacja obrazu

## 7. Integration Tests
- Testy integracyjne
- Testy API
- Testy end-to-end

## 8. Deploy to Staging
- Wdrożenie na środowisko staging
- Konfiguracja środowiska
- Weryfikacja wdrożenia

## 9. Staging Tests
- Testy na środowisku staging
- Testy wydajnościowe
- Testy obciążeniowe

## 10. Deploy to Production
- Wdrożenie na produkcję
- Aktualizacja konfiguracji
- Weryfikacja wdrożenia

## 11. Smoke Tests
- Podstawowe testy funkcjonalne
- Weryfikacja krytycznych funkcji
- Sprawdzenie dostępności

## Quality Gates
- Weryfikacja jakości kodu
- Sprawdzenie bezpieczeństwa
- Walidacja testów

## Obsługa błędów
- Automatyczny rollback w przypadku błędów
- Powiadomienia o niepowodzeniach
- Logi błędów i diagnostyka 