# Deploying the backend

# Requirements

1. Amplify CLI version 12+
   `npm install `

## 1. intitialize existing Pronto project

`amplify init --app https://github.com/COS301-SE-2023/Pronto`

this command will clone the pronto git reppo and initialize backend configurations throught the amplify cli

## 2. Authenticate AWS Profile

use one of the provided options by the cli to sign-in to an aws account

## 3. Configure resource permissions and env varibles

`amplify update function`

- this will allow you to manually confirm all preset permissions by selecting `Resource access permissions` and approving each by pressing `enter`
- on the background, this attaches all the necessary roles to allow your backend to use all the shared resources accordingly
- it also configures some of the needed environment variables for it

## 4. Deploy backend

- `amplify push` will deploy the backend
- CLI will give you more options, you can choose any here
- the deployed version will not be fully functional here, as we still need more variables
- once deployed, head over to
