const model = require('express-cassandra');
var models = model.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'menus',
    queryOptions: { consistency: model.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1
    },
    migration: 'safe'
  }
});

var MyModel = models.loadSchema('menu_items', {
  fields: {
    restaurant_id: 'int',
    item_id: 'int',
    item: 'text',
    description: 'text',
    menu: 'text',
    type: 'text',
    price: 'double'
  },
  key: [('item_id', 'item'), 'restaurant_id']
});

// MyModel or models.instance.menuitems can now be used as the model instance
console.log(models.instance.menuitems === MyModel);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
MyModel.syncDB(function(err, result) {
  if (err) throw err;
  // result == true if any database schema was updated
  // result == false if no schema change was detected in your models
});

// COPY "menus"."menu_items" ("restaurant_id", "item_id", "item", "description", "menu", "type", "price") FROM '/Users/michaelsu/Desktop/SDC/menu/dbgen/menuitems.csv' WITH delimiter=',';
