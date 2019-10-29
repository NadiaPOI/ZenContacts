const _ = require('lodash');
const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');

class Contact {
  constructor(id, lastName, firstName, address, phone) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.phone = phone;
  }

  toString() {
    let lastName = this.lastName.toUpperCase();
    let firstName = this.firstName;

    if (yargs.argv.c) {
      lastName = chalk.blue(lastName);
      firstName = chalk.red(firstName);
    }

    return `${lastName} ${firstName}`;
  }
}

class ContactService {
  constructor(contacts) {
    this.contacts = data.map((contact) => {
      return new Contact(
        contact.id,
        contact.lastName,
        contact.firstName,
        contact.address,
        contact.phone
      );
    });
  }

  get() {
    return this.contacts;
  }

  print() {
    console.log(this.get().join(', '));
  }
}

const path = 'contacts.json';

class FileContactService {
  read(callback) {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        console.error('error reading', error);
      }

      const result = JSON.parse(data);

      const contactsList = result.map(
        (contact) =>
          new Contact(
            contact.id,
            contact.lastName,
            contact.firstName,
            contact.address,
            contact.phone
          )
      );

      if (callback) {
        callback(contactsList);
      }
    });
  }

  get(callback) {
    return this.read(callback);
  }

  print() {
    return this.get((data) => console.log(data.join(', ')));
  }

  write(contacts, callback) {
    fs.writeFile(path, JSON.stringify(contacts), callback);
  }

  add(lastName, firstName, callback) {
    this.read((contacts) => {
      contacts.push(new Contact(contacts.length, lastName, firstName));

      this.write(contacts, callback);

      this.watch((event, fileName) => {
        console.log('The file has changed');
        console.log(`There was a ${event} at ${fileName}`);

        const difference = _.differenceWith(
          contacts,
          currentContacts,
          _.isEqual
        );
        console.log(difference);
      });
    });
  }

  delete(id, callback) {
    const currentContacts = contacts;

    this.read((contacts) => {
      contacts.splice(id, 1);

      this.write(contacts, callback);

      this.watch((event, fileName) => {
        console.log('The file has changed');
        console.log(`There was a ${event} at ${fileName}`);

        const difference = _.differenceWith(
          contacts,
          currentContacts,
          _.isEqual
        );
        console.log(difference);
      });
    });
  }

  watch(callback) {
    fs.watch(path, callback);
  }
}

const file = new FileContactService();

// Définition d'une commande list qui appelle 'file.print()'
yargs
  .command({
    command: 'list',
    alias: 'ls',
    desc: 'List all contacts',
    handler: () => file.print()
  })
  .options('colors', {
    alias: 'c',
    desc: 'add colors to lastName and firstName in console'
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
      file.add(argv.lastname, argv.firstname, () => file.print())
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
    handler: (argv) => file.delete(argv.id, () => file.print())
  })
  .command({
    command: 'watch',
    alias: 'w',
    desc: 'Watch if contacts.json changed',
    handler: () => file.watch(() => file.print())
  })
  .help();

// Exécution de yargs
yargs.argv;
