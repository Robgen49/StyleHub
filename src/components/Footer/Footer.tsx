import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <Nav.Link as={Link} to="https://github.com/Robgen49">About us</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='http://localhost:5000/api/docs'>API Docs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to='https://github.com/Robgen49/StyleHub'>Help</Nav.Link>
                </Nav.Item>
            </Nav>
            <p style={{marginBottom:'0'}} className="text-center mt-4">Copyright © 2023</p>
        </>
    )
}
export default Footer