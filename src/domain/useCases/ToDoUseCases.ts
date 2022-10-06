import ToDoRepository from "../../insfrastructure/repositories/ToDoRepository";
import { ToDoModel } from "../models/ToDoModel";

export class ToDo {
    repository: ToDoRepository

    constructor() {
        this.repository = new ToDoRepository()
    }

    public getToDoList(): ToDoModel[] {
        return this.repository.getToDoList()
    }

    public deleteToDo(idToDelete: string): void {
        this.repository.deleteToDo(idToDelete)
    }
}