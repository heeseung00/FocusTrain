import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebouncedWinSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 100);

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
};

export default useDebouncedWinSize;
