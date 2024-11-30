const { categoryService } = require("./category.service");
const { categorySchema } = require("./dto/category.schema");
const { validateSchema } = require("../../lib/validateSchema");
const { CustomError } = require("../../lib/customError");

class CategoryController {
  #service;
  constructor(service) {
    this.#service = service;
  }

  async create(req, res, next) {
    try {
      const dto = req.body;

      validateSchema(categorySchema, dto);

      const { meta } = await this.#service.getByName(dto.name);

      if (meta.statusCode !== 404) {
        throw new CustomError(400, "Category already exists");
      }

      const resData = await this.#service.create(dto);

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const resData = await this.#service.getAll();

      res.status(resData.meta.statusCode).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const categoryController = new CategoryController(categoryService);

module.exports = { categoryController };
