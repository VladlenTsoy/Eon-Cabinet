import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import Number from "./number/Number";
import {Button, Modal} from "antd";
import {FlagOutlined} from '@ant-design/icons';
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import {useDispatch} from "react-redux";
import {StatusProps} from "../../../../../../../store/game/types";
import Layout from "./layout";

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
    nextStatus: StatusProps;
    outputs: any[];
    topNumber?: boolean;
}

const Carousel: React.FC<CarouselProps> = (
    {
        children,
        topNumber,
        nextStatus,
        outputs,
    }
) => {
    const [current, setCurrent] = useState(1);
    const dispatch = useDispatch();

    const checkTimerForAnswer = useCallback(() => {
        Modal.confirm({
            title: "У вас еще осталось время, Вы уверены что хотите перейти к ответам?",
            onOk: () => {
                dispatch(gameChangeStatus(nextStatus));
            }
        });
    }, [dispatch]);

    return <>
        {topNumber ? <Number current={current}/> : null}
        <Layout
            outputs={outputs}
            setCurrent={setCurrent}
            checkTimerForAnswer={checkTimerForAnswer}
        >
            {children}
        </Layout>
        <ButtonWrapper>
            <Button type="primary" icon={<FlagOutlined/>} size="large" onClick={checkTimerForAnswer}>
                Завершить
            </Button>
        </ButtonWrapper>
    </>;
};

export default Carousel;