class DabaseService {
  db;

  constructor(db) {
    this.db = db;
  }

  async findOneWithOutPassword(email) {
    return this.db.findOneWithOutPassword(email);
  }

  async createUser(data) {
    return await this.db.createUser(data);
  }

  async findByEmailAndUpdate(email, updateInfo) {
    return this.db.findByEmailAndUpdate(email, updateInfo);
  }

  async findOneWithPassword(email) {
    return await this.db.findOneWithPassword(email);
  }
}

module.exports = DabaseService;
