const AppError = require("../utils/app-error.util");

class PostgressService {
  model;

  constructor(model) {
    this.model = model;
  }

  async findAllUsers() {
    try {
      return await this.model.findAll();
    } catch (error) {
      throw new AppError(500, "Failed to fetch users");
    }
  }

  async findOneWithOutPassword(email) {
    try {
      const user = await this.model.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      });
      return user;
    } catch (error) {
      console.log("Error s ", error);
      throw new AppError(500, "Failed to fetch user");
    }
  }

  async createUser(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new AppError(500, "Failed to create user");
    }
  }

  async findByEmailAndUpdate(email, updateInfo) {
    try {
      const [_, [updatedUser]] = await this.model.update(updateInfo, {
        where: { email },
        returning: true,
      });

      return updatedUser;
    } catch (error) {
      throw new AppError(500, "Failed to update user information");
    }
  }

  async findOneWithPassword(email) {
    try {
      return await this.model.findOne({
        where: { email },
        attributes: { include: ["password"] },
      });
    } catch (error) {
      throw new AppError(500, "Failed to fetch user");
    }
  }
}

module.exports = PostgressService;
