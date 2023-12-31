import { useEffect, useState } from "react";

function useResize() {
    // стейт ширины окна браузера
    const [width, setWidth] = useState(window.innerWidth);

    // подписка на изменение ширины окна с задержкой на секунду
    useEffect(function() {
        function handleResize(e) {
            setTimeout(function() {
                setWidth(e.target.innerWidth);
            }, 1000)
        }
        window.addEventListener('resize', handleResize);
        return function() {
            window.removeEventListener('resize', handleResize);
        }
    }, [width])

    return width;
}

export default useResize;