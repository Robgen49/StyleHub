import cls from './Registration.module.scss'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FormEvent, useRef, useState } from 'react';
import fetchRegistration from '../../../api/auth/fetchRegistration';
import setToken from '../../../utils/setToken';
import Alert from 'react-bootstrap/Alert';
import { IToken } from '../Login/Login';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';
import { Link, useNavigate } from 'react-router-dom';

interface RegistrationProps {
    city: string;
}

const Registration = ({ city }: RegistrationProps) => {

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
            fetchRegistration(email.current.value, password.current.value)
                .then((response: Response) => response.json())
                .then((result: IToken) => {
                    if (result.token) {
                        setToken(result.token);
                        navigate('/');
                        setShowError(false)
                    } else {
                        setShowError(true)
                    }
                })
                .catch(() => setShowError(false))
        }
    }

    return (
        <>
            <Header city={city} />
            <div className={cls.container}>
                <div className={cls.wrapper}>
                    <div className={cls.title}>Sign up</div>
                    <Form noValidate validated={validated} className={cls.form} onSubmit={onSubmit}>
                        {(showError) && <Alert variant='danger'>Uncorrect email or password!</Alert>}
                        <Form.Group className={cls.formGroup} controlId="formGroupEMail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                isValid={validated}
                                required
                                ref={email}
                                type="email"
                                placeholder="admin@mail.ru" />
                            <Form.Control.Feedback type="invalid">
                                Invalid email.
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
                        <Link to='/sign-in'>Already have an account? Sign in</Link>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}
export default Registration