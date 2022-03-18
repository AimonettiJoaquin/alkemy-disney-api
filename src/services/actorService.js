const ActorRepository = require("../repositories/actorRepository");
const repository = new ActorRepository();
const ImageRepository = require("../repositories/imageRepository");
const imageRepository = new ImageRepository();

const findById = async (id) => {
  return await repository.findByIdMovies(id);
};

const findByName = async (name) => {
  return await repository.findByName(name);
};

const findAll = async (filter, options) => {
  return await repository.findAll(filter, options);
};

const save = async (a) => {
  return await repository.save(a);
};

const update = async (id, a) => {
  return await repository.update(id, a);
};

const remove = async (id) => {
  const a = await repository.findById(id);
  imageRepository.deleteImage(a.image);
  return await repository.remove(id);
};

module.exports = {
  findById,
  findByName,
  findAll,
  save,
  update,
  remove,
};
