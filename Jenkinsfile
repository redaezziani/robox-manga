pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_DIR = '/var/lib/jenkins/robox-manga'  // Updated to the new location
        GIT_REPO_URL = 'https://github.com/redaezziani/robox-manga.git'  // Your GitHub repo URL
        GIT_BRANCH = 'reda'  
    }

    stages {
        stage('Checkout Code from GitHub') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // Ensure no local changes or untracked files interfere with the pull
                        sh 'git reset --hard'  // Discards any local changes, resetting the working directory
                        sh 'git clean -fd'  // Removes untracked files and directories
                        sh "git checkout ${GIT_BRANCH}" 
                        sh 'git pull origin reda'  // Pull the latest changes from the remote repository
                    }
                }
            }
        }

        stage('Stop and Remove Old Containers') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        sh 'docker-compose down'  // Stop and remove old containers
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
