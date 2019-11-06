exports.init = function(app, myContacts, io) {
  app.get('/rest/contacts', (req, res) => {
    myContacts.get((myContacts) => res.send(myContacts));
  });

  app.get('/rest/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    myContacts.get((myContacts) => res.send(myContacts[contactId]));
  });

  app.post('/rest/contacts', (req, res) => {
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;

    myContacts.add(lastName, firstName, () => res.send(myContacts));
  });

  app.put('/rest/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;

    myContacts.delete(contactId, () =>
      myContacts.add(lastName, firstName, () => res.send(myContacts))
    );
  });

  // Quand un client se connecte, on le note dans la console
  io.on('connection', (socket) => {
    console.log('Client connected');
  });

  myContacts.watch((contacts) => {
    io.emit('contacts', contacts);
  });
};
