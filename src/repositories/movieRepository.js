const Movie = require("../models/movie");
const Actor = require("../models/actor");
const { Op } = require("sequelize");

class MovieRepository {
  constructor() {}

  async findAll({ title, genre }, { limit, offset, order }) {
    let where = {};
    if (title) {
      where.title = {
        [Op.substring]: title,
      };
    }
    if (genre) {
      where.genre = {
        [Op.substring]: genre,
      };
    }

    let config = {
      where,
      attributes: ["title", "image", "creationDate"],
    };
    if (order) {
      config.order = [["creationDate", order]];
    }
    return await Movie.findAll(config);
  }

  async findById(id) {
    return await Movie.findByPk(id);
  }
  
  async findByIdActors(id) {
    return await Movie.findByPk(id, {
      attributes:["id","image","title","creationDate","rating","genre","type"],
      include: [
        {
          model:Actor,
          as: "actors",
          attributes: ["name", "image"],
        },
      ],
    });
  }


  async findByTitle(title) {
    return await Movie.findOne({ where: { title } });
  }

  async save(m) {
    return await Movie.create(m);
  }

  async update(id, m) {
    return await Movie.update(m, {
      where: { id },
    });
  }

  async remove(id) {
    return await Movie.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = MovieRepository;
