import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from '../../components/card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './styles.scss';

interface ToDo {
    title: string
    description: string
}

function Home() {
    const [ toDoList, setToDoList ] = useState<ToDo[]>(JSON.parse(localStorage.getItem('toDos') || '') || [{
        title: 'Fazer conteúdo do Dojo',
        description: 'Especificar quais conteúdos serão apresentados no Dojo'
      },
      {
        title: 'Criar invite do Dojo',
        description: 'Criar agenda no calendário e adicionar convidados'
      }])

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleClose = () => {
        setShow(false)
        setTitle('')
        setDescription('')
    };
    const handleShow = () => setShow(true);

    const adicionaToDo = () => {
        setToDoList([...toDoList, {
            title: title,
            description: description
        }])
        localStorage.setItem('toDos', JSON.stringify([...toDoList, {
            title: title,
            description: description
        }]));
        handleClose()
    }

    const excluiToDo = (indexToDelete: number) => {
        const newToDoList = toDoList.filter((item, index) => index !== indexToDelete)
        setToDoList(newToDoList)
        localStorage.setItem('toDos', JSON.stringify(newToDoList));
    }

    return (
        <div>
            {toDoList.map((item, index) =>
                <Card title={item.title} description={item.description} excluir={() => excluiToDo(index)} />
            )}
            <Button variant="primary" onClick={handleShow}>
                Adicionar ToDo
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Adicionar ToDo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        autoFocus
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    </Form.Group>
                    <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                    >
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(event) => setDescription(event.target.value)}/>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" disabled={!title || !description} onClick={adicionaToDo}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Home