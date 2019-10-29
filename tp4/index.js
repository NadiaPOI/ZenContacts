const yargs = require('yargs');

let FileContactService = require('./FileContactService');
const Cli = require('./Cli');

FileContactService = new FileContactService();
Cli.init(FileContactService);

// Exécution de yargs
yargs.argv;
