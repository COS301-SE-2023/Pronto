#!/bin/bash
set -e
IFS='|'

# echo "Secrets are `${APP_ID}`"

# AWSCLOUDFORMATIONCONFIG="{\
# \"configLevel\":\"project\",\
# \"useProfile\":true,\
# \"profileName\":\"amplify-dev\",\
# \"accessKeyId\":\"${AWS_ACCESS_KEY_ID}\",\
# \"secretAccessKey\":\"${AWS_SECRET_ACCESS_KEY}\",\
# \"region\":\"us-east-1\"\
# }"
# AMPLIFY="{\
# \"projectName\":\"pronto\",\
# \"appId\":\"${APP_ID}\",\
# \"envName\":\"dev\",\
# \"defaultEditor\":\"Visual Studio Code\"\
# }"
# FRONTEND="{\
# \"frontend\":\"ios\"
# }"
# PROVIDERS="{\
# \"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
# }"

# CODEGEN="{\
# \"generateCode\":true,\
# \"codeLanguage\":\"swift\",\
# \"fileNamePattern\":\"graphql/**/*.graphql\",\
# \"generatedFileName\":\"API.swift\",\
# \"generateDocs\":true,\
# \"maxDepth\":2\
# }"

# amplify configure project \
# --amplify $AMPLIFY \
# --frontend $FRONTEND \
# --providers $PROVIDERS \
# --codegen $CODEGEN \
# --yes