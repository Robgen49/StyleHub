import cls from './CardInfo.module.scss'
import ListGroup from 'react-bootstrap/ListGroup';
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Attribute, CartItem, CartSum, ProductInfo } from '../../api/types'
import fetchProductInfo from '../../api/product/fetchProductInfo'
import Modal from 'react-bootstrap/Modal';
import fetchAttributes from '../../api/type/fetchAttributes';
import fetchOneCartItem from '../../api/cart/fetchOneCartItem';
import getToken from '../../utils/getToken';
import fetchAddCartItem from '../../api/cart/fetchAddCartItem';
import addItemIcon from '../../assets/addItem.svg'
import removeItemIcon from '../../assets/removeItem.svg'
import fetchSum from '../../api/cart/fetchSum';

interface CardInfoProps {
    title: string;
    show: boolean;
    id: number;
    onHide: () => void;
    setSum: Dispatch<SetStateAction<number>>;
    setCart: Dispatch<SetStateAction<boolean>>;
    setCartItemsCount: Dispatch<SetStateAction<number>>
}

const CardInfo = ({ title, show, id, onHide, setSum, setCart, setCartItemsCount }: CardInfoProps) => {
    const { 0: count, 1: setCount } = useState(0)
    const { 0: productInfo, 1: setProductInfo } = useState<ProductInfo>()
    const { 0: attributes, 1: setAttributes } = useState<Attribute[]>()
    useEffect(() => {
        fetchProductInfo(id)
            .then((response: Response) => response.json())
            .then((info: ProductInfo) => {
                setProductInfo(info);
                fetchAttributes(info.product.typeId)
                    .then((response: Response) => response.json())
                    .then((attributes: Attribute[]) => setAttributes(attributes))
                fetchOneCartItem(getToken(), info.product.id)
                    .then((response: Response) => { console.log(info.product.id); return response.json() })
                    .then((cartItem: CartItem) => setCount(cartItem.count))
            })
    }, [])

    const addItemHandler = () => {
        if (productInfo) {
            if (productInfo.product.currentCount > count) {
                fetchAddCartItem(productInfo.product.id, getToken(), count + 1)
                    .then(() => {
                        setCount((prev) => prev + 1);
                        setCart((prev) => {
                            if (prev === false) {
                                setCartItemsCount(n => n + 1);
                            }
                            return true
                        })
                    })
                    .then(() =>
                        fetchSum(getToken())
                            .then((response: Response) => response.json())
                            .then((cartSum: CartSum) => setSum(cartSum.sum)))
            }
        }
    }

    const removeItemHandler = () => {
        if (count > 1) {
            if (productInfo) {
                fetchAddCartItem(productInfo.product.id, getToken(), count - 1)
                    .then(() => setCount((prev) => prev - 1))
                    .then(() =>
                        fetchSum(getToken())
                            .then((response: Response) => response.json())
                            .then((cartSum: CartSum) => setSum(cartSum.sum)))
            }
        }
    }

    return (
        <>
            <Modal
                onHide={onHide}
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cls.wrapper}>
                        <img className={cls.productImg} src={productInfo?.product.image}></img>
                        <div className={cls.info}>
                            <ListGroup className={cls.mainList} >
                                <ListGroup.Item className={cls.listItem}><h5>Price: <div>{productInfo?.product.price}  ₽</div></h5></ListGroup.Item>
                                <ListGroup.Item className={cls.listItem}><h5>Raiting: <div>{productInfo?.product.AwerageRaiting}</div></h5></ListGroup.Item>
                                <ListGroup.Item className={cls.listItem}><h5>In stock: <div>{productInfo?.product.currentCount}</div></h5></ListGroup.Item>
                                <ListGroup.Item className={cls.listItem}><h5>Saled: <div>{productInfo?.product.saledCount}</div></h5></ListGroup.Item>
                            </ListGroup>
                            <div className={cls.params}>
                                <h4>Characteristics</h4>
                                <ListGroup >
                                    {attributes?.map((attribute: Attribute, i: number) => {
                                        return (
                                            <ListGroup.Item key={i} className={cls.listItem}>
                                                <h5>{attribute.name}:{' '}
                                                    <div>
                                                        {productInfo?.productInfoArray[i]?.value}
                                                    </div>
                                                </h5>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </div>
                            <div className={cls.params}>
                                <h4>Current count in cart:</h4>
                                <div className={cls.counter}>
                                    <div className={cls.countIconWrapper}>
                                        <img className={cls.countImg} src={addItemIcon} onClick={addItemHandler} />
                                    </div>
                                    <div className={cls.countIconWrapper}>
                                        {count}
                                    </div>
                                    <div className={cls.countIconWrapper}>
                                        <img className={cls.countImg} src={removeItemIcon} onClick={removeItemHandler} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}
export default CardInfo