import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CheckCircleOutlined, ExclamationCircleOutlined, FlagOutlined, ArrowRightOutlined} from '@ant-design/icons';

const BgIconLeft = styled.div`
  display: inline-flex;
  position: absolute;
  left: -45px;
  bottom: -35px;
  font-size: 300px;
  z-index: 0;
  color: ${props => props.theme.color_minimal};
  opacity: 0.1;
`;

const BgIconRight = styled(BgIconLeft)`
  left: auto;
  font-size: 230px;
  right: 15px;
  bottom: -35px;
`;

const BgIconsDownIntermediateLayout: React.FC = () => {
    const {setting, currentTimes, totals} = useSelector((state: any) => state.game);
    return <>
        <BgIconLeft>
            {totals[currentTimes].result ? <CheckCircleOutlined/> : <ExclamationCircleOutlined/>}
        </BgIconLeft>
        <BgIconRight>
            {currentTimes >= setting.times ? <FlagOutlined/> : <ArrowRightOutlined/>}
        </BgIconRight>
    </>
};

export default BgIconsDownIntermediateLayout;