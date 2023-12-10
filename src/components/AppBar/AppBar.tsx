import cls from './AppBar.module.scss'
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';

// interface AppBarProps {

// }

const AppBar = () => {
    return (
        <Nav variant='tabs' className="bg-body-tertiary" defaultActiveKey="/home" as="ul">
            <Container className={cls.appbar__block}>
                <div className={cls.catalog} >
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="/Black_Friday">Black Friday</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="/Mens">Mens</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="/Womens">Womens</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="/Kids">Kids</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="/Christmas">Christmas</Nav.Link>
                    </Nav.Item>
                </div>
                <div className={cls.favorite}>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="link-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill='red' viewBox="0 0 16 16">
                                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                            </svg>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link} href="link-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                            </svg>
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </Container >
        </Nav>
    )
}
export default AppBar