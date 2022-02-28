const { Router } = require('express');
const {
    getAllMovies, 
    createMovie, 
    updateMovie, 
    getById, 
    deleteMovie
} = require('../controllers/movies');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
} = require('../middlewares/movies');


const router = Router();

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id(\\d+)/', putRequestValidations, updateMovie);
router.get('/:id(\\d+)/', getRequestValidation, getById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteMovie);

module.exports = router;