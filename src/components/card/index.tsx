import React from 'react';
import { Button } from 'react-bootstrap';
import './styles.scss';

interface Props {
    title: string
    description: string
    excluir: () => void
}

function Card(props: Props) { 
    const { title, description, excluir } = props;
    return (
        <div>
            <div className='card'>
                <div>
                    <div>{title}</div>
                    <div>{description}</div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <Button variant="danger" onClick={() => excluir()}>
                        Excluir
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card