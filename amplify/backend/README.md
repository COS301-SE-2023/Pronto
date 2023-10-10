# Deploying the backend

# Requirements
1. Amplify CLI version 12+
`npm install `

## 1. intitialize existing Pronto project

`amplify init --app https://github.com/COS301-SE-2023/Pronto`

this command will clone the pronto git reppo and initialize backend configurations throught the amplify cli

## 2. Authenticate AWS Profile

use one of the provided options by the cli to sign-in to an aws account

## 3. Add env varibles for functions:

### 3.1. prontoAuthPostConfirmation

| key                | value                     |
| ------------------ | ------------------------- |
| AppClientId        | "{will-be-changed-later}" |
| AppClientIdWeb     | "{will-be-changed-later}" |
| StudentsGroupName  | studentUserPoolGroup      |
| LecturersGroupName | lecturerUserPoolGroup     |
| AdminGroupName     | adminUserPoolGroup        |

### 3.2. prontoAuthPreSignup

| key                            | value                     |
| ------------------------------ | ------------------------- |
| AppClientId                    | "{will-be-changed-later}" |
| AppClientIdWeb                 | "{will-be-changed-later}" |
| StudentsGroupName              | studentUserPoolGroup      |
| LecturersGroupName             | lecturerUserPoolGroup     |
| AdminGroupName                 | adminUserPoolGroup        |
| apiApiProntoGraphqlapiendpoint | "{will-be-changed-later}" |
| apiApiProntoGraphqlapikey      | "{will-be-changed-later}" |

the "{will-be-changed-later}" values will be changed later at step 5

### 3.3. prontoAuthPreAuthentication

### 3.4. notificationPreferanceHandler

### 3.5. announcementsHandler

### 3.6. AdminQueries28edb2f2

## 4. Configure resource permissions
`amplify update function` 
- this will allow you to manually confirm all preset permissions by selecting `Resource access permissions` and approving each by pressing `enter`
- on the background, this attaches all the necessary roles to allow your backend to use all the shared resources accordingly
- it alos configures some of the needed environment variables for it

## 5. Deploy backend

- `amplify push` will deploy the backend
- CLI will give you more options, you can choose any here
- the deployed version will not be fully functional here, as we still need more variables
- once deployed, head over to 
