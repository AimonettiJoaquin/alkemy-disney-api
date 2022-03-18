const { Router } = require('express');
const {
    getAllMovies, 
    createMovie, 
    updateMovie, 
    getById, 
    deleteMovie,
    uploadMovieImage,
    associatedActor
} = require('../controllers/movies');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageRequestValidations,
    associationRequestValidations,
} = require('../middlewares/movies');


const router = Router();

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id(\\d+)/', putRequestValidations, updateMovie);
router.get('/:id(\\d+)/', getRequestValidation, getById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteMovie);
router.post("/image", postImageRequestValidations, uploadMovieImage);
router.put(
    "/:idMovie(\\d+)/actor/:idActor(\\d+)/",
    associationRequestValidations,
    associatedActor
  );
module.exports = router;