const { Item } = require('../models');

exports.getAllItems = async () => {
  return await Item.findAll();
};

exports.getItemById = async (id) => {
  return await Item.findByPk(id);
};

exports.createItem = async (itemData) => {
  return await Item.create(itemData);
};

exports.updateItem = async (id, updatedData) => {
  const item = await Item.findByPk(id);
  if (item) {
    return await item.update(updatedData);
  }
  return null;
};

exports.deleteItem = async (id) => {
  const item = await Item.findByPk(id);
  if (item) {
    await item.destroy();
    return true;
  }
  return false;
};
