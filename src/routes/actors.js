const { Router } = require("express");


const {
  getAllActors,
  createActor,
  updateActor,
  getById,
  deleteActor,
  uploadActorImage,
} = require("../controllers/actors");
const {
  postRequestValidations,
  putRequestValidations,
  getAllRequestValidation,
  getRequestValidation,
  deleteRequestValidations,
  postImageRequestValidations
} = require("../middlewares/actors");

const router = Router();

router.get("/", getAllRequestValidation, getAllActors);
router.post("/", postRequestValidations, createActor);
router.put("/:id(\\d+)/", putRequestValidations, updateActor);
router.get("/:id(\\d+)/", getRequestValidation, getById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteActor);
router.post("/image", postImageRequestValidations, uploadActorImage);

module.exports = router;
