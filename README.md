# Overview

This is a basic link-rendering app, allowing CRUD operations on a link + description, and functionalities to generate a QR code from it.

## Backend

The backend is built as a FastAPI app due to its easy integration with `pytest` and `starlette`, allowing for easy exception handling.

### Database

We use MongoDB as the database, with `mongoose` and `mongomock` as the libraries interfacing with it.

### Testing

We implement simple tests with `pytest` on all CRUD operations.

## Frontend

The frontend is built as a `react` app in `typescript` with pre-built styled components from Material UI. Nothing particularly fancy.

## Serverless functions

To implement the qr-code generation functionality, we use [qr-code-generator](https://app.qr-code-generator.com/manage)'s free API and implement it serverless with
`AWS Lambda` and an API gateway sitting in front of it.

## CI and CD

We use github actions for CI and CD, deploying to AWS. Specifically, we use `CodeDeploy` to push code to an EC2 instance.

## Docker

The backend is fully dockerized. See `docker-compose.yml` for more details.
