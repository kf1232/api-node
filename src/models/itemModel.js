module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
    });
  
    return Item;
  };
  