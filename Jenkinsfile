pipeline {
    agent {
      label "docker3"
   }
    environment {
	DOCKERHUB_CRED = credentials('DOCKERHUB_CRED')
        SERVICE = "megavoice-api"
        REG_AML_CRED = credentials('REG_AML_CRED')
        registry_URL = "reg-aml.esoko.com"
        // TAG_NAME = sh(returnStdout: true, script: "git tag --points-at=HEAD")
        TAG_NAME = "prod"
        imageName = "reg-aml.esoko.com/deveops-test.img/megavoice-api"
        IMAGE = "reg-aml.esoko.com/deveops-test.img/megavoice-api"
        imageTag = "${env.BUILD_ID}"
        TAG = "alpha"
        // Retrieve the credentials by ID
        USER_CREDENTIALS = credentials('dev-swarm-manager-user-password')
        STACK = "megavoice"
        commitMessage = ""

    }
      triggers {
    pollSCM('H/20 * * * *')
      }

    stages {
        stage("Build DockerFile and Tag to Dtr" ) {
            when {
                anyOf { branch 'develop'; branch 'Sprint*'; branch 'Hotfix*'; branch 'Hotfix/*'; branch 'hotfix*'; branch 'master'; branch 'feature/*' }
              }
            steps { 
		    sh "docker login --username ${DOCKERHUB_CRED_USR} --password '${DOCKERHUB_CRED_PSW}'"
		    sh "docker build -t ${env.IMAGE}:${env.TAG} ." 
		    // sh "docker login --username ${DOCKERHUB_CRED_USR} --password '${DOCKERHUB_CRED_PSW}'"
		    sh "echo '${REG_AML_CRED_PSW}' | docker login -u ${REG_AML_CRED_USR} --password-stdin ${registry_URL}"
             //sh "docker login registry.esoko.com -u admin -p Harbor12345"
		     //sh "docker tag ${IMAGE}:${TAG} dtr.esoko.com:5000/${env.IMAGE}:${env.TAG}"
		     sh "docker push ${env.IMAGE}:${env.TAG}"
             sh "docker system prune -f"
            }
        }

        stage("build - prod") {
            when {
               tag "v*; branch 'main'"
            }
            steps {
                sh "docker build -f Dockerfile.prod -t ${env.imageName}:${env.imageTag} ."
            }
        }
        stage("release") {
            when {
                tag "v*"
            }
            steps {
                sh "docker tag ${env.imageName}:${env.imageTag} ${env.imageName}:${env.TAG_NAME}"
                // sh "docker login --username ${DOCKERHUB_CRED_USR} --password '${DOCKERHUB_CRED_PSW}'"
                sh "echo '${REG_AML_CRED_PSW}' | docker login -u ${REG_AML_CRED_USR} --password-stdin ${registry_URL}"
                sh "docker push ${env.imageName}:${env.TAG_NAME}"
            }
        }

    }

    post {
        success {
            script {
                def slackMessage = "Build succeeded: ${currentBuild.fullDisplayName}"
                // slackSend(
                //     color: '#00FF00',
                //     message: slackMessage,
                //     channel: '#devops-notify'
                // )
            }
        }
        failure {
            script {
                // Get Jenkins build URL
                def buildUrl = env.BUILD_URL
                // Send Slack notification for both success and failure
                def slackMessage = "Build ${currentBuild.result}: ${currentBuild.fullDisplayName}\nError Log:${buildUrl}"

                // slackSend(
                //     color: currentBuild.result == 'FAILURE' ? '#FF0000' : '#00FF00',
                //     message: slackMessage,
                //     channel: '#devops-notify'
                // )
            }
        }        
        always {
            cleanWs(
                cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                        [pattern: '.propsfile', type: 'EXCLUDE']]
            )
        }

    }
}