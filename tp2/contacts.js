const _ = require('lodash');
const chalk = require('chalk');
const yargs = require('yargs');

const data = require('./contacts.json');

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

const contactService = new ContactService(data);

// Définition d'une commande list qui appelle 'contactService.print()'
yargs
  .command({
    command: 'list',
    alias: 'ls',
    desc: 'List all contacts',
    handler: () => contactService.print()
  })
  // Ajout d'une option 'c' -> colors
  .options('c', {
    alias: 'colors',
    desc: 'add colors to lastName and firstName in console'
  });

// Exécution de yargs
yargs.argv;
