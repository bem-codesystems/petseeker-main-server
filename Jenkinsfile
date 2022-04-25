pipeline {

    agent any

    stages {
        stage('Build Docker Image and Push to Registry') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                        sh "docker build -t oadrianoo/node-ext:1.${env.BUILD_TAG} ."
                        sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin"
                        sh "docker push oadrianoo/node-ext:1.${env.BUILD_TAG}"
                    }
                }
                echo 'Start build process...'
                echo "Build tag:${env.BUILD_TAG}"
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
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
    post {
        success {
            slackSend channel: '#server',
            color: 'green',
            message: "The pipeline ${currentBuild.fullDisplayName} completed succesfully."
        }
        failure {
            echo 'FAILURE'
        }

    }
}
