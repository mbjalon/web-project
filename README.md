# Warehouse Management System

This is a warehouse management system that allows users to manage their warehouse inventory. The system allows users to add, update, delete and view products in the warehouse. The system also allows users to view the total value of the products in the warehouse.
It is built using a Turborepo with Vite and TypeScript. The system is dockerized and can be run using Docker.

## What's inside?

This Turborepo includes the following packages and apps:

- apps/web - Frontend application
- apps/api - Backend application
- packages/\* - Shared code between the frontend and backend

## Project setup for development

Run the following command to install all the project dependencies:

```
npm install
```

See the README.md files in the `apps/web` and `apps/api` directories for more information on how to run the frontend and backend applications.

## Project setup for production - Dockerization

Create a `.env` files in the root of the project. See the `.env.example` file for the required environment variables.
Run the following command to create and start the Docker container: <pre>docker compose up</pre> This command will create and start the Docker container with the web, api and database.

To stop the Docker container, run the following command: <pre>docker compose down</pre>
