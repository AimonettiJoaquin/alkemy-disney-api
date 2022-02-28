const Movie = require("../models/movie");

class MovieRepository {
  constructor() {}

  //implementar filtros
  async findAll() {
    return await Movie.findAll();
  }

  async findById(id) {
    return await Movie.findByPk(id);
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
