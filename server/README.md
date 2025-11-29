# GradeBuddy - Server (Express + MongoDB)

This folder contains a minimal Express server using Mongoose to store assignments.

## Setup

1. Install dependencies:

```cmd
cd server
npm install
```

2. Create a `.env` file by copying the example and filling your MongoDB Atlas URI:

```cmd
cd server
copy .env.example .env
```

Open `.env` and set `MONGO_URI` to your Atlas connection string.

3. Run the server locally:

```cmd
cd server
npm run start
```

For development with automatic reload (requires `nodemon`):

```cmd
cd server
npm run dev
```

The server will be available at `http://localhost:4000` and exposes:

- `GET /api/health` — simple health check
- `GET /api/assignments` — list assignments
- `POST /api/assignments` — create a new assignment (JSON body)

## Example: create assignment with `curl` (Windows cmd)

```cmd
curl -X POST http://localhost:4000/api/assignments -H "Content-Type: application/json" -d "{\"title\":\"Test\",\"description\":\"Hello\"}"
```

## Deploy

You can deploy this server to services like Render, Railway, or Heroku. Make sure to set the `MONGO_URI` environment variable in the host's settings.
