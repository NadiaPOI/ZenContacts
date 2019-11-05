const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

const router = require('./Router');

exports.init = function(myContacts) {
  /* Instance d'express */
  const app = express();

  /* Chargement de socket.io */
  const server = require('http').Server(app);
  const io = socketio.listen(server);

  /* Chargement des middlewares bodyParser et server static */
  app.use(bodyParser.json());
  app.use(express.static('./public'));

  /* Routes */
  router.init(app, myContacts, io);

  /* Demarrage du serveur sur le port 8090 */
  server.listen(8090);
  //app.listen(8090);
};
