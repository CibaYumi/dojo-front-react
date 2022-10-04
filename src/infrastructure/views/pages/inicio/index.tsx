import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/user/userSlice';

function Inicio() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState<string>('')
    const dispatch = useDispatch()

    const onLogin = () => {
        dispatch(setUser({ name: userName }))
        Cookies.set('userName', userName)
        navigate('/home')
    }
    return (
        <div>
            <div>
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control
                    placeholder='Escreva seu nome de usuário'
                    type="text"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                />
            </div>
            <Button variant="primary" onClick={() => onLogin()} style={{ marginTop: '10px' }}>
                Login
            </Button>
        </div>
    )
}

export default Inicio