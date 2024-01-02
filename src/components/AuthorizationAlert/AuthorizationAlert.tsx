import cls from './AuthorizationAlert.module.scss'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

interface AuthorizationAlertProps {
    show: boolean;
    onHide: () => void
}

const AuthorizationAlert = ({ show, onHide }: AuthorizationAlertProps) => {
    return (
        <>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Authorization Warning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert className={cls.text}>
                        Please{' '}
                        <Alert.Link as={Link} to={'/sign-up'}>
                            sign up{' '}
                        </Alert.Link>
                        or{' '}
                        <Alert.Link as={Link} to={'/sign-in'}>
                            sign in{' '}
                        </Alert.Link>
                        to create a cart!
                    </Alert>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default AuthorizationAlert