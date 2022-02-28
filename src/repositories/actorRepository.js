const Actor = require("../models/actor");

class ActorRepository {
  constructor() {}

  //implementar filtros
  async findAll() {
    return await Actor.findAll();
  }

  async findById(id) {
    return await Actor.findByPk(id);
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
