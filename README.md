# phone-login-demo

## Overview
This demo will provide a functionality for login with Phone and Otp ,using this demo one can easily understand the basic concept of phone login and generating Jwt token after verification.The Otp is triggered and verified by leveraging Twilio Verify Api.

## Instalation

- Step 1: Navigate to `credentials.js` under 
`<project-root-directory>/src/config/` and add following constant value.
  
  - ACCOUNT_SID   ([Twilio Account SID](https://www.twilio.com/docs/iam/keys/api-key))
  - AUTH_TOKEN   ([Twilio Auth Token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them))
  - SERVICE_ID   ([Twilio SMS Service Id](https://www.twilio.com/docs/verify/api))
  - JWT_KEY     `(Any Random String)`
  - MONGODB_CONNECTION_STRING  ([MongoDb Connection String](https://docs.mongodb.com/manual/reference/connection-string/))


- Step 2: Run Following Command to install all required dependency.<br>
```
npm install
``` 
- Step 3: Run Following Command start your project.<br>
```
npm start
``` 

Now you can access you project on `http://localhost:3000`