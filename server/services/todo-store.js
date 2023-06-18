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

  async all(sortBy) {
    return this.db.find({ orderedBy: _id }).sort(this.sortBy(sortBy)).exec();
  }

  sortBy(property) {
    switch (property) {
      case 'title':
      case 'description':
        return this.todoStorage.todos.sort((a, b) => sortByString(a, b, property));
      case 'dueDate':
      case 'createdAt':
        return this.todoStorage.todos.sort((a, b) => sortByDate(a, b, property));
      case 'priority':
      case 'finished':
        return this.todoStorage.todos.sort((a, b) => sortByNumber(a, b, property));
      default:
        return this.todoStorage.todos.sort((a, b) => sortByNumber(a, b, 'id'));
    }
  }
}

export const todoStore = new TodoStore();
