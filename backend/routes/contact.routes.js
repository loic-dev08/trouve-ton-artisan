const router = require("express").Router();
const controller = require("../controllers/contact.controller");

router.post("/:id/contact", controller.sendMessage);

module.exports = router;