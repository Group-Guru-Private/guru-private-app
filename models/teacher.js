'use strict';
const {
  Model
} = require('sequelize');

const { generatePassword } = require('../helpers/passwordHelper');


module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Teacher.hasMany(models.Order)
    }
  };
  Teacher.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'name can not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email has already registered'
      },
      validate: {
        notEmpty: {
          msg: 'email can not be empty'
        },
        isEmail: {
          msg: 'Email must be email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password can not be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'role can not be empty'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'address can not be empty'
        }
      }
    },
    position: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      validate: {
        notEmpty: {
          msg: 'position can not be empty'
        }
      }
    },
    telpon_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'telpon number can not be empty'
        }
      }
    },
    subjects: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      validate: {
        notEmpty: {
          msg: 'subject can not be empty'
        }
      }
    },
    background: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'background can not be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'price can not be empty'
        },
        min: {
          args: [0],
          msg: 'price must be hiigher than 0'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'rating can not be empty'
        }
      }
    },
    income: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'income can not be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'image url can not be empty'
        }
      }
    },
    available_status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: 'available_status can not be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(teacher) {
        teacher.available_status = false
        teacher.income = 0
        teacher.rating = 0
        teacher.password = generatePassword(teacher.password)
      }
    },
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};