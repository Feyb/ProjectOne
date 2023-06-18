export default class Todo {
  constructor(title, description, dueDate, priority, finished, userName) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.createdAt = new Date();
    this.priority = priority;
    this.finished = finished;
    this.userName = userName
  }
}
