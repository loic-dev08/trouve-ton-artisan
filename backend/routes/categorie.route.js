const router = require("express").Router();
const controller = require("../controllers/categorie.controller");

router.get("/", controller.getCategories);
router.get("/:id/specialites", controller.getSpecialitesByCategorie);

module.exports = router;