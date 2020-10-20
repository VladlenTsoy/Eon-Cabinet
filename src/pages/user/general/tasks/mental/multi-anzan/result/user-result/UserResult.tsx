import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import TrophyResultIntermediate from "../../../../layouts/intermediate/result-intermediate/trophy-result/TrophyResultIntermediate";
import {Modal, Button, Title} from "lib/ui";
import {LoadingBlock} from "lib/ui";
import MoreModal from "./more-modal/MoreModal";
import {gameSelector} from "../../../../../../../../store/common/game/gameSplice";

const WinSound = require("assets/sounds/win.mp3");
const LossSound = require("assets/sounds/loss.mp3");

const BuzzWinSound = new Audio(WinSound);
const BuzzLossSound = new Audio(LossSound);

const UserResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  
  h1.ant-typography{
    font-size: 2.15vw;
  }
`;

const ImageWrapper = styled.div`
  max-height: 300px;
  max-width: 300px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  
  div{
    height: 100%;
  }
  
  img{
    object-fit: contain;
    height: 100%;
    width: 100%;
  }
`;

const MoreWrapper = styled.div`
  background: ${props => props.theme['@component-background']}ed;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 5;
  display: flex;
  transition: all 1s ease-in-out;
  align-items: center;
  justify-content: center;
`;

interface UserResultProps {
    taskKey: number;
    result: boolean | boolean[];
}

const UserResult: React.FC<UserResultProps> = (
    {
        taskKey,
        result,
    }
) => {
    const [loading, setLoading] = useState(true);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleMore, setVisibleMore] = useState(false);
    const {setting, totals} = useSelector(gameSelector);

    const checkResult = useCallback((result: any) => {
        if (setting.group)
            return !result.includes(false);
        return !totals.map((total: any) => !total.user[taskKey] || total.result[taskKey]).includes(false);
    }, [setting, totals, taskKey]);

    useEffect(() => {
        let timeout = setTimeout(() =>
            setLoading(false), (taskKey + 1) * 1000);
        let timeoutSound = setTimeout(() =>
            checkResult(result) ? BuzzWinSound.play() : BuzzLossSound.play(), (taskKey + 1) * 1000 + 400);
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeoutSound);
        }
    }, [checkResult, result, taskKey]);

    const mouseEnterHandler = () =>
        setVisibleMore(true);

    const mouseLeaveHandler = () =>
        setVisibleMore(false);

    const clickHandler = () =>
        setVisibleModal(true);

    const cancel = () =>
        setVisibleModal(false);

    return <UserResultWrapper onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        {visibleMore ? <MoreWrapper>
            <Button ghost size="large" type="primary" onClick={clickHandler}>Посмотреть ответы</Button>
        </MoreWrapper> : null}
        {loading ?
            <LoadingBlock/> :
            <>
                <ImageWrapper>
                    <TrophyResultIntermediate result={checkResult(result)}/>
                </ImageWrapper>
                {checkResult(result) ?
                    <Title level={1}>Правильный ответ!</Title> :
                    <Title level={1}>Неудача!</Title>}
            </>
        }
        <Modal
            centered
            width="auto"
            closable={false}
            visible={visibleModal}
            onCancel={cancel}
        >
            <MoreModal taskKey={taskKey}/>
        </Modal>
    </UserResultWrapper>;
};

export default UserResult;