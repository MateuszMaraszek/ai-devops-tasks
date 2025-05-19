Stworzę Jenkinsfile dla aplikacji Node.js wraz z wyjaśnieniem każdego etapu i najlepszych praktyk.



Stworzyłem Jenkinsfile z deklaratywną składnią. Przeanalizujmy każdy etap i najlepsze praktyki:

### 1. Struktura i zmienne środowiskowe
```groovy
environment {
    DOCKER_REGISTRY = 'your-registry.com'
    DOCKER_IMAGE = 'your-app'
    DOCKER_TAG = "${env.BUILD_NUMBER}"
    NODE_VERSION = '18'
}
```
- Definiujemy zmienne środowiskowe na poziomie pipeline'u
- Używamy `BUILD_NUMBER` jako tagu dla obrazu Docker
- Określamy wersję Node.js

### 2. Etapy pipeline'u

#### Checkout
```groovy
stage('Checkout') {
    steps {
        checkout scm
    }
}
```
- Pobiera kod z repozytorium
- `scm` automatycznie używa konfiguracji z Jenkinsa

#### Instalacja zależności
```groovy
stage('Install Dependencies') {
    steps {
        nodejs(nodeJSInstallationName: 'NodeJS-18') {
            sh 'npm ci'
        }
    }
}
```
- Używa `npm ci` zamiast `npm install` dla deterministycznych instalacji
- Wykorzystuje cache Node.js
- Określa konkretną wersję Node.js

#### Testy
```groovy
stage('Run Tests') {
    steps {
        nodejs(nodeJSInstallationName: 'NodeJS-18') {
            sh 'npm test -- --coverage'
        }
    }
    post {
        always {
            junit '**/junit.xml'
            publishCoverage adapters: [istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')]
        }
    }
}
```
- Uruchamia testy z generowaniem raportu pokrycia
- Publikuje wyniki testów w Jenkinsie
- Zawsze generuje raporty, niezależnie od wyniku testów

#### Budowanie
```groovy
stage('Build') {
    steps {
        nodejs(nodeJSInstallationName: 'NodeJS-18') {
            sh 'npm run build'
        }
    }
}
```
- Buduje aplikację
- Używa tej samej wersji Node.js

#### Budowanie obrazu Docker
```groovy
stage('Build Docker Image') {
    steps {
        script {
            docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}")
        }
    }
}
```
- Buduje obraz Docker
- Używa zmiennych środowiskowych do nazewnictwa

#### Publikowanie obrazu Docker
```groovy
stage('Push Docker Image') {
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', 
                                            usernameVariable: 'DOCKER_USER', 
                                            passwordVariable: 'DOCKER_PASS')]) {
                // Logowanie i publikacja
            }
        }
    }
}
```
- Bezpiecznie zarządza poświadczeniami
- Publikuje obraz do rejestru

### Najlepsze praktyki

1. **Bezpieczeństwo**
   - Używanie `withCredentials` do zarządzania sekretami
   - Nie przechowywanie wrażliwych danych w kodzie
   - Używanie zmiennych środowiskowych

2. **Wydajność**
   - Używanie `npm ci` zamiast `npm install`
   - Wykorzystanie cache'owania
   - Czyszczenie workspace'u po zakończeniu

3. **Monitorowanie**
   - Publikowanie raportów testów
   - Raporty pokrycia kodu
   - Logi sukcesu/niepowodzenia

4. **Obsługa błędów**
   - Sekcja `post` do obsługi różnych scenariuszy
   - Czyszczenie zasobów
   - Informacje zwrotne o statusie

5. **Modularność**
   - Podział na logiczne etapy
   - Reużywalne komponenty
   - Jasna struktura

6. **Wersjonowanie**
   - Używanie tagów dla obrazów Docker
   - Określanie wersji Node.js
   - Śledzenie numerów buildów

Aby użyć tego pipeline'u, należy:
1. Skonfigurować Node.js w Jenkinsie
2. Dodać poświadczenia do rejestru Docker
3. Dostosować zmienne środowiskowe
4. Upewnić się, że wszystkie wymagane pluginy są zainstalowane

Czy chciałbyś, żebym wyjaśnił któryś z aspektów bardziej szczegółowo?
