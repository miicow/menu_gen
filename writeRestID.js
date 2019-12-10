const fs = require('fs');

const writerID = fs.createWriteStream(__dirname + '/restaurantID.csv', 'utf8');

const write10MID = (writer, encoding, callback) => {
  let i = 10000001;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 1) {
        let data = i;
        writer.write(`${data}\n`, encoding, callback);
      } else {
        let data = i;
        ok = writer.write(`${data}\n`, encoding);
      }
    } while (i > 1 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
};

write10MID(writerID, 'utf8', () => {
  console.log('Done!');
});
