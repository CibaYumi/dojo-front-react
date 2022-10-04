import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

interface Props {
    title: string,
    description: string,
    excluir: () => void,
    editar: () => void,
}

function Card(props: Props) {
    const { title, description, excluir, editar } = props;
    return (
        <div>
            <div className='card'>
                <div style={{ overflowWrap: 'anywhere' }}>
                    <div>{title}</div>
                    <div>{description}</div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <Button variant="danger" onClick={() => excluir()}>
                        Excluir
                    </Button>
                    <Button variant="warning" onClick={() => editar()} style={{ marginLeft: '10px' }}>
                        Editar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card