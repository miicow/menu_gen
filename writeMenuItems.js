const faker = require('faker');
const fs = require('fs');
let itemID = 0;
const rowData = i => {
  itemID++;
  const menuChoices = {
    0: 'Breakfast',
    1: 'Lunch',
    2: 'Dinner',
    3: 'Brunch',
    4: 'Weekend',
    5: 'Special',
    6: 'Kids',
    7: 'Holiday',
    8: 'Wine',
    9: 'Drinks',
    10: 'Beer'
  };
  const typeChoices = {
    0: 'Appetizers',
    1: 'Snacks',
    2: 'Entrees',
    3: 'Tapas',
    4: 'Dessert',
    5: 'Sides',
    6: 'Main',
    7: 'Special'
  };
  let restaurantID = i;
  const item = [
    faker.commerce.productMaterial(),
    faker.commerce.product()
  ].join(' ');
  const description = faker.lorem.sentence();
  const menu = menuChoices[faker.random.number({ min: 0, max: 10 })];
  const type = typeChoices[faker.random.number({ min: 0, max: 7 })];
  const price = (faker.commerce.price() / 100 + 3).toFixed(2);
  const result = `${itemID},${restaurantID},${item},${description},${menu},${type},${price}`;
  return result;
};

const writerMenu = fs.createWriteStream(__dirname + '/menuitems.csv', 'utf8');
const write10Milli = (writer, encoding, callback) => {
  let i = 0;
  write();
  function write() {
    let ok = true;
    do {
      i++;
      if (i === 10000000) {
        for (let j = 1; j <= 5; j++) {
          let data = rowData(i);
          writer.write(`${data}\n`, encoding, callback);
        }
      } else {
        for (let k = 1; k <= 5; k++) {
          let data = rowData(i);
          ok = writer.write(`${data}\n`, encoding);
        }
      }
    } while (i < 10000000 && ok);
    if (i > 1) {
      writer.once('drain', write);
    }
  }
};

write10Milli(writerMenu, 'utf8', () => {
  console.log('Done!');
});

// scp -i your-ec2-key.pem -r /Users/Desktop/SDC/menu/dbgen/menuitems.csv ec2-user@your-ec2-address:
