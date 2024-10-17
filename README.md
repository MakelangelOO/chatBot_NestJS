<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Simple API endpoint for bot chat with [Nest](https://github.com/nestjs/nest) framework  and TypeScript.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Resources And Start Process

For this project it's need necessary to consider these points:

1. It's important not to delete a csv file in the path 'src/resource' in the root directory. this is important for the API execution.
1. For start process considere the next steps:
    - execute the command in the Project setup section
    - create an .env file in the root directory with an OPEN_EXCHANGE_API_KEY varibla that contain the access api key for Open Exchenge Rates API and a second variable OPEN_API_KEY for the access api pey for OpenAI chat completion API
    - If you need to define a specific port to start the project, you can specify a PORT variable in .env file. By defualt the application listens for this variable.
    -Now you can run one of the commands in the Compile and run the Project section, all this in a terminal in the root directory.

## Execution of Endpoints
when the application is running you can use any type of method preferred by you to make the request to the following enpoints (this only abailible in localhost enviroment):

- **endpoint** `API Documentation`

    **description:** This endpoint allows you to view more specific documentation of this API in the Swagger tecnology and can run endpoints in these visual interfaces.

    **Request Example with CURL:**
    ```bash
    curl -x GET "http://localhost:3000"
    ```

- **endpoint** `Chat with Bot`

    **description:** This endpoint enables communication with the ai chat bot and allows different types of responses to be obtained. For this OpenAi Chat Completion API is used.

    **Query params:**
    | Nombre     | Tipo   | Requerido | Descripción                           |
    |------------|--------|-----------|---------------------------------------|
    | `message` | String | Yes        | This message is the request sent by the user to OpenAi.    |

    **Request Example with CURL:**
    ```bash
    curl -x POST "http://localhost:3000/chat" \
    -H "Content-Type: application/json" \
    -d '{"message": "I am looking for a phone"}'
    ```

- **endpoint** `test searchProducts`

    **description:** This endpoint enables a test to search for products in the csv file. By default the method uses 'Phone' to search for matches.

    **Request Example with CURL:**
    ```bash
    curl -x POST "http://localhost:3000/chat/searchProducts"
    ```

- **endpoint** `test convertCurrencies`

    **description:** This endpoint allows a test to change values to other exchange rates. By default the method uses twelve dollars and changes this value to the Colombian rate. For this Open Exchange Rates API is used.

    **Request Example with CURL:**
    ```bash
    curl -x POST "http://localhost:3000/chat/convertCurrencies"
    ```