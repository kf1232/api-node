const { Item } = require('../models');

const seedItems = [
  { name: 'Item 1', description: 'Description for Item 1', price: 10.0 },
  { name: 'Item 2', description: 'Description for Item 2', price: 20.0 },
  { name: 'Item 3', description: 'Description for Item 3', price: 30.0 },
  { name: 'Item 4', description: 'Description for Item 4', price: 40.0 },
  { name: 'Item 5', description: 'Description for Item 5', price: 50.0 },
  { name: 'Item 6', description: 'Description for Item 6', price: 60.0 },
  { name: 'Item 7', description: 'Description for Item 7', price: 70.0 },
  { name: 'Item 8', description: 'Description for Item 8', price: 80.0 },
  { name: 'Item 9', description: 'Description for Item 9', price: 90.0 },
  { name: 'Item 10', description: 'Description for Item 10', price: 100.0 },
];

const seedDatabase = async () => {
  await Item.bulkCreate(seedItems);
  console.log('Database has been seeded with items.');
};

module.exports = seedDatabase;
