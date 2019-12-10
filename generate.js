const faker = require('faker');
const fs = require('fs');
const writer = fs.createWriteStream(__dirname + '/data.csv', 'utf8');

// class Item {
//   constructor(restaurantId, menus, types) {
//     this.item = [
//       faker.commerce.productMaterial(),
//       faker.commerce.product()
//     ].join(' ');
//     const descriptorsCount = Math.floor(Math.random() * Math.floor(3));
//     const descriptors = [];
//     for (let i = 0; i <= descriptorsCount; i += 1) {
//       descriptors.push(faker.commerce.productName());
//       if (i < descriptorsCount) {
//         if (i === 0) {
//           descriptors[i] += ' with';
//         } else {
//           descriptors[i] += ' and';
//         }
//       } else {
//         descriptors[i] += '.';
//       }
//     }
//     this.description = descriptors.join(' ');
//     this.menu = menus[Math.floor(Math.random() * Math.floor(menus.length))];
//     this.type =
//       types[this.menu][
//         Math.floor(Math.random() * Math.floor(types[this.menu].length))
//       ];
//     this.price = (faker.commerce.price() / 100 + 3).toFixed(2);
//     this.restaurantId = restaurantId;
//   }
// }

const populateItems = () => {
  // Restaurants
  for (let i = 1; i <= 1; i += 1) {
    const menuCount = Math.floor(Math.random() * Math.floor(5)) + 2;
    const menus = [];
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
    let menuTypes = {};
    for (let j = 0; j <= menuCount; j += 1) {
      const rand = Object.keys(menuChoices)[
        Math.floor(Math.random() * Math.floor(Object.keys(menuChoices).length))
      ];
      menus.push(menuChoices[rand]);

      const typeCount = Math.floor(Math.random() * Math.floor(3)) + 1;
      const types = [];
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
      for (let j = 0; j <= typeCount; j += 1) {
        const rand = Object.keys(typeChoices)[
          Math.floor(
            Math.random() * Math.floor(Object.keys(typeChoices).length)
          )
        ];
        types.push(typeChoices[rand]);
        delete typeChoices[rand];
      }
      menuTypes[menuChoices[rand]] = types;
      delete menuChoices[rand];
    }
    // Items
    const object = {};
    const itemCount = Math.floor(Math.random() * Math.floor(1)) + 3;
    for (let j = 0; j < itemCount; j += 1) {
      // sampleItems.push(new Item(i, menus, menuTypes));
      // console.log(new Item(i, menus, menuTypes));
      object.item = [
        faker.commerce.productMaterial(),
        faker.commerce.product()
      ].join(' ');
      const descriptorsCount = Math.floor(Math.random() * Math.floor(3));
      const descriptors = [];
      for (let i = 0; i <= descriptorsCount; i += 1) {
        descriptors.push(faker.commerce.productName());
        if (i < descriptorsCount) {
          if (i === 0) {
            descriptors[i] += ' with';
          } else {
            descriptors[i] += ' and';
          }
        } else {
          descriptors[i] += '.';
        }
      }
      object.description = descriptors.join(' ');
      object.menu = menus[Math.floor(Math.random() * Math.floor(menus.length))];
      object.type =
        menuTypes[object.menu][
          Math.floor(Math.random() * Math.floor(menuTypes[object.menu].length))
        ];
      object.price = (faker.commerce.price() / 100 + 3).toFixed(2);
    }
    return object;
  }
};

write10Milli(writer, 'utf8', console.log('complete'));
