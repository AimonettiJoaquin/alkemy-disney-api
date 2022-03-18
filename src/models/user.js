const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const User = sequelize.define(
  "Users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role:{
      type: DataTypes.ENUM({
        values : ['USER_ROLE','ADMIN_ROLE']
      }),
      defaultValue:'USER_ROLE'
    }
  },
  {
    // Other model options go here
  }
);
module.exports = User;
