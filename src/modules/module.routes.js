const { Router } = require("express");
const categoryRouter = require("./category/category.routes");
const router = Router();

router.use("/category", categoryRouter.router);

module.exports = { router };
