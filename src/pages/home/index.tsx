import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from '../../components/card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

interface ToDo {
    id: string,
    title: string,
    description: string
}

function Home() {
    const [toDoList, setToDoList] = useState<ToDo[]>(JSON.parse(localStorage.getItem('toDos') as string) || [
        {
            id: uuidv4(),
            title: 'Fazer conteúdo do Dojo',
            description: 'Especificar quais conteúdos serão apresentados no Dojo'
        },
        {
            id: uuidv4(),
            title: 'Criar invite do Dojo',
            description: 'Criar agenda no calendário e adicionar convidados'
        }
    ])

    const [showModal, setShowModal] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

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

    const excluiToDo = (indexToDelete: number) => {
        const newToDoList = toDoList.filter((item, index) => index !== indexToDelete)
        setToDoList(newToDoList)
        localStorage.setItem('toDos', JSON.stringify(newToDoList));
    }

    const habilitaEdicao = (itemToEdit: ToDo) => {
        setId(itemToEdit.id)
        setTitle(itemToEdit.title)
        setDescription(itemToEdit.description)

        setShowEdit(true);
        handleShowModal();
    }

    return (
        <div>
            <h1>ToDo List</h1>
            {toDoList.map((item, index) =>
                <Card
                    title={item.title}
                    description={item.description}
                    excluir={() => excluiToDo(index)}
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