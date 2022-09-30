import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from '../../components/card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';
import { ToDoModel } from '../../models/ToDo';
import ToDoController from '../../controllers/ToDoController';
import Cookies from 'js-cookie';

function Home() {
    const [toDoList, setToDoList] = useState<ToDoModel[]>([])

    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        const toDoListResponse = ToDoController.getToDoList()
        setToDoList(toDoListResponse)
    }, [])

    const handleClose = () => {
        setShowModal(false)
        setShowEdit(false)
        setTitle('')
        setDescription('')
    };
    const handleShowModal = () => setShowModal(true);

    const editToDo = () => {
        ToDoController.editToDo(id, title, description)
        const toDoListResponse = ToDoController.getToDoList()
        setToDoList(toDoListResponse)
        handleClose();
    }

    const createToDo = () => {
        ToDoController.addToDo(title, description)
        const toDoListResponse = ToDoController.getToDoList()
        setToDoList(toDoListResponse)
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
            <h1>Olá, {Cookies.get('userName')}</h1>
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