import cls from './Main.module.scss'
import Header from "../../components/Header/Header"
import AppBar from "../../components/AppBar/AppBar";
import Cards from '../../components/Cards/Cards';
import Carousel from '../../components/Carousel/Carousel';
import Footer from '../../components/Footer/Footer';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import getToken from '../../utils/getToken';
import AuthorizationAlert from '../../components/AuthorizationAlert/AuthorizationAlert';
import EmptyAlert from '../../components/EmptyAlert/EmptyAlert';

interface MainProps {
    city: string;
}

export type Items = 'Cart' | 'Favorite' | 'All' | 'Order'

const Main = ({ city }: MainProps) => {

    const { 0: searchValue, 1: setSearchValue } = useState('')
    const { 0: favoriteCount, 1: setFavoriteCount } = useState(localStorage.length)
    const { 0: cartItemsCount, 1: setCartItemsCount } = useState(0)
    const { 0: orderItemsCount, 1: setOrderItemsCount } = useState(0)
    const { 0: showItems, 1: setShowItems } = useState<Items>('All')
    const { 0: showAuthModal, 1: setShowAuthModal } = useState(false)
    const { 0: showEmptyCartModal, 1: setShowEmptyCartModal } = useState(false)
    const { 0: showEmptyOrderModal, 1: setShowEmptyOrderModal } = useState(false)

    const favoriteClickHandler = () => {
        setShowItems('Favorite')
    }

    const cartClickHandler = () => {
        if (getToken().length > 0) {
            if (cartItemsCount > 0) {
                setShowItems('Cart')
            }
            else {
                setShowEmptyCartModal(true)
            }
        }
        else {
            setShowAuthModal(true)
        }
    }

    const orderClickHandler = () => {
        if (getToken().length > 0) {
            if (orderItemsCount > 0) {
                setShowItems('Order')
            }
            else {
                setShowEmptyOrderModal(true)
            }
        }
        else {
            setShowAuthModal(true)
        }
    }

    return (
        <>
            {showEmptyOrderModal && <EmptyAlert text='Please make an order!' show={showEmptyOrderModal} onHide={() => setShowEmptyOrderModal(false)} />}
            {showEmptyCartModal && <EmptyAlert text='Please add items to the cart!' show={showEmptyCartModal} onHide={() => setShowEmptyCartModal(false)} />}
            {showAuthModal && <AuthorizationAlert show={showAuthModal} onHide={() => setShowAuthModal(false)} />}
            <Header setSearch={setSearchValue} setShowItems={setShowItems} city={city} />
            <AppBar
                isFavoriteOpen={showItems === 'Favorite'}
                isCartOpen={showItems === 'Cart'}
                isOrderOpen={showItems === 'Order'}
                cartOpenHandler={cartClickHandler}
                favoriteOpenHandler={favoriteClickHandler}
                orderOpenHandler={orderClickHandler}
                favoriteCount={favoriteCount}
                cartItemsCount={cartItemsCount}
                orderCount={orderItemsCount}
            />
            <Carousel items={[{
                title: "Men",
                image: "src/assets/sigma.jpg",
                description: "Be inspired and share your style...",
            }, {
                title: "Women",
                image: "src/assets/women.png",
                description: "Get it, don't regret it...",
            }, {
                title: "Baby",
                image: "src/assets/baby.jpg",
                description: "Also for babies...",
            }]} />
            <div className={cls.blockTitle}>
                <Container className={cls.wrapper}>
                    <h2 className={cls.text}>
                        {showItems === "All" && 'NEW styles for a NEW year.'}
                        {showItems === "Favorite" && 'My Favorite'}
                        {showItems === "Cart" && 'My Cart'}
                        {showItems === "Order" && 'My Orders'}
                    </h2>
                </Container>
            </div>
            <Cards
                showItems={showItems}
                searchValue={searchValue}
                setShowItems={setShowItems}
                setOrderItemsCount={setOrderItemsCount}
                setCartItemsCount={setCartItemsCount}
                setFavoriteCount={setFavoriteCount}
            />
            <div className={cls.blockTitle}>
                <Footer />
            </div>
        </>
    )
}
export default Main