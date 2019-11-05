const yargs = require('yargs');
const server = require('./Server');

exports.init = function(myContacts) {
  // Définition d'une commande list qui appelle une fonction
  yargs
    .command({
      command: 'list',
      alias: 'ls',
      desc: 'List all contacts',
      handler: () => myContacts.close()
    })
    .command({
      command: 'add',
      alias: 'a',
      desc: 'Add a new contact to the list',
      builder: (yargs) =>
        yargs
          .options('lastname', {
            alias: 'ln',
            desc: 'Add lastname to new contact',
            type: 'string'
          })
          .options('firstname', {
            alias: 'fn',
            desc: 'Add firstname to new contact',
            type: 'string'
          }),
      handler: (argv) =>
        myContacts.add(argv.lastname, argv.firstname, () => myContacts.close())
    })
    .command({
      command: 'delete',
      alias: 'del',
      desc: 'Remove a contact from the list',
      builder: (yargs) =>
        yargs.options('id', {
          alias: 'i',
          desc: 'Remove contact of id',
          type: 'number'
        }),
      handler: (argv) => myContacts.delete(argv.id, () => myContacts.close)
    })
    .command({
      command: 'watch',
      alias: 'w',
      desc: 'Watch if contacts.json changed',
      handler: () => myContacts.watch(() => myContacts.print())
    })
    .command({
      command: 'server',
      alias: 'sv',
      desc: 'Init server',
      handler: () => server.init(myContacts)
    })
    .options('colors', {
      alias: 'c',
      desc: 'add colors to lastName and firstName in console'
    })
    .help();
};
