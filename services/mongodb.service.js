class MongoDbService {
  schema;

  constructor(schema) {
    this.schema = schema;
  }

  async findOneWithOutPassword(email) {
    // return this.schema.findOneWithOutPassword(email);
  }

  async createUser(email, password, username) {
    // return await this.schema.createUser(email, password, username);

    try {
      const newUser = new User({ email, password, username });
      return await newUser.save();

      //   return res.status(201).json({
      //     message: "User registered successfully!",
      //     user: savedUser,
      //   });
    } catch (error) {
      //   res.status(500).json({ message: error || "There is some server error" });
      //   return
    }
  }

  async findAndUpdate(id, updateInfo) {
    // return this.schema.findAndUpdate(id, updateInfo);
  }

  async findOneWithPassword(email) {
    // return await this.schema.findOneWithPassword(email);
  }
}

module.exports = MongoDbService;
