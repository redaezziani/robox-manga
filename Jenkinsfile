pipeline {
    agent any

    environment {
        // Define your Docker Compose project directory
        DOCKER_COMPOSE_DIR = '/root/robox-manga'  // Update this if the location of docker-compose.yml is different
        GIT_REPO_URL = 'https://github.com/redaezziani/robox-manga.git'  // Your GitHub repo URL
        GIT_BRANCH = 'reda'  // Correct branch you're working with
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        sh "git checkout ${GIT_BRANCH}"  // Ensure we're on the correct branch
                        sh 'git pull origin reda'  // Pull the latest changes from the "reda" branch
                    }
                }
            }
        }

        stage('Stop and Remove Old Containers') {
            steps {
                script {
                    // Navigate to the Docker Compose directory and stop/remove old containers
                    dir(DOCKER_COMPOSE_DIR) {
                        sh 'docker-compose down'  // Stops and removes old containers
                    }
                }
            }
        }

        stage('Build and Start New Containers') {
            steps {
                script {
                    // Navigate to the Docker Compose directory and rebuild/start containers
                    dir(DOCKER_COMPOSE_DIR) {
                        sh 'docker-compose up --build -d'  // Rebuild and start the containers in detached mode
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker system after the build to remove unused images and containers
            sh 'docker system prune -f'
        }
    }
}
