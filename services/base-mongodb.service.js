const AppError = require("../utils/app-error.util");

class MongoDbService {
  model;

  constructor(model) {
    this.model = model;
  }

  async findAllUsers() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.log("Errorr shile fetchhh  ", error);
      throw new AppError(500, "Failed to fetch users");
    }
  }

  async findOneWithOutPassword(email) {
    try {
      return await this.model.findOne({ email }).select("-password");
    } catch (error) {
      throw new AppError(500, "Failed to fetch user");
    }
  }

  async createUser(data) {
    try {
      const newUser = new this.model({ ...data });
      return await newUser.save();
    } catch (error) {
      throw new AppError(500, "Failed to create user");
    }
  }

  async findByEmailAndUpdate(email, updateInfo) {
    try {
      return await this.model
        .findOneAndUpdate({ email }, { ...updateInfo }, { new: true })
        .select("+password");
    } catch (error) {
      throw new AppError(500, "Failed to update user information");
    }
  }

  async findOneWithPassword(email) {
    try {
      return await this.model.findOne({ email }).select("+password");
    } catch (error) {
      throw new AppError(500, "Failed to fetch user");
    }
  }
}

module.exports = MongoDbService;
