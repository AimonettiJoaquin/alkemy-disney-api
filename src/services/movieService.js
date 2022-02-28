const MovieRepository = require("../repositories/movieRepository");
const repository = new MovieRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const findAll = async (filter, options) => {
  //return await repository.findAllWithPagination(filter, options);
  return await repository.findAll();
};

const save = async (m) => {
  return await repository.save(m);
};

const update = async (id, m) => {
  return await repository.update(id, m);
};

const remove = async (id) => {
  return await repository.remove(id);
};

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
};
