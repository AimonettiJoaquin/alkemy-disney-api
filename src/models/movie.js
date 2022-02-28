const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
/* const Actor = require("./actor"); */

const Movie = sequelize.define(
  "Movies",
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
        
            type: DataTypes.ENUM({
              values : ['MOVIE','SERIE']
            }),
            defaultValue:'MOVIE'
         
    }
  },
  {
    // Other model options go here
  }
);
module.exports = Movie;
Movie.belongsToMany(require('./actor'),{
  through:"actorsMovies",
  as:"actors",
  foreignKey:"movieId"
})

