const yargs = require('yargs');

const FileContactService = require('./FileContactService');
const MongoContactService = require('./MongoContactService');
const Cli = require('./Cli');

//const myContacts = new FileContactService();
debugger;
const myContacts = new MongoContactService();
debugger;
Cli.init(myContacts);

// Exécution de yargs
yargs.argv;
