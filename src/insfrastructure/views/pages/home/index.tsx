import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from '../../components/card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ToDoModel } from '../../../../domain/models/ToDoModel';
import ToDoController from '../../../controllers/ToDoController';

function Home() {
    const [toDoList, setToDoList] = useState<ToDoModel[]>([])

    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const user = useSelector((state: RootState) => state.user.user)

    useEffect(() => {
        const toDoResponse = ToDoController.getToDoList()
        setToDoList(toDoResponse)
    }, [])

    const handleClose = () => {
        setShowModal(false)
        setShowEdit(false)
        setTitle('')
        setDescription('')
    };
    const handleShowModal = () => setShowModal(true);

    const editToDo = () => {
        let itemToEdit = toDoList.map(item => item.id === id ? { id: id, title: title, description: description } : item)
        setToDoList(itemToEdit)
        localStorage.setItem('toDos', JSON.stringify(itemToEdit));

        handleClose();
    }

    const createToDo = () => {
        setToDoList([...toDoList, {
            id: uuidv4(),
            title: title,
            description: description
        }])
        localStorage.setItem('toDos', JSON.stringify([...toDoList, {
            id: uuidv4(),
            title: title,
            description: description
        }]));
        handleClose();
    }

    const excluiToDo = (idToDelete: string) => {
        ToDoController.deleteToDo(idToDelete)
        const toDoListResponse = ToDoController.getToDoList()
        setToDoList(toDoListResponse)
    
    }

    const habilitaEdicao = (itemToEdit: ToDoModel) => {
        setId(itemToEdit.id)
        setTitle(itemToEdit.title)
        setDescription(itemToEdit.description)

        setShowEdit(true);
        handleShowModal();
    }

    return (
        <div>
            <div>
                <p>Olá, cookie username: {Cookies.get('userName')}</p>
                <p>Olá, redux username: {user.name}</p>
            </div>
            <h1>ToDo List</h1>
            {toDoList.map((item, index) =>
                <Card
                    title={item.title}
                    description={item.description}
                    excluir={() => excluiToDo(item.id)}
                    editar={() => habilitaEdicao(item)}
                />
            )}
            <Button variant="primary" onClick={handleShowModal}>
                Adicionar ToDo
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {showEdit ? "Editar ToDo" : "Adicionar ToDo"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {showEdit ?
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    disabled
                                    type="text"
                                    autoFocus
                                    value={id}
                                />
                            </Form.Group>
                            : null}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={(event) => setDescription(event.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" disabled={!title || !description} onClick={showEdit ? editToDo : createToDo}>
                        {showEdit ? "Salvar Alterações" : "Salvar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home