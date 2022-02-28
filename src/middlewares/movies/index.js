const { check } = require("express-validator");
const AppError = require("../../errors/appError");
const movieService = require("../../services/movieService");
const { ROLES, ADMIN_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult } = require("../commons");
const { validJWT, hasRole } = require("../auth");

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

const _idRequied = check("id").not().isEmpty();
const _idExist = check("id").custom(async (id = "") => {
  const mFound = await movieService.findById(id);
  if (!mFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _dateIsDateAndOptional = check("creationDate").optional().isDate();
const _dateRequired = check("creationDate").not().isEmpty();
const _dateValid = check("creationDate").isDate('MM-DD-YYYY');

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
  _idRequied,
  _idExist,
  _roleValid,
  _titleOptional,
  _dateIsDateAndOptional,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  //_idIsMongoDB,
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [validJWT, _idRequied, _idExist, validationResult];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
};
