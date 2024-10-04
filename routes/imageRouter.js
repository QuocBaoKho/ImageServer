const express = require("express");
const imageController = require("../controllers/imageControllers");
const imageParser = require("../middleware/imageParser");
const multerUpload = require("../middleware/multer_upload");
const router = express.Router();
// Apply the middleware to ensure that any incoming request to the /upload route
// (or any other route in this router) that contains image data will be processed by the
// middleware, making the raw image data available in req.body
router.post(
  "/upload",
  multerUpload.single("image"),
  imageController.insertImage
);
router.get("/", imageController.getAllImages);
router.get("/:id", imageController.get_image_by_id);
module.exports = router;
