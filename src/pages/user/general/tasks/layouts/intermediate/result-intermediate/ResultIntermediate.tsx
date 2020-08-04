import React, {useEffect} from 'react';
import {Typography} from "antd";
import styled from "styled-components";
import TrophyResultIntermediate from "./trophy-result/TrophyResultIntermediate";
import BgConfettiIntermediate from "../layouts/bg-confetti/BgConfettiIntermediate.layout";

const WinSound =  require("assets/sounds/win.mp3");
const LossSound = require("assets/sounds/loss.mp3");

const BuzzWinSound = new Audio(WinSound);
const BuzzLossSound = new Audio(LossSound);

const {Title} = Typography;

const CardWrapper = styled.div`
  .result-content {
    text-align: center;
    padding-top: 2.5rem;
  }
`;

interface ResultIntermediateProps {
    total: any;
    checkResult: (totals: any) => boolean;
}

const ResultIntermediate: React.FC<ResultIntermediateProps> = ({total, checkResult}) => {
    useEffect(() => {
        let tmp = setTimeout(() => checkResult(total) ? BuzzWinSound.play() : BuzzLossSound.play(), 400);
        return () => {
            clearTimeout(tmp);
        }
    }, [checkResult, total]);

    return <>
        <CardWrapper>
            <div className="result-content">
                <TrophyResultIntermediate result={checkResult(total)}/>
                {checkResult(total) ?
                    <Title level={1}>Правильный ответ!</Title> :
                    <Title level={1}>Неудача!</Title>}
            </div>
        </CardWrapper>
        <BgConfettiIntermediate result={checkResult(total)}/>
    </>
};

export default ResultIntermediate;