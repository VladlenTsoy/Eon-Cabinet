import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';
import {Steps} from "antd";
import styled from "styled-components";
import {useSelector} from "react-redux";

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
    const {setting, currentTimes, totals} = useSelector((state: any) => state.game);

    return (
        <StepsWrapper current={currentTimes} width={setting.times * 80}>
            {Array(setting.times).fill(2).map((val: any, key: number) =>
                <Step
                    key={key + 1}
                    title={key + 1}
                    icon={<TrophyOutlined/>}
                    status={!(totals[key + 1] && totals[key + 1].hasOwnProperty('result')) ?
                        'wait' : checkResult(totals[key + 1]) ? 'finish' : 'error'}
                />
            )}
        </StepsWrapper>
    );
};

export default StepsIntermediate;