# MERN Client

This project is the React + TypeScript frontend for a MERN stack application. It is built with Vite and is intended to work alongside the `server` folder in the same repository.

## Prerequisites

- Node.js 18 or newer
- npm
- A running MongoDB instance or a hosted MongoDB connection string for the backend

## Clone the Repository

Clone the repository and move into the project folder:

```bash
git clone https://github.com/kumarbisen/company.git

```

## Install Dependencies

Install dependencies for the frontend and backend separately:

```bash
cd client
npm install

cd ../server
npm install
```

If the repository later includes a root `package.json`, you may also be able to install everything from the root with:

```bash
npm install
```

## Environment Variables

Create a `.env` file inside the `server` directory and add your backend configuration:

```env
MONGODB_URI=your_mongo_connection_string
PORT=5000
```

## Run the Application Locally

Start the backend in one terminal:

```bash
cd server
npm run dev
```

Start the frontend in another terminal:

```bash
cd client
npm run dev
```

If the repository includes a root script for running both apps together, you can use:

```bash
npm run dev
```

## Available Client Scripts

Inside `client`:

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Builds the production bundle.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## Project Structure

```text
client/   React frontend
server/   Express backend
```

## Notes

- Make sure the backend is configured before starting the frontend if your app depends on API requests.
- If the backend is not implemented yet, create the server entry file and ensure the `dev` script points to it correctly.
