# sruta maze solver

This app aims to show how to structure a project while solves a maze using a given solver.

The whole project was build using dependency injection to improve decoupling and ease of testing.

## Run guide

`npm install && npm run build && npm run start`

The server starts at https://localhost:8080

## Test guide

`npm run test`

## Rest Api Usage

> POST /maze/autogenerate > creates and stores the base maze given in the exercise.

- `curl --location --request POST 'localhost:8080/maze/autogenerate'`

> POST /maze > creates and stores the given maze layout if mets the requirements.

- `curl --location --request POST 'localhost:8080/maze' --header 'Content-Type: application/json' --data-raw '{ "layout": [["A", "B","A"],["A", "A", "A"], ["A", "A", "B"]] }'`

> GET /maze/:id > returns the stored maze with the given id, if exists.

- `curl --location --request GET 'localhost:8080/maze/a5b67106-a313-4f71-988b-69d85b57c7b1'`

> POST /maze/:id/solve > tries to solve the maze using the current solver and returns the layout with the solution if it finds one. For a better view of the solution check the backend console.

- `curl --location --request POST 'localhost:8080/maze/a5b67106-a313-4f71-988b-69d85b57c7b1/solve'`

## Project structure

- dist: contains the compiled code
- src: source code
  - app.ts: sets up the application and starts the server
  - container.ts: initializes the container (singleton) wich will provide the dependencies
  - routes: defines the routes of the API
  - schemas: defines the schemas for further request validation
  - controllers: defines the controllers wich will perform the http-layer checks and returns the results or errors. Performs the transformations between the http-layer and business-layer
  - services: implements the business logic of the applications
  - repositories: decuople the services from the storage engines
  - persistence: defines the storage engines
  - utils: in this case we have the maze solver algorithms
  - interfaces: defines the typescript interfaces to be used in the application
- test
  - unit: contains the unit tests
