const fs = require('fs');
const _ = require('lodash');

const path = 'contacts.json';
const Contact = require('./Contact');
const write = require('./WriteImplems');

class FileContactService {
  constructor() {
    this.write = write.asyncAwait;
  }

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

  add(lastName, firstName, callback) {
    this.read((contacts) => {
      contacts.push(new Contact(contacts.length, lastName, firstName));

      this.write(contacts, callback);

      this.watch();
    });
  }

  delete(id, callback) {
    this.read((contacts) => {
      contacts.splice(id, 1);

      this.write(contacts, callback);

      this.watch();
    });
  }

  watch() {
    this.read((contacts) => {
      let fsWait = false;

      fs.watch(path, (event, fileName) => {
        this.read((oldContacts) => {
          if (fileName) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
              fsWait = false;
            }, 100);

            console.log(`There was a ${event} at ${fileName}`);
            const difference = _.differenceWith(
              oldContacts,
              contacts,
              _.isEqual
            );
            console.log(difference);
          } else {
            console.log('filename not provided');
          }
        });
      });
    });
  }
}

module.exports = FileContactService;
