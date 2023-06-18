import Datastore from 'nedb-promises';

export class TodoStore {
  constructor(db) {
    const options = process.env.DB_TYPE === "FILE" ? { filename: '../data/todos.db', autoload: true } : {}
    this.db = db || new Datastore(options);
  }

  async add(todo) {
    return this.db.insert(todo);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
  }

  async get(id, currentUser) {
    return this.db.findOne({ _id: id, orderedBy: currentUser });
  }

  async all(currentUser) {
    return this.db.find({ orderedBy: currentUser }).sort({ orderDate: -1 }).exec();
  }
}

export const orderStore = new TodoStore();
