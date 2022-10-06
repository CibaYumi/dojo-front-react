import { ToDoModel } from "../../domain/models/ToDoModel";

export default class ToDoRepository {
    public getToDoList(): ToDoModel[] {
        const localStorageToDos = localStorage.getItem('toDos')
        const toDos: ToDoModel[] = JSON.parse(localStorageToDos as string)
        return toDos
    }

    public deleteToDo(idToDelete: string): void {
        const toDoList = this.getToDoList()
        const newToDoList = toDoList.filter((item) => item.id !== idToDelete)
        localStorage.setItem('toDos', JSON.stringify(newToDoList));
    }
}