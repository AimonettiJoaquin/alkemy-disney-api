const { Router } = require("express");
const multer = require("multer");
const upload = multer();
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
} = require("../middlewares/actors");

const router = Router();

router.get("/", getAllRequestValidation, getAllActors);
router.post("/", postRequestValidations, createActor);
router.put("/:id(\\d+)/", putRequestValidations, updateActor);
router.get("/:id(\\d+)/", getRequestValidation, getById);
router.delete("/:id(\\d+)/", deleteRequestValidations, deleteActor);
router.post("/image", upload.single("image"), uploadActorImage);

module.exports = router;
