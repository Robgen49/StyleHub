import cls from './Pagination.module.scss'
import { Dispatch, SetStateAction, useState } from 'react';
import { Container } from 'react-bootstrap';
import PaginationItem from 'react-bootstrap/Pagination';
import { useResize } from '../../hooks/useResize';

interface PaginationProps {
    max: number,
    setPageNumber: Dispatch<SetStateAction<number>>
}

const Pagination = ({ max, setPageNumber }: PaginationProps) => {

    const { 0: active, 1: setActive } = useState(1)
    const width = useResize()

    const handlePaginationItemClick = (pageNumber: number) => {
        setActive(pageNumber);
        setPageNumber(pageNumber - 1)
    };

    const renderPaginationItems = () => {
        const items = [];
        let maxVisiblePages = 5;

        if (width === 'sm') {
            maxVisiblePages = 4
        }
        if (width === 'md'){
            maxVisiblePages = 3
        }

        let startPage = Math.max(active - Math.floor(maxVisiblePages / 2), 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, max);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }

        if (startPage > 1) {
            items.push(
                <PaginationItem.Item className={cls.paginatonItem} key={1} onClick={() => handlePaginationItemClick(1)}>
                    {1}
                </PaginationItem.Item>,
            );
            if (startPage > 2) {
                items.push(<PaginationItem.Ellipsis className={cls.paginatonItem} key="startEllipsis" />);
            }
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <PaginationItem.Item
                    className={cls.paginatonItem}
                    key={number}
                    active={number === active}
                    onClick={() => handlePaginationItemClick(number)}
                >
                    {number}
                </PaginationItem.Item>,
            );
        }

        if (endPage < max) {
            if (endPage < max - 1) {
                items.push(<PaginationItem.Ellipsis className={cls.paginatonItem} key="endEllipsis" />);
            }
            items.push(
                <PaginationItem.Item
                    className={cls.paginatonItem}
                    key={max}
                    onClick={() => handlePaginationItemClick(max)}
                >
                    {max}
                </PaginationItem.Item>,
            );
        }

        return items;
    };

    return (
        <Container className={cls.container}>
            <PaginationItem size={width === 'sm' ? 'sm' : 'lg'}>
                <PaginationItem.First onClick={() => handlePaginationItemClick(1)} />
                <PaginationItem.Prev
                    onClick={() => handlePaginationItemClick(active - 1)}
                />
                {renderPaginationItems()}
                <PaginationItem.Next
                    onClick={() => handlePaginationItemClick(active + 1)}
                />
                <PaginationItem.Last
                    onClick={() => handlePaginationItemClick(max)}
                />
            </PaginationItem>
        </Container>
    );
}
export default Pagination