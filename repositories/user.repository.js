class UserRepository {
  database;

  constructor(database) {
    this.database = database;
  }

  async findOneWithOutPassword(email) {
    return await this.database.findOneWithOutPassword(email);
  }

  async createUser(data) {
    return await this.database.createUser(data);
  }

  async findByEmailAndUpdate(email, updateInfo) {
    return this.database.findByEmailAndUpdate(email, updateInfo);
  }

  async findOneWithPassword(email) {
    return await this.database.findOneWithPassword(email);
  }
}

module.exports = UserRepository;
