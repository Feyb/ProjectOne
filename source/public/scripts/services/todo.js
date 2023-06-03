export default class Todo {
  constructor(id, title, description, dueDate, createdAt, priority, finished) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.priority = priority;
    this.finished = finished;
  }
}
