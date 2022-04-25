def gv
pipeline {

    agent any

    stages {
        stage('Init') {
            script {
                gv = load "script.groovy"
            }
        }
        stage('Build Docker Image and Push to Registry') {
            steps {
                script {
                   gv.buildArtifactAndPushToRegistry()
                }
            }
        }
        stage('Test') {
            steps {
                gv.testApp()
            }
        }
        stage('Deploy') {
            steps {
                gv.deployApp()
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
