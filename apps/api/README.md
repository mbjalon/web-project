# Backend api

## Project setup for development

Create a `.env` files. See the `.env.example` file for an example.

Install all the project dependencies by running the following command:

```
npm install
```

Start the database using Docker with the following command:

```
docker run -d --name pb138-team-project -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=mydb postgres
```

To generate the prisma client run the following command:

```
npx prisma generate
```

To start the development server run the following command:

```
npm run dev
```

## Seed the database

Run the following command to reset the database:

```
npx prisma migrate reset
```

To seed the database with some initial data run the following command:

```
npm run db:seed
```

### API documentation

The API documentation is available at the following URL:

```
http://localhost:3000/api-documentation
```

Port is defined in the `.env` file.
