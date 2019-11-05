const Contact = require('./Contact');
const data = require('./contacts.json');

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

module.exports = ContactService;
