import { Container } from 'react-bootstrap';
import cls from './Carousel.module.scss'
import CarouselItems from 'react-bootstrap/Carousel';

export interface CarouselItem {
    image: string;
    title: string;
    description: string;
}

export interface CarouselProps {
    items: CarouselItem[]
}

const Carousel = ({ items }: CarouselProps) => {
    return (
        <Container className={cls.container}>
            <div className={cls.wrapper}>
                <CarouselItems data-bs-theme="dark">
                    {items.map(item => (
                        <CarouselItems.Item key={item.title} className={cls.item}>
                            <img className="d-block w-100" src={item.image} />
                            <CarouselItems.Caption>
                                <h5>{item.title}</h5>
                                <p>{item.description}</p>
                            </CarouselItems.Caption>
                        </CarouselItems.Item>
                    ))}
                </CarouselItems>
            </div>
        </Container>
    )
}
export default Carousel