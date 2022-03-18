const Actor = require("../models/actor");
const Movie = require("../models/movie");
const { Op } = require("sequelize");
class ActorRepository {
  constructor() {}

  async findAll({ name, age, weight, movieTitle }, { limit, offset }) {
    let where = {};
    if (name) {
      where.name = {
        [Op.substring]: name,
      };
    }
    if (age) {
      where.age = {
        [Op.eq]: age,
      };
    }
    if (weight) {
      where.weight = {
        [Op.eq]: weight,
      };
    }
    if (movieTitle) {
      where.movieTitle = {
        [Op.substring]: movieTitle,
      };
    }
    return await Actor.findAll({
      where,
      attributes: ["name", "image"],
    });
  }

  async findById(id) {
    return await Actor.findByPk(id);
  }

  async findByIdMovies(id) {
    return await Actor.findByPk(id, {
      attributes:["id","name","age","weight","image","history"],
      include: [
        {
          model:Movie,
          as: "movies",
          attributes: ["title", "image", "creationDate"],
        },
      ],
    });
  }

  async findByName(name) {
    return await Actor.findOne({ where: { name } });
  }

  async save(a) {
    return await Actor.create(a);
  }

  async update(id, a) {
    return await Actor.update(a, {
      where: { id },
    });
  }

  async remove(id) {
    return await Actor.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ActorRepository;
