# Simple Authentication Backend

This Simple Simple Authentication backend is built using TypeScript-Express service using PostgreSQL. It provides server-side functionalities for the Simple Authentication, allowing users to Authenticate User and Updating User profile,

## Useful Links

-   [API Documentation](https://documenter.getpostman.com/view/24159172/2s9YeD7Xo1)
-   [Personal Website](https://disinibale.com)

## Table of Contents

- [Simple Authentication Backend](#simple-authentication-backend)
  - [Useful Links](#useful-links)
  - [Table of Contents](#table-of-contents)
  - [Folder Structure](#folder-structure)
  - [API Endpoint Structure](#api-endpoint-structure)
  - [How to Run the Service on a Local Machine](#how-to-run-the-service-on-a-local-machine)
  - [Run the application using Docker](#run-the-application-using-docker)
  - [Testing](#testing)

## Folder Structure

The project follows a well-organized folder structure to maintain code readability and scalability:

```
├── src
│ ├── __test__
│ ├── app
│ │ ├── controllers
│ │ ├── middlewares
│ │ ├── routes
│ │ ├── services
│ | ├── exceptions
│ | ├── services
│ │ └── utils
│ ├── config
│ ├── database
│ ├── models
│ ├── types
│ ├── logger.ts
│ ├── server.ts
│ └── main.ts
├── .env.example
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
├── package.json
└── package-lock.json
```

## API Endpoint Structure

The backend exposes the following API endpoints:

-   `POST api/v1/auth/register`: Register a new user.
-   `POST api/v1/auth/login`: Authenticate the user and generate a JWT token.
-   `GET api/v1/profile`: Get the user's profile information.
-   `PUT api/v1/profile`: Update the user's profile.

## How to Run the Service on a Local Machine

To run the Simple Authentication backend on your local machine, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/disinibale/usedealls-tech-test.git
```

2. Install the required dependencies

```bash
npm install
```

3. Set up your PostgreSQL database and update the .env file with your database credentials.

```bash
NODE_ENV    ="development"
PORT        ="5000"
JWT_SECRET  ="supersecretkey"

DB_HOST     ="YOUR_DATABASE_HOST"
DB_PORT     ="YOUR_DATABASE_PORT"
DB_SCHEMA   ="YOUR_DATABASE_SCHEMA"
DB_NAME     ="YOUR_DATABASE_NAME"
DB_USERNAME ="YOUR_DATABASE_USER"
DB_PASSWORD ="YOUR_DATABASE_PASS"
```

1. I programmed this code to generate all needed data for testing, so you can run immediately using this command:

```
npm run dev
```

The backend will be up and running at `http://localhost:5000` as the default port

## Run the application using Docker

To run the Simple Authentication backend on your local machine, follow these steps:

1. Create the docker image from the existing Dockerfile from cmd by copy this command
    ```bash
    docker build -t auth-backend .
    ```
2. Run the docker container using `docker-compose` command by copy this command
    ```
    docker-compose up -d
    ```

## Testing

This is a List of the test cases that can be used to test the correctness of the systems :

```
Authentication API
√ Should register a new user (215 ms)
√ Should check if the email is already registered (35 ms)
√ Should authenticate the created user (61 ms)

Profile API
√ should get the user's own profile (27 ms)
√ should update the user's profile (67 ms)
```

To run the test you could simply copying this command to your CLI :

```bash
npm run test
```

Note: Before you can run the test, make sure you have run the migration first so the data would be populated.
