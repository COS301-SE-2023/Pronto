/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_cognito_identity_pool_id": process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_USER_POOLS_WED_ID,
    "oauth": {},
    "aws_cognito_username_attributes": [
        process.env.REACT_APP_ATTRIBUTE1
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        process.env.REACT_APP_ATTRIBUTE1,
        process.env.REACT_APP_ATTRIBUTE2,
        process.env.REACT_APP_ATTRIBUTE3
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        process.env.REACT_APP_ATTRIBUTE4
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": process.env.REACT_APP_POLICY1,
        "passwordPolicyCharacters": [
            process.env.REACT_APP_POLICY2,
            process.env.REACT_APP_POLICY3,
            process.env.REACT_APP_POLICY4,
            process.env.REACT_APP_POLICY5
        ]
    },
    "aws_cognito_verification_mechanisms": [
        process.env.REACT_APP_ATTRIBUTE1
    ],
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_appsync_authenticationType": process.env.APPSYNC_AUTHENTICATION_TYPE,
    "aws_appsync_apiKey": process.env.REACT_APP_APPSYNC_API_KEY,
    "aws_user_files_s3_bucket": process.env.REACT_APP_USER_FILES_S3_BUCKET,
    "aws_user_files_s3_bucket_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_mobile_analytics_app_id": "b0903c0a9550406485140d3a536aa564",
    "aws_mobile_analytics_app_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "Analytics": {
        "AWSPinpoint": {
            "appId": process.env.REACT_APP_APP_ID,
            "region": process.env.REACT_APP_AWS_PROJECT_REGION
        }
    },
    "Notifications": {
        "Email": {
            "AWSPinpoint": {
                "appId": process.env.REACT_APP_APP_ID,
                "region": process.env.REACT_APP_AWS_PROJECT_REGION
            }
        }
    }
};


export default awsmobile;

