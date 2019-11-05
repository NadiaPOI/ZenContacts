const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');

const Contact = require('../Contact');
const ContactService = require('../ContactService');

let myContacts;
chai.should();

beforeEach(() => {
  myContacts = new ContactService();
});

describe('ContactService', () => {
  it('Should return a string with the lastname in uppercase', function() {
    const firstContact = myContacts.get()[0];
    const string = firstContact.toString();
    //assert.equal(string, 'WAYNE Bruce');
    string.should.equal('WAYNE Bruce');
  });

  it('Should call toString function', () => {
    const firstContact = myContacts.get()[0];
    const spyToString = sinon.spy(firstContact, 'toString');

    const string = firstContact.toString();
    assert(spyToString.calledOnce);
  });
});
