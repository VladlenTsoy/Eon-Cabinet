import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Icon} from '@ant-design/compatible';

const BgIconLeft = styled(Icon)`
  position: absolute;
  left: -45px;
  bottom: -35px;
  font-size: 300px;
  z-index: 0;
  color: ${props => props.theme.color_minimal};
  opacity: 0.1;
`;

const BgIconRight = styled(Icon)`
  position: absolute;
  right: 15px;
  bottom: -35px;
  font-size: 230px;
  z-index: 0;
  color: ${props => props.theme.color_minimal};
  opacity: 0.1;
`;

const BgIconsDownIntermediateLayout: React.FC = () => {
    const {setting, currentTimes, totals} = useSelector((state: any) => state.game);
    return <>
        <BgIconLeft type={totals[currentTimes].result ? 'check-circle' : 'exclamation-circle'}/>
        <BgIconRight type={currentTimes >= setting.times ? 'flag' : 'arrow-right'}/>
    </>
};

export default BgIconsDownIntermediateLayout;