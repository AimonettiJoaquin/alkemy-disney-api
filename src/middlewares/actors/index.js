const { check } = require('express-validator');
const AppError = require('../../errors/appError');
const actorService = require('../../services/actorService');
const { ROLES, ADMIN_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const {validationResult} = require('../commons');
const { validJWT, hasRole } = require('../auth');

const _nameRequired = check('name', 'Name required').not().isEmpty();
const _lastNameRequired = check('lastName', 'Last Name required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email is invalid').isEmail();
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);
const _optionalEmailValid = check('email', 'Email is invalid').optional().isEmail();
const _optionalEmailExist = check('email').optional().custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
);
const _passwordRequired = check('password', 'Password required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Ivalid Role', 400);
        }
    }
);
const _dateValid = check('birthdate').optional().isDate('MM-DD-YYYY');

const _idRequied = check('id').not().isEmpty();
const _idIsMongoDB = check('id').isMongoId();
const _idExist = check('id').custom(
    async (id = '') => {
        const actorFound = await actorService.findById(id);
        if(!actorFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);
const _ageIsNumeric = check('age').optional().isNumeric();
const _idIsNumeric = check('id').isNumeric();
const _weightIsNumeric = check('weight').optional().isNumeric();
const _historyRequired = check('history').not().isEmpty();
const _imageRequired = check('image').not().isEmpty();



const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _ageIsNumeric,
    _imageRequired, 
    _historyRequired,
    _weightIsNumeric,
    validationResult
]

const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idExist,
    _idIsNumeric,
    _weightIsNumeric,
    _roleValid,
    validationResult
]

const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    //_idIsMongoDB,
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT
]

const getRequestValidation = [
    validJWT,
    _idRequied,
    //_idIsMongoDB,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
}