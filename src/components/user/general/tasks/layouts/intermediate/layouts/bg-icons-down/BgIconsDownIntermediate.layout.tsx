import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CheckCircleOutlined, ExclamationCircleOutlined, FlagOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {game} from "../../../../../../../../store/reducers/common/game/reducer";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../../store/reducers/common/tasks/totals/reducer";

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

const BgIconRight = styled(BgIconLeft)`
  left: auto;
  font-size: 230px;
  right: 15px;
  bottom: -35px;
  
  @media (max-width: 576px) {
    font-size: 160px;
  }
`;

const BgIconsDownIntermediateLayout: React.FC = () => {
    const {currentTimes} = useSelector(game);
    const setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);
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