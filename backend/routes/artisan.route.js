const router = require("express").Router();
const controller = require("../controllers/artisan.controller");

router.get("/", controller.getArtisans);
router.get("/top", controller.getTopArtisans);
router.get("/:id", controller.getArtisanById);

module.exports = router;