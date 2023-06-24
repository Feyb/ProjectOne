import Datastore from 'nedb-promises';
export class TodoStore {
  constructor(db) {
    const options = process.env.DB_TYPE === "FILE" ? { filename: './data/todos.db', autoload: true } : {}
    this.db = db || new Datastore(options);
  }

  async add(todo) {
    return this.db.insert(todo);
  }

  async delete(id) {
    return this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
  }

  async update(id, todo) {
    await this.db.update({ _id: id }, todo);
    return this.get(id);
  }

  async get(id) {
    return this.db.findOne({ _id: id });
  }

  async all(sortBy, sortByDirection, filter, currentUser) {
    if (!(sortBy && Boolean(sortByDirection))) { sortBy = '_id'; sortByDirection = 'true' }
    const sortByObj = {};
    sortByObj[sortBy] = sortByDirection === 'true' ? 1 : -1;


    if (filter === 'true') {
      return this.db.find({ userName: currentUser, finished: false })
        .sort(sortByObj)
        .exec();
    }

    return this.db.find({ userName: currentUser, state: { $ne: "DELETED" } })
      .sort(sortByObj)
      .exec();
  }
}

export const todoStore = new TodoStore();
