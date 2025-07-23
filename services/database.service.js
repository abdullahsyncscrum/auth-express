class DabaseService {
  db;

  constructor(db) {
    this.db = db;
  }

  async findOneWithOutPassword(email) {
    return this.db.findOneWithOutPassword(email);
  }

  async createUser(email, password, username) {
    return await this.db.createUser(email, password, username);
  }

  async findAndUpdate(id, updateInfo) {
    return this.db.findAndUpdate(id, updateInfo);
  }

  async findOneWithPassword(email) {
    return await this.db.findOneWithPassword(email);
  }
}

module.exports = DabaseService;
