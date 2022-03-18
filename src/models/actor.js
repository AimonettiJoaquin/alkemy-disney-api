const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");



const Actor = sequelize.define(
  "Actors",
  {
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    history: {
      type: DataTypes.STRING(3000),
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = Actor;

Actor.belongsToMany(require('./movie'),{
  through:"actorsMovies",
  as:"movies",
  foreignKey:"actorId"
})

