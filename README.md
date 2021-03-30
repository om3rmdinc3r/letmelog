# LetMeLog URL Status Logger App
This project created on behalf of [Ekinoks Software](https://github.com/EkinoksSoftware) 
#### Version: 0.1.0

#### Main dev tools used:
`NodeJS & ExpressJS` - `KnexJS (^0.95.1)` - `PostgreSQL` - `Typescript` - `EJS` and `Axios`

#### Other Dependencies
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [bcryptJS](https://www.npmjs.com/package/bcryptjs)
- [Joi](https://joi.dev/api/?v=17.4.0)
- [CORS](href="https://www.npmjs.com/package/cors)
- [Helmet](https://helmetjs.github.io/)
- [PassportJS](http://www.passportjs.org/)

#### How to run (As Default)
```
1.) Create database named letmelog-db.
2.) Edit Database credentials on .env file (DB_USER / DB_PASSPORT etc.)
3.) Run these following commands:

    $ yarn                  - Installs all node modules
    $ yarn run mig          - Runs all migration scripts
    $ yarn run seed         - Runs all seed scripts (Defaultly,Not Seed File Provided , see database/Seeds)
    $ yarn run dev          - Starts app on port 4836(Default)
4.) Go to http://localhost:4836 on browser

```
#### How To Use
```
1-) Register
2-) Login using your username/password
3-) Defaultly , no 'Tasks' ('Request') provided. Add a new 'Task'.
 -> While adding new 'Task' , be sure that url given is true , otherwise 'Log' will saved with 404 (Not Found)
4-) Assumes period as minute. Bigger periods give longer time between 'Logs'
5-) Deleting 'Requests' will cancel and delete 'Task' , but 'Log' or 'Logs'.
6-) Deleting an 'User' will delete all 'Requests' and 'Logs'. Please be careful
```

#### To-Do List
```
- Add Request Table Pagination
- Add Ordering Parameters For All Tables
- Add Request Update (On Front-End)
- Add User Update and Pagination
- Fix User Self Delete Error
- Fix Endpoint Responses
- Update New Front-End
```

### Note :
----
*.env file only shared for dev purposes*

#### Documentation and Postman Test
Documentation will be soon provided.

