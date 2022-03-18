const ImageRepository = require("../repositories/imageRepository");
const ActorRepository = require("../repositories/actorRepository");
const MovieRepository = require("../repositories/movieRepository");
const logger = require("../loaders/logger");
const imageRepository = new ImageRepository();
const actorRepository = new ActorRepository();
const movieRepository = new MovieRepository();

const uploadActorImage = async (idActor, file) => {
  const actor = await actorRepository.findById(idActor);
  if (actor.image) {
    await imageRepository.deleteImage(actor.image);
  }

  const imageURL = await imageRepository.uploadImage(
    actor.name,
    file.buffer,
    file.mimetype
  );
  return await actorRepository.update(idActor, { image: imageURL });
};

const uploadMovieImage = async (idMovie, file) => {
  const movie = await movieRepository.findById(idMovie);

  if (movie.image) {
    await imageRepository.deleteImage(movie.image);
  }
  const imageURL = await imageRepository.uploadImage(
    movie.title,
    file.buffer,
    file.mimetype
  );
  return await movieRepository.update(idMovie, { image: imageURL });
};

module.exports = {
  uploadActorImage,
  uploadMovieImage,
};
