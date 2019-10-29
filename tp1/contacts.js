const _ = require('lodash');

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
contactService.print();
