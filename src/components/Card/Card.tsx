import cls from './Card.module.scss'
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import addToCartIcon from '../../assets/addToCart.svg'
import addToFavoriteIcon from '../../assets/addToFavorite.svg'
import addedToFavoriteIcon from '../../assets/addedToFavorite.svg'
import addedToCartIcon from '../../assets/addedToCart.svg'
import CardItem from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import CardInfo from '../CardInfo/CardInfo';
import getToken from '../../utils/getToken';
import fetchDeleteCartItem from '../../api/cart/fetchDeleteCartItem';
import fetchAddCartItem from '../../api/cart/fetchAddCartItem';
import AuthorizationAlert from '../AuthorizationAlert/AuthorizationAlert';
import fetchSum from '../../api/cart/fetchSum';
import { CartSum } from '../../api/types';

interface CardProps {
    setCartItemsCount: Dispatch<SetStateAction<number>>;
    setFavoriteCount: Dispatch<SetStateAction<number>>;
    setSum: Dispatch<SetStateAction<number>>
    img: string;
    price: number;
    title: string;
    raiting: number;
    id: number; 
    isInCart: boolean;
}

const Card = ({ img, price, raiting, title, id, isInCart, setFavoriteCount, setCartItemsCount, setSum }: CardProps) => {

    const { 0: active, 1: setActive } = useState(false)
    const { 0: favorite, 1: setFavorite } = useState(localStorage.getItem(id.toString()) === 'favorite' ? true : false)
    const { 0: cart, 1: setCart } = useState(isInCart)
    const { 0: showProductModal, 1: setShowProductModal } = useState(false)
    const { 0: showAuthorizationAlert, 1: setShowAuthorizationAlert } = useState(false)
    const nodeRef = useRef(null);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const onHoverHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        if (active) {
            event.currentTarget.classList.remove(cls.hover)
        }
        else {
            event.currentTarget.classList.add(cls.hover)
        }
        setActive((prev: boolean) => !prev)
    }

    const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation()
        setShowProductModal(true)
        setActive(false)
    }

    const addFavoriteHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (favorite) {
            localStorage.removeItem(id.toString())
            setFavoriteCount((prev) => prev - 1)
        }
        else {
            localStorage.setItem(id.toString(), 'favorite')
            setFavoriteCount((prev) => prev + 1)
        }
        setFavorite((prev: boolean) => !prev)
    }

    const addCartHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (cart) {
            fetchDeleteCartItem(id, getToken())
                .then(() => {
                    setCart(false);
                    setCartItemsCount((prev) => prev - 1)
                })
                .then(() => fetchSum(getToken())
                    .then((response: Response) => response.json())
                    .then((cartSum: CartSum) => setSum(cartSum.sum)))
                .catch(() => console.log('there is an error at deleting cart item'))
        }
        else {
            fetchAddCartItem(id, getToken(), 1)
                .then((response: Response) => {
                    if (response.ok) {
                        setCartItemsCount((prev) => prev + 1)
                        return response.json()
                    }
                    if (response.status === 401) {
                        setShowAuthorizationAlert(true)
                        throw new Error(response.status.toString())
                    }
                    else
                        throw new Error(response.status.toString())
                })
                .then(() => setCart((prev: boolean) => !prev))
                .then(() => fetchSum(getToken())
                    .then((response: Response) => response.json())
                    .then((cartSum: CartSum) => setSum(cartSum.sum)))
                .catch((e: Error) => console.log('there is an error at adding cart item: ' + e))
        }
    }
    return (
        <>
            <CSSTransition
                nodeRef={nodeRef}
                in={inView}
                timeout={1000}
                classNames="my-node">
                <div
                    datatype={id.toString()}
                    ref={nodeRef}
                    className={cls.cardWrapper}
                    onMouseEnter={onHoverHandler}
                    onMouseLeave={onHoverHandler}
                >
                    {showAuthorizationAlert && <AuthorizationAlert
                        onHide={() => setShowAuthorizationAlert(false)}
                        show={showAuthorizationAlert}
                    />
                    }

                    {showProductModal && <CardInfo
                        setCartItemsCount={setCartItemsCount}
                        setCart={setCart}
                        setSum={setSum}
                        id={id}
                        onHide={() => setShowProductModal(false)}
                        title={title} show={showProductModal}
                    />
                    }
                    <CardItem onClick={clickHandler} ref={ref} >
                        <CardItem.Img variant="top" loading='lazy' src={img} />
                        <CardItem.Body>
                            <CardItem.Text className={cls.title}>{title}</CardItem.Text>
                            <CardItem.Text className={cls.price} ><b>{price} ₽</b></CardItem.Text>
                            <CardItem.Text className={cls.raiting}>Rate: {raiting}</CardItem.Text>
                        </CardItem.Body>
                    </CardItem>
                    <Button className={cls.favorite}
                        onClick={addFavoriteHandler}>
                        <img src={favorite ? addedToFavoriteIcon : addToFavoriteIcon} alt="" />
                    </Button>
                    <Button className={cls.cart}
                        onClick={addCartHandler}>
                        <img src={cart ? addedToCartIcon : addToCartIcon} alt="" />
                    </Button>
                </div>
            </CSSTransition>
        </>
    )
}
export default Card