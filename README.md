# Basic jwt-based authentication using socket.io

This is a very basic example of client/server jwt-based authentication using _socket.io_.

The repo consists of two directories:

- **/server**: contains a very basic _Express_/_socket.io_ server app
- **/client**: contains a very basic _socket.io_ client app

## The server

 Consists of a very basic _Express_ app that exposes single POST method that always returns a valid JWToken:

- **POST /login**
   - **returns** a JSON object with the authentication token: `{ "token": "...jwt..." }`

and a _socket.io_ server that will use jwt-based authentication. If a client tries to connect without a token, connection will be refused with a `Not authorized` error.

### Launch the server

Just go to the server's directory (`/server`) and type `$ npm start` in your terminal.

## The client

Consists of a very basic _socket.io_ client that will connect to the server. Previously, an http request is done to the server's **/login** method to authenticate and retrieve a valid token that will be used from that moment to connect to the _socket.io_ server.

### Launch the client

Just go to the server's directory (`/client`) and type `$ npm start` in your terminal _(*)_.

_(*): You will need to launch the server first, otherwise the client will obviously not work._
