import { ToDoModel } from "../../domain/models/ToDoModel";
import { ToDo } from "../../domain/useCases/ToDoUseCases";

const toDo = new ToDo()

export default class ToDoController {
    static getToDoList(): ToDoModel[] {
        return toDo.getToDoList()
    }

    static deleteToDo(idToDelete: string): void {
        toDo.deleteToDo(idToDelete)
    }
}