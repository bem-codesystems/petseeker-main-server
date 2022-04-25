def buildArtifactAndPushToRegistry() {
    withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
       sh "docker build -t oadrianoo/node-ext:1.${env.BUILD_TAG} ."
       sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin"
       sh "docker push oadrianoo/node-ext:1.${env.BUILD_TAG}"
    }
    echo 'Start build process...'
    echo "Build tag:${env.BUILD_TAG}"
    echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
}

def testApp() {
    echo 'Start testing process...'
}

def deployApp() {
    echo "Deploying the application..."
}
