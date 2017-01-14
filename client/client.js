'use strict';

var socketio = require('socket.io-client');
var rp = require('request-promise');

var options = {
   method: 'POST',
   uri: 'http://localhost:3000/login'
};

rp(options)
   .then(function (body) {
      body = JSON.parse(body)
      connectSocket(body.token);
   })
   .catch(function (err) {
      console.log('post failed, error:', err.message);
   });

///////////

function connectSocket(token) {
   var socket = socketio.connect('http://localhost:3000', {
      query: 'token=' + token
   });

   socket
      .on('connect', onConnect)
      .on('disconnect', onDisconnect);
}

function onConnect() {
   console.log('successfully authenticated!');
}

function onDisconnect() {
   console.log('disconnected');
}
