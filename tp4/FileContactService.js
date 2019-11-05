const fs = require('fs');
const _ = require('lodash');

const path = 'contacts.json';
const Contact = require('./Contact');

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
      const currentContacts = contacts;
      console.log(currentContacts);

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
    this.read((contacts) => {
      const currentContacts = contacts;

      contacts.splice(id, 1);

      this.write(contacts, callback);

      this.watch((event, fileName) => {
        if (fileName) {
          console.log('The file has changed');
          console.log(`There was a ${event} at ${fileName}`);
        } else {
          console.log('filename not provided');
        }

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

module.exports = FileContactService;
