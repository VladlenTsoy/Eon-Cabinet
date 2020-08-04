import React, {useEffect, useRef} from 'react';
import {Carousel} from "antd";
import NextArrow from "./next-arrow/NextArrow";
import PrevArrow from "./prev-arrow/PrevArrow";

interface CarouselProps {
    outputs: any[];
    checkTimerForAnswer: () => void;
    setCurrent: (current: number) => void;
}

const CarouselLayout: React.FC<CarouselProps> = (
    {
        outputs,
        children,
        setCurrent,
        checkTimerForAnswer
    }
) => {
    const carouselRef = useRef<any>();

    const beforeChange = (current: number, next: number) =>
        setCurrent(next + 1);

    useEffect(() => {
        document.onkeyup = (e) => {
            if (e.key === "ArrowLeft")
                carouselRef.current.prev();
            else if (e.key === "ArrowRight")
                carouselRef.current.next();
            else if (e.key === "Enter")
                checkTimerForAnswer();
        };
        return () => {
            document.onkeyup = null;
        }
    }, [checkTimerForAnswer]);

    return <Carousel
        dots={false}
        beforeChange={beforeChange}
        arrows={outputs.length > 1}
        ref={carouselRef}
        nextArrow={NextArrow()}
        prevArrow={PrevArrow()}
    >
        {children}
    </Carousel>;
};

export default CarouselLayout;