const express = require('express');
const bodyParser = require('body-parser');

const router = require('./Router');

exports.init = function(myContacts) {
  /* Instance d'express */
  const app = express();

  /* Chargement des middlewares bodyParser et server static */
  app.use(bodyParser.json());
  app.use(express.static('./public'));

  /* Routes */
  router.init(app, myContacts);

  /* Demarrage du serveur sur le port 8090 */
  app.listen(8090);
};
