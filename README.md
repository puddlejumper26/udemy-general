# Purposes

This is the practices based on the Udemy courses of `The Complete Web Development Bootcamp`

# Authentication

## Normal login

    - First level of authentication
    - could check the password directly in the browser or console or DB

## .env

    - dotenv
    - second level of authentication
    - could only checked the encrypted value of password
    - but need the .env file to store the secret key

## hashing

    - md5
    - third level of authentication
    - could only check the hashing value of password

## salting

    - salt will be stored in DB
    - salt combines password passed in
    - bcrypt
    - salt rounds

## cookies and sessions

    - npm install
        - passport
            - https://zhuanlan.zhihu.com/p/35877677
            - https://github.com/jwalton/passport-api-docs
        - passport-local
        - passport-local-mongoose
        - express-session
            - https://www.cnblogs.com/loaderman/p/11506682.html
    - chekc

## OAuth

    - Granular Access Levels
    - Read / Read + Write access
    - Revoke access
    - Steps
    - - Assumen we develop an APP called 'B'
    - - - Customer has facebook account
    - - - Customer wants to login 'B' with facebook account
    - - 1. Set up the 'B' into the facebook developer console
    - - - return to us with clientId or AppId,
    - - - we send request to facebook to authenticate our user
    - - 2. Redirect to Authentication
    - - - on our login page we have option to login in facebook
    - - 3. User logs in
    - - - user clicked login, then navigated to actual facebook login
    - - 4. User grants permissions
    - - 5. Our app receives Authorization code (AuthCode) from facebook
    - - - allows us to check whether user is logged in facebook with right username and password
    - - - AuthCode is like a one-time ticket
    - - - AuthCode is to authenticate user successfully managed to login facebook
    - - 6. Exchange AuthCode fro Access Token
    - - - we send back the AuthCode to Facebook
    - - - facebook send us the Access Token
    - - - we save the Access Token in our DB
    - - - this token will be valid for a long time (than AuthCode)
    - - - Access Token is like a year pass
    - - - Access Token is we will use to access pieces of information that are stored on that user's account on the third party website

## Resources

https://github.com/londonappbrewery/Authentication-Secrets
