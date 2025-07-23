class UserRepository {
  database;

  constructor(database) {
    this.database = database;
  }

  async findOneWithOutPassword(email) {
    try {
      const user = await this.database.findOneWithOutPassword(email);
      return user;
    } catch (error) {}
  }

  async createUser(email, password, username) {
    try {
      return await this.database.createUser(email, password, username);
    } catch (error) {}
  }

  async findAndUpdate(id, updateInfo) {
    try {
      return this.database.findAndUpdate(id, updateInfo);
    } catch (error) {}
  }

  async findOneWithPassword(email) {
    try {
      const user = await this.database.findOneWithPassword(email);
      return user;
    } catch (error) {}
  }
}

module.exports = UserRepository;
