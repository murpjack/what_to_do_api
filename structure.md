## API File structure

```
dist
|   # exactly the same as the src
|   ...

lib
|   quicktype
|   ...
|___


(container)
|   Dockerfile
|   docker-compose.yml
|   .dockerignore


.prettierrc
eslint.json
tsconfig.json ...
jest.config.json
.env


src
|   # entry to project
|   index{.ts}
|   # importing a server(app) allows isolated testing
|   app{.ts}
|
|
|___seeds
|   |   # data for seeding
|   |   hospitality_venue.json
|   |   entertainment_venue.json
|   |   ...
|
|
|___controllers
|   |   hospitalityController{.ts}
|   |   entertainmentController{.ts}
|   |   ...
|
|
|___db
|   |   # describe a db connection
|   |   index{.ts}
|
|
|___ _test_
|   |   # a mix of dynamically generated tests and bespoke
|   |   ...
|
|
|___routes
|   |   # any routes - eg. controllers - are connected to the server here
|   |   index{.ts}
|
|
|___types
|   |   # dynamically generated by quicktype script
|   |   ...
|
|___

```
