#!/bin/bash
set -e
IFS='|'

echo "'${AWS_ACCESS_KEY_ID}' '${AWS_SECRET_ACCESS_KEY}'"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"accessKeyId\":\"${AWS_ACCESS_KEY_ID}\",\
\"secretAccessKey\":\"${AWS_SECRET_ACCESS_KEY}\",\
\"region\":\"us-east-1\"\
}"
AMPLIFY="{\
\"projectName\":\"pronto\",\
\"appId\":\"d1v64s62g4erwa\",\

\"envName\":\"dev\",\
\"defaultEditor\":\"code\"\
}"
FRONTEND="{\
\"frontend\":\"ios\"
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS 
