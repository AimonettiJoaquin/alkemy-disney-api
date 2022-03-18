const { check } = require("express-validator");
const multer = require("multer");
const upload = multer();
const AppError = require("../../errors/appError");
const movieService = require("../../services/movieService");
const actorService = require("../../services/actorService");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });
const _idExist = check("id").custom(async (id = "") => {
  const mFound = await movieService.findById(id);
  if (!mFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _dateIsDateAndOptional = check("creationDate").optional().isDate();
const _dateRequired = check("creationDate").not().isEmpty();
const _dateValid = check("creationDate").isDate("MM-DD-YYYY");

const _titleRequired = check("title", "Title Required").not().isEmpty();
const _titleOptional = check("title").optional();
const _titleNotExist = check("title").custom(async (title = "") => {
  const mFound = await movieService.findByTitle(title);
  if (mFound) {
    throw new AppError("The title exist", 400);
  }
});

const _ratingRequired = check("rating", "Rating Required").not().isEmpty();
const _ratingIsNumeric = check("rating").isNumeric();

const _imageRequired = check("image", "Image Required").not().isEmpty();

const _genreRequired = check("genre", "Genre Required").not().isEmpty();

const _idRequired = (name) => {
  return check(name).not().isEmpty();
};
const _idIsNumeric = (name) => {
  return check(name).isNumeric();
};

const _idActorExist = check("idActor").custom(async (idActor = "") => {
  const a = await actorService.findById(idActor);
  if (!a) {
    throw new AppError("The Actor id does not exist in DB", 400);
  }
});

const _idMovieExist = check("idMovie").custom(async (idMovie = "") => {
  const m = await movieService.findById(idMovie);
  if (!m) {
    throw new AppError("The Movie id does not exist in DB", 400);
  }
});

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleNotExist,
  _imageRequired,
  _dateRequired,
  _dateValid,
  _ratingRequired,
  _ratingIsNumeric,
  _roleValid,
  _genreRequired,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _idMovieExist,
  _roleValid,
  _titleOptional,
  _dateIsDateAndOptional,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("id"),
  _idMovieExist,
  validationResult,
];
const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  _idRequired("id"),
  _idIsNumeric("id"),
  _idMovieExist,
  imageRequired,
  validationResult,
];

const associationRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired("idActor"),
  _idIsNumeric("idActor"),
  _idActorExist,
  _idRequired("idMovie"),
  _idIsNumeric("idMovie"),
  _idMovieExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequired("id"),
  _idIsNumeric("id"),
  _idExist,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations,
  associationRequestValidations,
};
