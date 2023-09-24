/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.
const awsmobile = {
    "aws_project_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_mobile_analytics_app_id": process.env.REACT_APP_AWS_MOBILE_ANALYTICS_APP_ID,
    "aws_mobile_analytics_app_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "Analytics": {
        "AWSPinpoint": {
            "appId": process.env.REACT_APP_AWS_MOBILE_ANALYTICS_APP_ID,
            "region": process.env.REACT_APP_AWS_PROJECT_REGION
        }
    },
    "Notifications": {
        "Email": {
            "AWSPinpoint": {
                "appId": process.env.REACT_APP_AWS_MOBILE_ANALYTICS_APP_ID,
                "region": process.env.REACT_APP_AWS_PROJECT_REGION
            }
        }
    },
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT,
    "aws_appsync_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_appsync_authenticationType": process.env.REACT_APP_AWS_APPSYNC_AUTHENTICATION_TYPE,
    "aws_appsync_apiKey": process.env.REACT_APP_AWS_APPSYNC_API_KEY,
    "aws_cognito_identity_pool_id": process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
    "aws_cognito_region": process.env.REACT_APP_AWS_PROJECT_REGION,
    "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    "oauth": {},
    "aws_cognito_username_attributes": [
        process.env.REACT_APP_EATTRIBUTE
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        process.env.REACT_APP_EATTRIBUTE,
        process.env.REACT_APPFNATTRIBUTE,
        process.env.REACT_APPNATTRIBUTE
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        process.env.REACT_APP_COMMUNICATION
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            process.env.REACT_APP_REQUIREMENT_ONE,
            process.env.REACT_APP_REQUIREMENT_TWO,
            process.env.REACT_APP_REQUIREMENT_THREE,
            process.env.REACT_APP_REQUIREMENT_FOUR
        ]
    },
    "aws_cognito_verification_mechanisms": [
        process.env.REACT_APP_EATTRIBUTE
    ]
};


export default awsmobile;