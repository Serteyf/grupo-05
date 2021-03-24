const express = require("express");
const router = express.Router();
const usersApiController = require("../../controllers/api/usersApiController");

router.get("/", usersApiController.list);
router.get("/count", usersApiController.count);
router.get("/:id", usersApiController.find);

// router.post("/", productsApiController.store);

module.exports = router;
