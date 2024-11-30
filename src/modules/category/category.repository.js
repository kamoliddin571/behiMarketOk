const { repository } = require("../../lib/repository");

class CategoryRepository {
  #repository;
  constructor(repository) {
    this.#repository = repository;
  }

  async getAll() {
    const query = "SELECT * FROM categories";

    return this.#repository.multiple(query);
  }

  async create(dto) {
    const query = "INSERT INTO categories (name) VALUES ($1) RETURNING *";

    return this.#repository.single(query, dto.name);
  }

  async getById(id) {
    const query = `SELECT * FROM categories WHERE id = $1`;

    return this.#repository.single(query, id);
  }

  async getByName(name) {
    const query = `SELECT * FROM categories WHERE name = $1`;

    return this.#repository.single(query, name);
  }
}

const categoryRepository = new CategoryRepository(repository);

module.exports = { categoryRepository };
