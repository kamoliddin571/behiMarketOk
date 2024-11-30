const { categoryRepository } = require("./category.repository");
const { ResData } = require("../../lib/resData");
const { CustomError } = require("../../lib/customError");

class CategoryService {
  #repository;
  constructor(repo) {
    this.#repository = repo;
  }

  async getAll() {
    const data = await this.#repository.getAll();

    const resData = new ResData(200, "ok", data);

    return resData;
  }

  async create(dto) {
    const data = await this.#repository.create(dto);

    const resData = new ResData(201, "created", data);

    return resData;
  }

  async getById(id) {
    const data = await this.#repository.getById(id);

    if (!data) {
      throw new CustomError(404, "Category not found");
    }

    const resData = new ResData(200, "ok", data);

    return resData;
  }

  async getByName(name) {
    const data = await this.#repository.getByName(name);

    const resData = new ResData(200, "ok", data);

    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = "Category not found";
    }

    return resData;
  }
}

const categoryService = new CategoryService(categoryRepository);

module.exports = { categoryService };
