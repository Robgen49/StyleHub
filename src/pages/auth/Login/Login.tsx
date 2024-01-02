import cls from './Login.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import fetchLogin from '../../../api/auth/fetchLogin';
import setToken from '../../../utils/setToken';
import Alert from 'react-bootstrap/Alert';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export interface IToken {
    token: string;
}

export interface LoginProps {
    city: string;
}

const Login = ({ city }: LoginProps) => {

    const navigate = useNavigate()
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const { 0: validated, 1: setIsValidated } = useState(false)
    const { 0: showError, 1: setShowError } = useState(false)
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (event.currentTarget.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setIsValidated(true)
        }
        else if (email.current?.value && password.current?.value) {
            event.preventDefault()
            fetchLogin(email.current.value, password.current.value)
                .then((response: Response) => response.json())
                .then((result: IToken) => {
                    if (result.token) {
                        setToken(result.token);
                        console.log('redirected');
                        navigate('/');
                        setShowError(false)
                    }
                    else setShowError(true)
                })
                .catch(() => setShowError(false))
        }
    }
    return (
        <>
            <Header city={city} />
            <div className={cls.container}>
                <div className={cls.wrapper}>
                    <div className={cls.title}>Sign in</div>
                    <Form noValidate validated={validated} className={cls.form} onSubmit={onSubmit}>
                        {(showError) && <Alert variant='danger'>Uncorrect email or password!</Alert>}
                        <Form.Group className={cls.formGroup} controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                isValid={validated}
                                required
                                ref={email}
                                type="email"
                                placeholder="admin@mail.ru" />
                            <Form.Control.Feedback type="invalid">
                                invalid mail.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={cls.formGroup} controlId="formGroupPassword">
                            <Form.Label >Password</Form.Label>
                            <Form.Control
                                isValid={validated}
                                required
                                ref={password}
                                type="password"
                                placeholder="admin" />
                        </Form.Group>
                        <Button type='submit' size='lg' variant="primary" >Sumbit</Button>
                    </Form>
                    <div className={cls.helper}>
                        <Link to='/'>Forgot a password?</Link>
                        <Link to='/sign-up'>Haven't account? Sign up</Link>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    )
}
export default Login