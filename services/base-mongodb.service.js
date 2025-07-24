const AppError = require("../utils/app-error.util");

class MongoDbService {
  schema;

  constructor(schema) {
    this.schema = schema;
  }

  async findOneWithOutPassword(email) {
    try {
      return await this.schema.findOne({ email }).select("-password");
    } catch (error) {
      throw new AppError(500, "Failed to fetch user");
    }
  }

  async createUser(data) {
    try {
      const newUser = new this.schema({ ...data });
      return await newUser.save();
    } catch (error) {
      throw new AppError(500, "Failed to create user");
    }
  }

  async findByEmailAndUpdate(email, updateInfo) {
    try {
      return await this.schema
        .findOneAndUpdate({ email }, { ...updateInfo }, { new: true })
        .select("+password");
    } catch (error) {
      throw new AppError(500, "Failed to update user information");
    }
  }

  async findOneWithPassword(email) {
    try {
      return await this.schema.findOne({ email }).select("+password");
    } catch (error) {
      throw new AppError(500, "Failed to fetch user");
    }
  }
}

module.exports = MongoDbService;
