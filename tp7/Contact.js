const chalk = require('chalk');
const yargs = require('yargs');

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

module.exports = Contact;
