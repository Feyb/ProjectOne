import Datastore from 'nedb-promises';
export class TodoStore {
  constructor(db) {
    const options = process.env.DB_TYPE === "FILE" ? { filename: './data/todos.db', autoload: true } : {}
    this.db = db || new Datastore(options);
  }

  async add(todo) {
    await this.db.insert(todo);
    return this.get(id);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
    return this.get(id);
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

    return this.db.find({ userName: currentUser, })
      .sort(sortByObj)
      .exec();
  }
}

export const todoStore = new TodoStore();
