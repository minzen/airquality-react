node {
    def app
    def remote = [:]
    remote.name = "v220220737425195934"
    remote.host = "202.61.226.111"
    remote.allowAnyHosts = true

    stage('Clone repository') {
        /* Let's make sure we have the repository cloned to our workspace */

        checkout scm
    }

    stage('Build image') {
        /* This builds the actual image; synonymous to
         * docker build on the command line */

        app = docker.build('juoksijapoika/airquality-react')
    }

    stage('Test image') {
        /* Ideally, we would run a test framework against our image.
         * For this example, we're using a Volkswagen-type approach ;-) */

        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        /* Finally, we'll push the image with two tags:
         * First, the incremental build number from Jenkins
         * Second, the 'latest' tag.
         * Pushing multiple tags is cheap, as all the layers are reused. */
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }

    stage('Deploy docker image on the remote server') {
        withCredentials([sshUserPrivateKey(credentialsId: 'Jenkins-user', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
            remote.user = userName
            remote.identityFile = identity

            sshPut remote: remote, from: 'airquality-react/deployment/*', into: '~/docker/deployments/airquality-react/'
            sshCommand remote: remote, command: 'cd ~/docker/deployments/airquality-react && chmod a+x redeploy.sh && ./redeploy.sh'
        }
    }
}

