const mongoose = require('mongoose');

const Contact = require('./Contact');

// Définition du mapping des objets
const ContactShema = new mongoose.Schema({
  id: Number,
  lastName: String,
  firstName: String,
  address: String,
  phone: String
});

const ContactModel = mongoose.model('Contact', ContactShema);

class MongoContactService {
  constructor() {
    // Connection au serveur MongoDB
    mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  get(callback) {
    ContactModel.find((err, data) => {
      if (err) {
        console.error(err);
      }

      const contactsMongo = data.map(
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
        callback(contactsMongo);
      }
    });
  }

  add(lastName, firstName, callback) {
    ContactModel.findOne()
      .sort('-id')
      .exec(function(err, contact) {
        if (err) {
          console.error(err);
        }

        const selectedContact = new ContactModel({
          id: contact.id + 1,
          lastName,
          firstName
        });

        selectedContact.save((err, contact) => {
          if (err) {
            console.log(err);
          }
          if (callback) {
            callback(new Contact(contact));
          }
        });
      });
  }

  delete(id, callback) {
    //remove depreciée, deleteOne ou deleteMany
    ContactModel.deleteOne({id: id}, (err) => console.log(err));
    if (callback) {
      callback();
    }
  }

  watch() {
    console.log('Watch not implemented for MongoContacts');
  }

  print() {
    return this.get((data) => console.log(data.join(', ')));
  }

  close() {
    console.log('connexion close');
    mongoose.disconnect();
  }
}

module.exports = MongoContactService;
