please follow these instructions to run the project

requirments :

1. mongodb must be installed annd it must be running on PORT '27017'.

instructions :

1. run 'npm install .' command to install all dependencies.
2. run 'npm start' command to start server on port 8080.

endpoints:

signup-endpoint - http://localhost:8080/api/auth/signup

login-endpoint - http://localhost:8080/api/auth/login
it returns accessToken.

set Authorization header to 'Bearer {accessToken}' while using employee endpoints
employee-create - http://localhost:8080/api/employees
employee-get - http://localhost:8080/api/employees/{id}
employee-update - http://localhost:8080/api/employees/{id}
employee-delete - http://localhost:8080/api/employees/{id}

Database-
employee-attributes = name , age , salary , departmentId , createdById
