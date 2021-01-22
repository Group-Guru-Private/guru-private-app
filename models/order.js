'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    StudentId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    date: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};