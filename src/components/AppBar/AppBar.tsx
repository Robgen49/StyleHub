import cls from './AppBar.module.scss'
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import FavoriteIcon from '../../assets/favorite.svg'
import CartIcon from '../../assets/cart.svg'
import OrderIcon from '../../assets/orderList.svg'

interface AppBarProps {
    favoriteCount: number;
    cartItemsCount: number;
    orderCount: number;
    favoriteOpenHandler: () => void;
    cartOpenHandler: () => void;
    orderOpenHandler: () => void;
    isFavoriteOpen: boolean;
    isCartOpen: boolean;
    isOrderOpen: boolean;
}

const AppBar = ({
    favoriteCount, cartItemsCount, orderCount,
    favoriteOpenHandler, cartOpenHandler, orderOpenHandler,
    isFavoriteOpen, isCartOpen, isOrderOpen }: AppBarProps) => {
    return (
        <Nav variant='tabs' className="bg-body-tertiary" id={cls.nav} defaultActiveKey="/home" as="ul">
            <Container className={cls.appbar__block}>
                <div className={cls.catalog} >
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link}>Mens</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link}>Womens</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link}>Kids</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item}>
                        <Nav.Link className={cls.item__link}>Christmas</Nav.Link>
                    </Nav.Item>
                </div>
                <div className={cls.actions}>
                    <Nav.Item as="li" className={cls.appbarblock__item} >
                        <Nav.Link className={cls.item__link} id={cls.favorite} onClick={favoriteOpenHandler}>
                            <img src={FavoriteIcon} id={isFavoriteOpen ? cls.open : ''} className={favoriteCount > 0 ? cls.shake : ''} alt="" />
                            <Badge className={cls.Badge} pill >{favoriteCount}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item} >
                        <Nav.Link className={cls.item__link} id={cls.cart} onClick={cartOpenHandler}>
                            <img src={CartIcon} id={isCartOpen ? cls.open : ''} className={cartItemsCount > 0 ? cls.shake : ''} alt="" />
                            <Badge className={cls.Badge} pill >{cartItemsCount}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className={cls.appbarblock__item} >
                        <Nav.Link className={cls.item__link} id={cls.order} onClick={orderOpenHandler}>
                            <img src={OrderIcon} id={isOrderOpen ? cls.open : ''} className={orderCount > 0 ? cls.shake : ''} alt="" />
                            <Badge className={cls.Badge} pill >{orderCount}</Badge>
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </Container >
        </Nav>
    )
}
export default AppBar