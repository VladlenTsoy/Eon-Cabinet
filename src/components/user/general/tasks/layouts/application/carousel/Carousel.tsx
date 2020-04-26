import React, {useState} from 'react';
import styled from "styled-components";
import Number from "./number/Number";
import {Button} from "antd";
import {FlagOutlined} from '@ant-design/icons';
import CarouselLayout from "./Carousel.layout";

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1rem;
`;

interface CarouselProps {
    outputs: any[];
    topNumber?: boolean;
    earlierCompletion: () => void;
}

const Carousel: React.FC<CarouselProps> = (
    {
        children,
        topNumber,
        outputs,
        earlierCompletion,
    }
) => {
    const [current, setCurrent] = useState(1);
    return <>
        {topNumber ? <Number current={current}/> : null}
        <CarouselLayout
            outputs={outputs}
            setCurrent={setCurrent}
            checkTimerForAnswer={earlierCompletion}
        >
            {children}
        </CarouselLayout>
        <ButtonWrapper>
            <Button type="primary" icon={<FlagOutlined/>} size="large" onClick={earlierCompletion}>
                Завершить
            </Button>
        </ButtonWrapper>
    </>;
};

export default Carousel;