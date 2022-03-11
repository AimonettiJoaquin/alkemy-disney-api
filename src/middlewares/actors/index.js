const { check } = require("express-validator");
const multer = require("multer");
const upload = multer();
const AppError = require("../../errors/appError");
const actorService = require("../../services/actorService");
const { ROLES, ADMIN_ROLE, USER_ROLE } = require("../../constants");
const logger = require("../../loaders/logger");
const { validationResult, imageRequired } = require("../commons");
const { validJWT, hasRole } = require("../auth");


const _nameRequired = check("name", "Name required").not().isEmpty();
const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Ivalid Role", 400);
    }
  });

const _idRequied = check("id").not().isEmpty();
const _idExist = check("id").custom(async (id = "") => {
  const actorFound = await actorService.findById(id);
  if (!actorFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});
const _ageIsNumeric = check("age").optional().isNumeric();
const _idIsNumeric = check("id").isNumeric();
const _weightIsNumeric = check("weight").optional().isNumeric();
const _historyRequired = check("history").not().isEmpty();
const _imageRequired = check("image").not().isEmpty();

/* const uploadImage = () => {
    return (req, res, next) => {
      try {
        upload.single('image');
        next();
      } catch (err) {
        next(err);
      }
    };
  }; */

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _ageIsNumeric,
  _historyRequired,
  _weightIsNumeric,
  validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _idExist,
  _idIsNumeric,
  _weightIsNumeric,
  _roleValid,
  validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequied,
  _idExist,
  validationResult,
];

const getAllRequestValidation = [validJWT];

const getRequestValidation = [
  validJWT,
  _idRequied,
  _idIsNumeric,
  _idExist,
  validationResult,
];

const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single('image'),
  _idRequied,
  _idIsNumeric,
  _idExist,
  imageRequired,
  validationResult,
];

module.exports = {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations
};
