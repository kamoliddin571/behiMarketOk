const { Router } = require("express");
const { categoryController } = require("./category.controller");
const router = Router();

router.get("/", categoryController.getAll.bind(categoryController));
router.post("/", categoryController.create.bind(categoryController));

module.exports = { router };
