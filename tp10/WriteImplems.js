const fs = require('fs');
const denodeify = require('denodeify');
const readFile = denodeify(require('fs').readFile);
const writeFile = denodeify(require('fs').writeFile);
const rename = denodeify(require('fs').rename);

const path = 'contacts.json';
const backup = path + '.back';

exports.callbacks = function(contacts, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log('error path', err);
    }
    fs.writeFile(backup, data, (err) => {
      if (err) {
        console.log('error writing', err);
      } else {
        fs.writeFile(path, JSON.stringify(contacts), (err) => {
          if (err) {
            console.log('error writing', err);

            fs.rename(backup, path, (err) => {
              if (err) {
                console.log('error to rename', err);
              }
            });
          } else {
            if (callback) {
              callback();
            }
          }
        });
      }
    });
  });
};

exports.promise = (contacts, callback) => {
  readFile(path).then((err, data) => {
    if (err) {
      console.log('error path', err);
    }
    console.log('Read');
    console.log(data);
    return writeFile(backup, data)
      .then((err) => {
        if (err) {
          console.log('error writing to backup', err);
        }
        console.log('Write');
        return writeFile(path, JSON.stringify(contacts)).then((err) => {
          if (err) {
            console.log('error writing', err);

            return rename(backup, path).then((err) => {
              if (err) console.log('error writting contacts');
            });
          }
        });
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  });
};

exports.asyncAwait = (contacts, callback) => {
  return (async function() {
    const data = await readFile(path);
    await writeFile(backup, data);
    try {
      await writeFile(path, JSON.stringify(contacts));
    } catch (error) {
      console.log('error writing', error);
      await rename(backup, path);
    }
  })().then(() => {
    if (callback) {
      callback();
    }
  });
};
