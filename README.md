# Maria Beauty booking website

## Application folders

- `client-react/` is the official React/Vite frontend.
- `server/` is the Express API.
- `client/` is an unused, empty scaffold retained temporarily until its removal is reviewed.

Use fictional client and payment data during development. Authentication, persistent encrypted storage, and live payment processing are not implemented yet.

## Environment configuration

Copy `server/.env.example` to `server/.env` and `client-react/.env.example` to `client-react/.env`. The example files contain no working credentials and are safe to commit. Real `.env` files are ignored by Git.

All `VITE_` variables are visible in the client's browser bundle. Only public identifiers belong there; private Square/Klarna credentials, database URLs, email keys, and webhook keys belong on the server.

## Run locally

Frontend:

```sh
cd client-react
npm install
npm run dev
```

API (in a second terminal):

```sh
cd server
npm install
npm run dev
```
