import { ToDoModel } from "../models/ToDo"
import ToDoRepository from "../../infrastructure/repositories/ToDoRepository"
import store from "../../infrastructure/redux/store"
import Utils from "../../infrastructure/utils/utils"
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
        if (Utils.isAdmin()) {
            this.repository.deleteToDo(idToDelete)
        }
    }

    editToDo(id: string, toDoTitle: string, toDoDescription: string): void {
        this.repository.editToDo(id, toDoTitle, toDoDescription)
    }
}  