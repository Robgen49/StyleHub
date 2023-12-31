import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Items } from '../../pages/Main/Main';
import { Dispatch, SetStateAction, useRef } from 'react';
import getToken from '../../utils/getToken';
import setToken from '../../utils/setToken';

interface HeaderProps {
    city: string;
    setShowItems?: Dispatch<SetStateAction<Items>>;
    setSearch: Dispatch<SetStateAction<string>>;
}

const Header = ({ city, setShowItems, setSearch }: HeaderProps) => {

    const searchRef = useRef(null)

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => { if (typeof setShowItems !== 'undefined') setShowItems('All') }} as={Link} to={'/'} >StyleHub</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    >
                        <Nav.Link as={Link} to={'/'} onClick={() => { if (typeof setShowItems !== 'undefined') setShowItems('All') }} >Home</Nav.Link>
                        {(getToken().length === 0) && <>
                            <Nav.Link as={Link} to={'/sign-in'} >Sign in</Nav.Link>
                            <Nav.Link as={Link} to={'/sign-up'} >Sign up</Nav.Link>
                        </>}
                        {(getToken().length > 0) && <>
                            <Nav.Link onClick={() => { setToken(''); localStorage.clear() }} as={Link} to={'/sign-in'} >Log out</Nav.Link>
                        </>}
                        <Nav.Link as={Link} to={'/'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            {" " + city}
                        </Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={searchRef}
                        />
                        <Button
                            onClick={
                                () => {
                                    const current = searchRef.current as HTMLInputElement | null;
                                    if (current) {
                                        setSearch(current.value);
                                    }
                                }
                            }
                            variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );

}
export default Header