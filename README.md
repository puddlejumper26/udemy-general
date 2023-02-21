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

## Resources

https://github.com/londonappbrewery/Authentication-Secrets
