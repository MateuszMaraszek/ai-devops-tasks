pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    environment {
        DOCKER_REGISTRY = 'your-registry.com'
        DOCKER_IMAGE = 'your-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT_SHORT}"
        NODE_ENV = 'production'
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        ansiColor('xterm')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    npm ci --prefer-offline --no-audit
                    npm cache verify
                '''
            }
        }

        stage('Lint & Test') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'npm run lint'
                    }
                }
                stage('Unit Tests') {
                    steps {
                        sh 'npm test -- --coverage'
                    }
                    post {
                        always {
                            junit '**/junit.xml'
                            publishCoverage adapters: [istanbulCoberturaAdapter('coverage/cobertura-coverage.xml')]
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
            post {
                success {
                    archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}")
                    
                    withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', 
                                                    usernameVariable: 'DOCKER_USER', 
                                                    passwordVariable: 'DOCKER_PASS')]) {
                        sh "echo ${DOCKER_PASS} | docker login ${DOCKER_REGISTRY} -u ${DOCKER_USER} --password-stdin"
                        docker.withRegistry("https://${DOCKER_REGISTRY}") {
                            dockerImage.push()
                            // Tagowanie jako latest dla głównej gałęzi
                            if (env.BRANCH_NAME == 'main') {
                                dockerImage.push('latest')
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            script {
                def duration = currentBuild.durationString
                def status = currentBuild.currentResult
                def message = """
                    Pipeline zakończony ze statusem: ${status}
                    Czas wykonania: ${duration}
                    Numer buildu: ${env.BUILD_NUMBER}
                    Commit: ${env.GIT_COMMIT_SHORT}
                """
                echo message
            }
        }
        success {
            emailext (
                subject: "Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - Sukces",
                body: "Build zakończony sukcesem. Szczegóły: ${env.BUILD_URL}",
                to: '${DEFAULT_RECIPIENTS}'
            )
        }
        failure {
            emailext (
                subject: "Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER} - Błąd",
                body: "Build zakończony niepowodzeniem. Szczegóły: ${env.BUILD_URL}",
                to: '${DEFAULT_RECIPIENTS}'
            )
        }
    }
} 