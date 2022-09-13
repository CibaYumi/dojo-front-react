import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Card from '../../components/Card';
import './styles.scss';

interface ToDo {
  title: string
  description: string
}

function Home() {
  const [toDoList, setToDoList] = useState<ToDo[]>([
    {
      title: 'Fazer conteúdo do Dojo',
      description: 'Especificar quais conteúdos serão apresentados no Dojo'
    },
    {
      title: 'Criar invite do Dojo',
      description: 'Criar agenda no calendário e adicionar convidados'
    }
  ])
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleClose = () => {
    setShow(false)
    setTitle('')
    setDescription('')
  };
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log(title);
    console.log(description);
    
    handleClose()
  }
  
  return (
    <div className='container'>
      {toDoList.map(item => <Card title={item.title} description={item.description} />)}
      <Button variant="primary" onClick={handleShow}>
        Adicionar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Seu título aqui..."
                value={title}
                onChange={event => setTitle(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={event => setDescription(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
