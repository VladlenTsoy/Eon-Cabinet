import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import {Carousel} from "antd";
import NextArrow from "./next-arrow/NextArrow";
import PrevArrow from "./prev-arrow/PrevArrow";
import TextFit
    from "../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";

const ExerciseWrapper = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const TextFitWrapper = styled.div`
  @media (max-width: 576px) {
    padding: 1rem;
  }
`;

interface CarouselProps {
    outputs: any[];
    checkTimerForAnswer: () => void;
    setCurrent: (current: number) => void;
}


const Layout: React.FC<CarouselProps> = (
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
        {children || outputs.map((output: any, key: number) =>
            <TextFitWrapper key={key}>
                <TextFit>
                    <ExerciseWrapper>
                        {output}
                    </ExerciseWrapper>
                </TextFit>
            </TextFitWrapper>
        )}
    </Carousel>;
};

export default Layout;