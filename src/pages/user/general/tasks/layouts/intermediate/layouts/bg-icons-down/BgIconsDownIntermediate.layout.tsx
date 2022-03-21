import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CheckCircleOutlined, ExclamationCircleOutlined, FlagOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {gameSelector} from "store/game/gameSplice";

const BgIconLeft = styled.div`
  display: inline-flex;
  position: absolute;
  left: -45px;
  bottom: -35px;
  font-size: 300px;
  z-index: 0;
  color: ${props => props.theme.color_minimal};
  opacity: 0.1;
  
  @media (max-width: 576px) {
    font-size: 160px;
  }
`;

const BgIconRight = styled<any>(BgIconLeft)`
  left: auto;
  font-size: 230px;
  right: 15px;
  bottom: -35px;
  
  @media (max-width: 576px) {
    font-size: 160px;
  }
`;

const BgIconsDownIntermediateLayout: React.FC = () => {
    const {currentTimes, setting, totals} = useSelector(gameSelector);

    return <>
        <BgIconLeft>
            {totals[currentTimes].result ? <CheckCircleOutlined/> : <ExclamationCircleOutlined/>}
        </BgIconLeft>
        <BgIconRight>
            {currentTimes + 1 >= setting.times ? <FlagOutlined/> : <ArrowRightOutlined/>}
        </BgIconRight>
    </>
};

export default React.memo(BgIconsDownIntermediateLayout);
