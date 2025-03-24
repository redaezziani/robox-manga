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

        stage('Build and Start New Containers') {
            steps {
                script {
                    // Navigate to the Docker Compose directory and rebuild/start containers
                    dir(DOCKER_COMPOSE_DIR) {
                        // Rebuild and start the containers in detached mode with a different name (e.g., app_new)
                        sh 'docker-compose -f docker-compose.yml -p app_new up --build -d' 
                    }
                }
            }
        }

        stage('Check New Containers') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // Check if the new containers are up and running
                        sh 'docker ps'  // List running containers to verify the new containers
                    }
                }
            }
        }

        stage('Switch Traffic to New Containers') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // You can use a reverse proxy or load balancer to switch traffic
                        // For simplicity, we assume your Docker Compose setup handles the routing
                        // This can be done by either updating the environment variables
                        // or switching the service to point to the new containers.
                        // Example:
                        // sh 'docker-compose -f docker-compose.yml -p app_new down' 
                        // sh 'docker-compose -f docker-compose.yml -p app_old up -d'
                    }
                }
            }
        }

        stage('Stop and Remove Old Containers') {
            steps {
                script {
                    dir(DOCKER_COMPOSE_DIR) {
                        // Stop and remove the old containers only after switching traffic
                        sh 'docker-compose -f docker-compose.yml -p app_old down'  // Down old containers
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
