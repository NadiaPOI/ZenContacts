const yargs = require('yargs');

const FileContactService = require('./FileContactService');
const Cli = require('./Cli');

const myContacts = new FileContactService();
Cli.init(myContacts);

// Exécution de yargs
yargs.argv;
