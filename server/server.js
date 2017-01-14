'use strict';

// jwt
var jwt = require('jsonwebtoken');
var socketioJwt = require('socketio-jwt');

// express server
var app = require('express')();
var http = require('http').Server(app);

// socket io server
var socketio = require('socket.io');
var sio = socketio.listen(http);
var sockets = sio.sockets;

// constants
var JWT_SECRET = 'jwt_secret';

// socket io server set up
sio.set('authorization', socketioJwt.authorize({
   secret: JWT_SECRET,
   handshake: true
}));

sockets.on('connection', onConnection);

// express server set up
app.post('/login', login);

http.listen(3000, function listen() {
   console.log('listening on *:3000');
});

// socket io server set up functions ///////////////////////////////////////////

function onConnection(socket) {
   console.log(socket.client.request.decoded_token.email, 'connected');
}

// express server set up functions /////////////////////////////////////////////

function login(req, res) {

   // NOTE: To keep it simple,
   // we are not validating any user-password or credentials.

   var profile = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john@doe.com'
   };

   var token = jwt.sign(profile, JWT_SECRET, { expiresIn: 60 * 5 });

   res.send({ token: token });
}
