const yargs = require('yargs');

const FileContactService = require('./FileContactService');
const Cli = require('./Cli');
const server = require('./Server');

const myContacts = new FileContactService();
server.init(myContacts);
Cli.init(myContacts);

// Exécution de yargs
yargs.argv;
