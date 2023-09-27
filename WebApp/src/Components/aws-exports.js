/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_cognito_identity_pool_id": process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
    "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    "oauth": {},
    "aws_cognito_username_attributes": [
        process.env.REACT_APP_AWS_COGNITO_USERNAME_ATTRIBUTES
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        process.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES_EMAIL,
        process.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES_FAMILY_NAME,
        process.env.REACT_APP_AWS_COGNITO_SIGNUP_ATTRIBUTES_NAME
    ],
    "aws_cognito_mfa_configuration": process.env.REACT_APP_AWS_COGNITO_MFA_CONFIGURATION,
    "aws_cognito_mfa_types": [
        process.env.REACT_APP_AWS_COGNITO_MFA_TYPES
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": process.env.REACT_APP_AWS_COGNITO_PASSWORD_POLICY_MIN_LENGTH,
        "passwordPolicyCharacters": [
            process.env.REACT_APP_AWS_COGNITO_PASSWORD_POLICY_CHARACTERS_LOWERCASE,
            process.env.REACT_APP_AWS_COGNITO_PASSWORD_POLICY_CHARACTERS_UPPERCASE,
            process.env.REACT_APP_AWS_COGNITO_PASSWORD_POLICY_CHARACTERS_NUMBERS,
            process.env.REACT_APP_AWS_COGNITO_PASSWORD_POLICY_CHARACTERS_SYMBOLS
        ]
    },
    "aws_cognito_verification_mechanisms": [
        process.env.REACT_APP_AWS_COGNITO_VERIFICATION_MECHANISMS
    ],
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    "aws_appsync_region": process.env.REACT_APP_AWS_APPSYNC_REGION,
    "aws_appsync_authenticationType": process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATION_TYPE,
    "aws_appsync_apiKey": process.env.REACT_APP_AWS_APPSYNC_API_KEY,
    "aws_user_files_s3_bucket": process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET,
    "aws_user_files_s3_bucket_region": process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION,
    "aws_mobile_analytics_app_id": process.env.REACT_APP_AWS_MOBILE_ANALYTICS_APP_ID,
    "aws_mobile_analytics_app_region": process.env.REACT_APP_AWS_MOBILE_ANALYTICS_APP_REGION,
    "Analytics": {
        "AWSPinpoint": {
            "appId": process.env.REACT_APP_ANALYTICS_AWS_PINPOINT_APP_ID,
            "region": process.env.REACT_APP_ANALYTICS_AWS_PINPOINT_REGION
        }
    },
    "Notifications": {
        "Email": {
            "AWSPinpoint": {
                "appId": process.env.REACT_APP_NOTIFICATIONS_EMAIL_AWS_PINPOINT_APP_ID,
                "region": process.env.REACT_APP_NOTIFICATIONS_EMAIL_AWS_PINPOINT_REGION
            }
        }
    }
};

export default awsmobile;
