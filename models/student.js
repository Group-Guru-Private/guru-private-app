'use strict';

const {generatePassword,verifyPassword} = require('../helpers/passwordHelper')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Student.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Name is required`
        },
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Email is required`
        },
        isEmail : {
          msg : `Invalid email format`
        }
      }
    },
    password: DataTypes.STRING,
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Password is required`
        }
      }
    },
    address: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Address is required`
        }
      }
    },
    position: DataTypes.ARRAY(DataTypes.FLOAT),
    telpon_number: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : `Telphone Number is required`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Student',
  });

  Student.beforeCreate((instance, options) => {
    instance.password = generatePassword(instance.password)
   })
  return Student;
};