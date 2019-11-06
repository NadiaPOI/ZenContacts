const yargs = require('yargs');

const FileContactService = require('./FileContactService');
const MongoContactService = require('./MongoContactService');
const Cli = require('./Cli');

//const myContacts = new FileContactService();
const myContacts = new MongoContactService();
Cli.init(myContacts);

// Exécution de yargs
yargs.argv;
