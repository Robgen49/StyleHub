import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

const CartPlaceholder = () => {
    return (
        <>
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </>
    )
}
export default CartPlaceholder