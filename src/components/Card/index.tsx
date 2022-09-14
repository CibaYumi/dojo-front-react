import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

interface Props {
  title: string;
  description: string;
  handleDelete: () => void;
}

function Card(props: Props) {
  const { title, description, handleDelete } = props

  return (
    <div className='card'>
      <div>
        <div className='title'>{title}</div>
        <div className='description'>{description}</div>
      </div>
      <div>
        <Button variant="danger" onClick={handleDelete}>
          Excluir
        </Button>
      </div>
    </div>
  );
}

export default Card;
