import { useState, useEffect } from 'react';

export const SCREEN_SM = 767;
export const SCREEN_MD = 992;
export const SCREEN_LG = 1200;

export const useResize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = (event: Event) => {
            const target = event?.target as Window
            setWidth(target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    if (width <= SCREEN_SM)
        return 'sm'
    else if (width <= SCREEN_MD)
        return 'md'
    else
        return 'lg'
};