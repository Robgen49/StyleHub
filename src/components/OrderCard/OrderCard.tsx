import { Card, ListGroup } from 'react-bootstrap';
import cls from './OrderCard.module.scss'

interface OrderCardProps {
    id: number;
    createdAt: string;
    completedAt?: string;
}

const OrderCard = ({ id, createdAt, completedAt }: OrderCardProps) => {

    return (
        <>
            <Card className={cls.orderCardWrapper}>
                <ListGroup >
                    <ListGroup.Item variant={completedAt ? 'success' : 'warning'}>
                        <h4>Order id: </h4><p className={cls.text}>{id}</p>
                    </ListGroup.Item >
                    <ListGroup.Item variant={completedAt ? 'success' : 'warning'}>
                        <h4>Created at: </h4><p className={cls.text}>{createdAt}</p>
                    </ListGroup.Item >
                    <ListGroup.Item variant={completedAt ? 'success' : 'warning'}>
                        <h4>Completed at: </h4><p className={cls.text}>{completedAt ? completedAt : 'in process...'}</p>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </>
    )
}
export default OrderCard