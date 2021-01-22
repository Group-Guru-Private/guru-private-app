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
      Order.belongsTo(models.Student)
      Order.belongsTo(models.Teacher)
    }
  };
  Order.init({
    StudentId: DataTypes.INTEGER,
    TeacherId: DataTypes.INTEGER,
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Subject can't be empty` },
        notEmpty: { msg: `Subject can't be empty` }
      }
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `Distance can't be empty` },
        notEmpty: { msg: `Distance can't be empty` }
      }
    },
    total_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: `total_price can't be empty` },
        notEmpty: { msg: `total_price can't be empty` }
      }
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Date can't be empty` },
        notEmpty: { msg: `Date can't be empty` }
      }
    },
    rating: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate (instance) {
        instance.status = false
        instance.rating = 0
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};