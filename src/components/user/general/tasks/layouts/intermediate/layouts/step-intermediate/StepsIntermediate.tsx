import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';
import {Steps} from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../../store/reducers/common/game/reducer";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";
import {totalsSelect} from "../../../../../../../../store/reducers/common/tasks/totals/reducer";

const {Step} = Steps;

const StepsWrapper = styled<any>(Steps)`
  &.ant-steps{
    width: ${(props: any) => props.width}px;
    max-width: 900px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  
    .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon{
      color: ${props => props.theme.color_warning};
    }
    .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after{
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
`;

interface StepsIntermediateProps {
    checkResult: (totals: any) => boolean
}

const StepsIntermediate: React.FC<StepsIntermediateProps> = ({checkResult}) => {
    const {currentTimes} = useSelector(game);
    const setting = useSelector(settingAnzan);
    const totals = useSelector(totalsSelect);

    const checkStatus = (total: any, key: number): 'wait' | 'finish' | 'error' => {
        if (currentTimes >= key)
            return checkResult(total) ? 'finish' : 'error';
        return 'wait';
    };

    return <StepsWrapper current={currentTimes+1} width={setting.times * 80}>
        {Array(setting.times).fill(2).map((val: any, key: number) =>
            <Step
                key={key + 1}
                title={key + 1}
                icon={<TrophyOutlined/>}
                status={checkStatus(totals[key], key)}
            />
        )}
    </StepsWrapper>
};

export default React.memo(StepsIntermediate);