import React, {useEffect, useRef} from 'react';
import NextArrow from "./next-arrow/NextArrow";
import PrevArrow from "./prev-arrow/PrevArrow";
import TextFit
    from "../../../../../../../teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {Carousel} from "antd";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {totalsSelect} from "../../../../../../../../../store/tasks/totals/reducer";

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
    outputExercise?: (exercise: any) => string;
    checkTimerForAnswer: () => void;
    setCurrent: (current: number) => void;
}

const CarouselLayout: React.FC<CarouselProps> = (
    {
        children,
        setCurrent,
        outputExercise,
        checkTimerForAnswer
    }
) => {
    const carouselRef = useRef<any>();
    const totals = useSelector(totalsSelect);

    const beforeChange = (current: number, next: number) => {
        setCurrent(next + 1);
    };

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
        arrows={Object.values(totals).length >= 2}
        ref={carouselRef}
        nextArrow={NextArrow()}
        prevArrow={PrevArrow()}
    >
        {children || Object.values(totals).map((total: any, key: number) =>
            <TextFitWrapper key={key}>
                <TextFit>
                    <ExerciseWrapper>
                        {outputExercise ? outputExercise(total) : total.exercise.word}
                    </ExerciseWrapper>
                </TextFit>
            </TextFitWrapper>
        )}
    </Carousel>;
};

export default CarouselLayout;