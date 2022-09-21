import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Inicio() {
    const navigate = useNavigate()

    return (
        <div>
            <Button variant="primary" onClick={() => navigate('/home')}>
                Ir para Home
            </Button>
        </div>
    )
}

export default Inicio