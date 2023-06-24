import Datastore from 'nedb-promises';
import { sortByDate, sortByNumber, sortByString } from './util.js';

export class TodoStore {
  constructor(db) {
    const options = process.env.DB_TYPE === "FILE" ? { filename: './data/todos.db', autoload: true } : {}
    this.db = db || new Datastore(options);
  }

  async add(todo) {
    await this.db.insert(todo);
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { "state": "DELETED" } });
  }

  async update(id, todo) {
    return await this.db.update({ _id: id }, todo);
  }

  async get(id) {
    const todo = await this.db.findOne({ _id: id });
    return todo;
  }

  async all(sortBy, currentUser) {
    return this.db.find() // {{userName: currentUser}} in find not working
      .sort((a, b) => sortBy(a, b, sortBy))
      .exec();
  }

  sortBy(a, b, property) {
    switch (property) {
      case 'title':
      case 'description':
        return sortByString(a, b, property);
      case 'dueDate':
      case 'createdAt':
        return sortByDate(a, b, property);
      case 'priority':
      case 'finished':
        return sortByNumber(a, b, property);
      default:
        return sortByString(a, b, '_id');
    }
  }
}

export const todoStore = new TodoStore();
