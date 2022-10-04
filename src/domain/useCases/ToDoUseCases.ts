import { ToDoModel } from "../models/ToDo"
import ToDoRepository from "../../infrastructure/repositories/ToDoRepository"

export class ToDo {
    repository: ToDoRepository
  
    constructor() {
      this.repository = new ToDoRepository()
    }

    getToDoList(): ToDoModel[] {
        return this.repository.getToDoList()
    }
  
    addToDo(toDoTitle: string, toDoDescription: string): void {
        this.repository.addToDo(toDoTitle, toDoDescription)
    }

    deleteToDo(idToDelete: string): void {
        this.repository.deleteToDo(idToDelete)
    }

    editToDo(id: string, toDoTitle: string, toDoDescription: string): void {
        this.repository.editToDo(id, toDoTitle, toDoDescription)
    }
}  