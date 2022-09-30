import { ToDoModel } from "../models/ToDo"
import { ToDo } from "../useCases/ToDoUseCases"

export default class ToDoController {
    static getToDoList(): ToDoModel[] {
        const toDo = new ToDo()
        return toDo.getToDoList()
    }

    static addToDo(toDoTitle: string, toDoDescription: string): void {
        const toDo = new ToDo()
        toDo.addToDo(toDoTitle, toDoDescription)
    }

    static deleteToDo(idToDelete: string): void {
        const toDo = new ToDo()
        toDo.deleteToDo(idToDelete)
    }

    static editToDo(id: string, toDoTitle: string, toDoDescription: string): void {
        const toDo = new ToDo()
        toDo.editToDo(id, toDoTitle, toDoDescription)
    }
}