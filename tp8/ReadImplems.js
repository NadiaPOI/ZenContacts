const fs = require('fs');
const through2 = require('through2');
const JSONStream = require('JSONStream');

const Contact = require('./Contact');

const path = 'contacts.json';

exports.original = (callback) => {
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
};

exports.stream = (callback) => {
  const myContacts = [];

  fs.createReadStream(path)
    .pipe(JSONStream.parse('*'))
    .pipe(
      through2.obj((contact, enc, callback) => {
        const newContact = new Contact(
          contact.id,
          contact.lastName,
          contact.firstName,
          contact.address,
          contact.phone
        );
        myContacts.push(newContact);
        callback();
      })
    )
    .on('finish', () => {
      if (callback) {
        callback(myContacts);
      }
    });
};
