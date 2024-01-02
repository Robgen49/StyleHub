import { Button, Container } from 'react-bootstrap';
import cls from './Cards.module.scss'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from '../Card/Card';
import { useResize } from '../../hooks/useResize';
import Pagination from '../Pagination/Pagination';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import fetchProducts from '../../api/product/fetchProducts';
import { CartItem, CartSum, Order, Product } from '../../api/types';
import CartPlaceholder from '../CartPlaceholder/CartPlaceholder';
import fetchCartItems from '../../api/cart/fetchCartItems';
import getToken from '../../utils/getToken';
import { Items } from '../../pages/Main/Main';
import fetchSum from '../../api/cart/fetchSum';
import fetchGetOrders from '../../api/order/fetchOrders';
import OrderCard from '../OrderCard/OrderCard';
import fetchCreateOrder from '../../api/order/fetchCreateOrder';

export interface CardsProps {
    setOrderItemsCount: Dispatch<SetStateAction<number>>;
    setCartItemsCount: Dispatch<SetStateAction<number>>;
    setFavoriteCount: Dispatch<SetStateAction<number>>;
    setShowItems: Dispatch<SetStateAction<Items>>;
    showItems: Items;
    searchValue: string;
}

const Cards = ({ setCartItemsCount, setShowItems, setFavoriteCount, setOrderItemsCount, showItems, searchValue }: CardsProps) => {
    const width = useResize()
    const cardCountsPerPage = {
        sm: 10,
        md: 15,
        lg: 24
    }
    const cardsCount = cardCountsPerPage[width]
    const { 0: cards, 1: setCards } = useState<Product[]>([])
    const { 0: pageNumber, 1: setPageNumber } = useState(0)
    const { 0: showLoad, 1: setLoad } = useState(true)
    const { 0: cartItems, 1: setCartItems } = useState<CartItem[]>()
    const { 0: orders, 1: setOrders } = useState<Order[]>()
    const { 0: sum, 1: setSum } = useState(0)

    useEffect(() => {
        fetchProducts()
            .then((response: Response) => {
                if (response.ok) {
                    return response.json()
                }
                else
                    throw new Error(response.status.toString())
            })
            .then(async (result: Product[]) => {
                if (result) {
                    if (searchValue.length === 0)
                        setCards(result);
                    else {
                        setCards(result.filter((product: Product) =>
                            product.title.toLowerCase().includes(searchValue.toLowerCase())))
                    }
                }
            })
            .catch((e: Error) => console.log('there is an error in fethcing products: ' + e));

        fetchCartItems(getToken())
            .then((response: Response) => {
                if (response.ok) {
                    return response.json()
                }
                if (response.status === 401) {
                    setCartItems([]);
                    setLoad(false);
                    throw new Error(response.status.toString())
                }
                else
                    throw new Error(response.status.toString())
            })
            .then((result: CartItem[]) => {
                setCartItemsCount(result.length)
                setCartItems(result)
                setLoad(false);
            })
            .catch((e: Error) => {
                console.log('there is an error at getting cart-items: ' + e)
            });

        fetchSum(getToken())
            .then((response: Response) => response.json())
            .then((cartSum: CartSum) => setSum(cartSum.sum))

        fetchGetOrders(getToken())
            .then((response: Response) => response.json())
            .then((orders: Order[]) => {
                setOrders(orders);
                setOrderItemsCount(orders.length)
            })

    }, [showItems, searchValue])

    const buyHandler = () => {
        fetchCreateOrder(getToken())
            .then((response: Response) => response.json())
            .then((order: Order) => {
                if (orders) {
                    setOrders([...orders, order])
                }
                else {
                    setOrders([order])
                }
                setCartItems([])
                setShowItems('All')
            })
    }

    return (
        <>
            <Container className={cls.container}>
                {showLoad && <Row xs={1} md={3} xl={4} sm={1} className="g-2"> {Array.from({ length: 10 }).map((_, idx) => (
                    <Col key={idx}>
                        <CartPlaceholder key={idx} />
                    </Col>))
                }
                </Row>}
                {(!showLoad && showItems === 'All' && Array.isArray(cartItems)) && <Row xs={1} md={3} xl={4} sm={1} className="g-2">{
                    cards.slice(pageNumber * cardsCount, pageNumber * cardsCount + cardsCount).map((product: Product, idx: number) => (
                        <Col key={idx}>
                            <Card
                                setSum={setSum}
                                isInCart={cartItems.map(e => e.productId).includes(product.id)}
                                setCartItemsCount={setCartItemsCount}
                                setFavoriteCount={setFavoriteCount}
                                id={product.id}
                                img={product.image}
                                price={product.price}
                                title={product.title}
                                raiting={product.AwerageRaiting}
                                key={idx}>
                            </Card>
                        </Col>
                    ))}</Row>}
                {(showItems === 'Favorite' && Array.isArray(cartItems)) && <><Row xs={1} md={3} xl={4} sm={1} className="g-2">
                    {cards.filter((product: Product) => localStorage.getItem(product.id.toString()) === 'favorite').map((product: Product, idx: number) => (
                        <Col key={idx}>
                            <Card
                                setSum={setSum}
                                isInCart={cartItems ? cartItems.map(e => e.productId).includes(product.id) : false}
                                setCartItemsCount={setCartItemsCount}
                                setFavoriteCount={setFavoriteCount}
                                id={product.id}
                                img={product.image}
                                price={product.price}
                                title={product.title}
                                raiting={product.AwerageRaiting}
                                key={idx}>
                            </Card>
                        </Col>
                    ))}
                </Row>
                </>
                }
                {(showItems === 'Cart' && Array.isArray(cartItems)) && <><Row xs={1} md={3} xl={4} sm={1} className="g-2">
                    {cards.filter((product: Product) => cartItems ? cartItems.map(e => e.productId).includes(product.id) : false).map((product: Product, idx: number) => (
                        <Col key={idx}>
                            <Card
                                setSum={setSum}
                                isInCart={true}
                                setCartItemsCount={setCartItemsCount}
                                setFavoriteCount={setFavoriteCount}
                                id={product.id}
                                img={product.image}
                                price={product.price}
                                title={product.title}
                                raiting={product.AwerageRaiting}
                                key={idx}>
                            </Card>
                        </Col>
                    ))}
                </Row>
                    <div className={cls.totalPrice}>
                        <h4 className={cls.totalPriceTitle}>TotalPrice</h4>
                        <h4 className={cls.totalPriceValue}>{sum} ₽</h4>
                        <div className={cls.buy}>
                            <Button onClick={buyHandler} size="lg">BUY NOW</Button>
                        </div>
                    </div>

                </>
                }
                {(showItems === 'Order' && Array.isArray(orders)) && <><Row xs={1} md={3} xl={4} sm={1} className="g-2">
                    {orders.map((el, idx) => (
                        <Col key={idx}>
                            <OrderCard
                                createdAt={el.createdAt}
                                completedAt={el.completedAt}
                                id={el.id}
                                key={idx}
                            />
                        </Col>
                    ))}
                </Row>
                </>
                }
            </Container >
            {showItems === 'All' &&
                <Pagination setPageNumber={setPageNumber} max={Math.ceil(cards.length / cardsCount)} />
            }
        </>
    );
}

export default Cards;