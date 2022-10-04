import { v4 as uuidv4 } from 'uuid';
import { ToDoModel } from '../../domain/models/ToDo';


export default class ToDoRepository {
    public getToDoList(): ToDoModel[] {
        const localStorageToDos = localStorage.getItem('toDos')
        const toDos: ToDoModel[] = JSON.parse(localStorageToDos as string) || []
        return toDos
    }

    public addToDo(toDoTitle: string, toDoDescription: string): void {
        localStorage.setItem('toDos', JSON.stringify([...this.getToDoList(), {
            id: uuidv4(),
            title: toDoTitle,
            description: toDoDescription
        }]));
    }

    public deleteToDo(idToDelete: string): void {
        const toDoList = this.getToDoList()
        const newToDoList = toDoList.filter((item) => item.id !== idToDelete)
        localStorage.setItem('toDos', JSON.stringify(newToDoList));
    }

    public editToDo(id: string, title: string, description: string): void {
        const toDoList = this.getToDoList()
        let itemToEdit = toDoList.map(item => item.id === id ? { id: id, title: title, description: description } : item)
        localStorage.setItem('toDos', JSON.stringify(itemToEdit));
    }
}