const ImageRepository = require("../repositories/imageRepository");
const ActorRepository = require("../repositories/actorRepository");
const MovieRepository = require("../repositories/movieRepository");
const logger = require("../loaders/logger");
const imageRepository = new ImageRepository();
const actorRepository = new ActorRepository();
const movieRepository = new MovieRepository();

const uploadActorImage = async (idActor, file) => {
  const actor = await actorRepository.findById(idActor);
  const imageURL = await imageRepository.uploadImage(actor.name, file.buffer, file.mimetype);
  logger.info(`Image URL: ${imageURL}`);
  actor.image = imageURL;
  return await actorRepository.update(idActor, {image: imageURL});
};

const uploadMovieImage = async (idMovie, image) => {
  const movie = await movieRepository.findById(idMovie);
  const imageURL = await imageRepository.uploadImage(movie.title, image);
  movie.image = imageURL;
  logger.info(`Image Location: ${imageURL}`);
  return await movieRepository.update(idMovie, movie);
};

module.exports = {
  uploadActorImage,
  uploadMovieImage,
};
