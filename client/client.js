'use strict';

var socketio = require('socket.io-client');
var rp = require('request-promise');

var ENDPOINT = 'http://localhost:3000';

getTokenAndConnectToSocketIoServer();

//////////

function getTokenAndConnectToSocketIoServer() {
   getToken()
      .then(connectToSocketIoServer)
      .catch(handleErrors);
}

function getToken() {
   var requestTokenOptions = getTokenRequestOptions();

   return sendLoginRequest(requestTokenOptions)
      .then(parseBodyAndReturnToken);
}

function getTokenRequestOptions() {
   var options = {
      method: 'POST',
      uri: ENDPOINT + '/login'
   };

   return options;
}

function sendLoginRequest(options) {
   return rp(options);
};

function parseBodyAndReturnToken(body) {
   var parsedBody = JSON.parse(body)
   return parsedBody.token;
}

function connectToSocketIoServer(token) {
   var authenticationSocketOptions = getAuthenticationSocketOptions(token);
   var socket = socketio.connect(ENDPOINT, authenticationSocketOptions);

   setEvents(socket);
}

function getAuthenticationSocketOptions(token) {
   var options = {
      query: 'token=' + token
   };

   return options;
};

function setEvents(socket) {
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

function handleErrors(error) {
   console.log('There was an error:', error);
}
