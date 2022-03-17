const MovieRepository = require("../repositories/movieRepository");
const ActorRepository = require("../repositories/actorRepository");
const repository = new MovieRepository();
const actorRepository = new ActorRepository();

const findById = async (id) => {
  return await repository.findById(id);
};

const findByTitle = async (title) => {
  return await repository.findByTitle(title);
};

const findAll = async (filter, options) => {
  return await repository.findAll(filter,options);
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

const associate = async (idMovie,idActor) => {
  const movie = await repository.findById(idMovie);
  const actor = await actorRepository.findById(idActor);
  await movie.addActor(actor);
}

module.exports = {
  findById,
  findByTitle,
  findAll,
  save,
  update,
  remove,
  associate
};
