pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                sh ""
                echo 'Start build process...'
                echo "Build tag:${env.BUILD_TAG}"
                echo "Running ${env.BUILD_ID} ON {env.JENKINS_URL}"
            }
        }
        stage('Test') {
            steps {
                echo 'Start testing process...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
            }
        }
    }
}
