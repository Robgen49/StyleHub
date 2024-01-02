import cls from './EmptyAlert.module.scss'
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

interface EmptyAlertProps {
    show: boolean;
    onHide: () => void;
    text: string;
}

const EmptyAlert = ({ show, onHide, text }: EmptyAlertProps) => {
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
                        There is empty!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Alert className={cls.text}>
                        {text}
                    </Alert>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default EmptyAlert