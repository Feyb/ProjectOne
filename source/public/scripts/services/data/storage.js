
export class Storage {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')) ?? this.todoMocks;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.save();
  }

  deleteById(id) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id, 10));
    this.todos.splice(todoIndex, 1);
    this.save();
  }

  updateById(id, updatedTodo) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id, 10));
    if (todoIndex !== -1) {
      this.todos[todoIndex] = updatedTodo;
      this.save();
    }
  }


  todoMocks = [
    {
      id: 1,
      title: "Make Todo App",
      description: "To Learn Javascript",
      dueDate: "2023-06-26",
      createdAt: "2023-05-30",
      priority: 1,
      finished: false,
    },
    {
      id: 2,
      title: "Finished Todo",
      description: "Second Todo thats finished",
      dueDate: "2023-06-26",
      createdAt: "2023-05-30",
      priority: 5,
      finished: true,
    },
    {
      id: 3,
      title: "Create Project Proposal",
      description: "To present at the team meeting",
      dueDate: "2023-06-05",
      createdAt: "2023-05-30",
      priority: 3,
      finished: false,
    },
    {
      id: 4,
      title: "Prepare Presentation Slides",
      description: "For the conference next week",
      dueDate: "2023-06-10",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 5,
      title: "Read Chapter 4",
      description: "In the book for the upcoming exam",
      dueDate: "2023-06-03",
      createdAt: "2023-05-30",
      priority: 4,
      finished: false,
    },
    {
      id: 6,
      title: "Buy Groceries",
      description: "Milk, eggs, bread, and fruits",
      dueDate: "2023-06-01",
      createdAt: "2023-05-30",
      priority: 3,
      finished: false,
    },
    {
      id: 7,
      title: "Submit Expense Report",
      description: "For the business trip",
      dueDate: "2023-06-07",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 8,
      title: "Call Mom",
      description: "To wish her a happy birthday",
      dueDate: "2023-06-08",
      createdAt: "2023-05-30",
      priority: 1,
      finished: false,
    },
    {
      id: 9,
      title: "Attend Team Meeting",
      description: "Discuss project updates",
      dueDate: "2023-06-02",
      createdAt: "2023-05-30",
      priority: 4,
      finished: false,
    },
    {
      id: 10,
      title: "Fix Bug in Backend",
      description: "Investigate and resolve issue",
      dueDate: "2023-06-04",
      createdAt: "2023-05-30",
      priority: 5,
      finished: false,
    },
    {
      id: 11,
      title: "Send Follow-up Email",
      description: "To the potential client",
      dueDate: "2023-06-09",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 12,
      title: "Research New Technology",
      description: "For upcoming project",
      dueDate: "2023-06-06",
      createdAt: "2023-05-30",
      priority: 3,
      finished: false,
    },
    {
      id: 13,
      title: "Pay Utility Bills",
      description: "Electricity, water, and internet",
      dueDate: "2023-06-11",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 14,
      title: "Book Flight Tickets",
      description: "For summer vacation",
      dueDate: "2023-06-15",
      createdAt: "2023-05-30",
      priority: 3,
      finished: false,
    },
    {
      id: 15,
      title: "Write Blog Post",
      description: "On the topic of artificial intelligence",
      dueDate: "2023-06-13",
      createdAt: "2023-05-30",
      priority: 4,
      finished: false,
    },
    {
      id: 16,
      title: "Schedule Dentist Appointment",
      description: "For regular check-up",
      dueDate: "2023-06-14",
      createdAt: "2023-05-30",
      priority: 1,
      finished: false,
    },
    {
      id: 17,
      title: "Submit Project Report",
      description: "To the supervisor",
      dueDate: "2023-06-20",
      createdAt: "2023-05-30",
      priority: 4,
      finished: false,
    },
    {
      id: 18,
      title: "Attend Webinar",
      description: "On the latest web development trends",
      dueDate: "2023-06-17",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 19,
      title: "Update Social Media Profiles",
      description: "With recent achievements",
      dueDate: "2023-06-19",
      createdAt: "2023-05-30",
      priority: 3,
      finished: false,
    }
    , {
      id: 20,
      title: "Clean the Garage",
      description: "Organize and declutter",
      dueDate: "2023-06-18",
      createdAt: "2023-05-30",
      priority: 2,
      finished: false,
    },
    {
      id: 21,
      title: "Study for Final Exam",
      description: "Cover all the important topics",
      dueDate: "2023-06-23",
      createdAt: "2023-05-30",
      priority: 4,
      finished: false,
    },
    {
      id: 22,
      title: "Attend Yoga Class",
      description: "Relax and improve flexibility",
      dueDate: "2023-06-21",
      createdAt: "2023-05-30",
      priority: 1,
      finished: false,
    }
  ];

}

// why does this not work: export default class  Storage or export default Storage???
export const todoStorage = new Storage();
