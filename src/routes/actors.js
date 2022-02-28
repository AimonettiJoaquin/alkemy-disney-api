const { Router } = require('express');
const {
    getAllActors, 
    createActor, 
    updateActor, 
    getById, 
    deleteActor
} = require('../controllers/actors');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations
} = require('../middlewares/actors');


const router = Router();

router.get('/', getAllRequestValidation, getAllActors);
router.post('/', postRequestValidations, createActor);
router.put('/:id(\\d+)/', putRequestValidations, updateActor);
router.get('/:id(\\d+)/', getRequestValidation, getById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteActor);

module.exports = router;