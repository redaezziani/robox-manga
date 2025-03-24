pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_DIR = '/var/lib/jenkins/robox-manga'
        GIT_REPO_URL = 'https://github.com/redaezziani/robox-manga.git'
        GIT_BRANCH = 'reda'
        NEW_PORT = '3001'
        PROD_PORT = '3000'
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        sh 'git reset --hard'
                        sh 'git clean -fd'
                        sh "git checkout ${GIT_BRANCH}"
                        sh 'git pull origin reda'
                    }
                }
            }
        }

        stage('Deploy New Version') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // First, try to stop any existing new deployment
                        sh 'docker-compose -f docker-compose.yml -p app_new down || true'
                        
                        // Modify the port in docker-compose.yml for the new deployment
                        sh "sed -i 's/- \"3000:3000\"/- \"${NEW_PORT}:3000\"/' docker-compose.yml"
                        
                        // Start new deployment
                        sh 'docker-compose -f docker-compose.yml -p app_new up --build -d'
                        
                        // Wait for the application to be ready
                        sh 'sleep 30'
                    }
                }
            }
        }

        stage('Verify New Deployment') {
            steps {
                script {
                    def response = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:${NEW_PORT}", returnStdout: true).trim()
                    if (response != "200") {
                        error "New deployment is not healthy!"
                    }
                }
            }
        }

        stage('Switch to New Version') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // Stop the old deployment
                        sh 'docker-compose -f docker-compose.yml -p app_old down || true'
                        
                        // Update port back to production port
                        sh "sed -i 's/- \"${NEW_PORT}:3000\"/- \"${PROD_PORT}:3000\"/' docker-compose.yml"
                        
                        // Stop new deployment
                        sh 'docker-compose -f docker-compose.yml -p app_new down'
                        
                        // Start as production deployment
                        sh 'docker-compose -f docker-compose.yml -p app_old up -d'
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
        failure {
            script {
                dir(DOCKER_COMPOSE_DIR) {
                    // Restore original port in docker-compose.yml
                    sh "sed -i 's/- \"${NEW_PORT}:3000\"/- \"${PROD_PORT}:3000\"/' docker-compose.yml"
                }
            }
        }
    }
}
