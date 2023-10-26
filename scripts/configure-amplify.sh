#!/bin/bash
set -e
IFS='|'

echo "'${AWS_ACCESS_KEY_ID}' '${AWS_SECRET_ACCESS_KEY}'"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"amplify-dev\",\
\"accessKeyId\":\"${AWS_ACCESS_KEY_ID}\",\
\"secretAccessKey\":\"${AWS_SECRET_ACCESS_KEY}\",\
\"region\":\"us-east-1\"\
}"
AMPLIFY="{\
\"projectName\":\"pronto\",\
\"appId\":\"d1v64s62g4erwa\",\
\"envName\":\"dev\",\
\"defaultEditor\":\"Visual Studio Code\"\
}"
FRONTEND="{\
\"frontend\":\"ios\"
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"
CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"swift\",\
\"fileNamePattern\":\"graphql/**/*.graphql\",\
\"generatedFileName\":\"API.swift\",\
\"generateDocs\":true,\
\"maxDepth\":2\
}"

amplify configure project \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--codegen $CODEGEN 
