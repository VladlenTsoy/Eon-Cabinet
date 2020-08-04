import React from 'react';
import styled from "styled-components";
import TextFit
    from "../../../../../../../teacher/pages/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {useAppContext} from "store/context/use-app-context";
import {random} from "lodash";

const TurboOutputWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  //background: red;
`;

interface ActiveBlockStyle extends React.HTMLAttributes<HTMLDivElement> {
    width: number;
    height: number;
    top: number;
    left: number;
}

const ActiveBlock: React.FC<ActiveBlockStyle> = styled.div<ActiveBlockStyle>`
  position: absolute;
  //background: #ffffff;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  
  .text-output {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    white-space: nowrap;
    text-align: center;
    font-weight: bolder;
    background: none;
    line-height: 1;
  }
`;

interface TurboProps {
    output: string;
}

const TurboOutput: React.FC<TurboProps> = ({output}) => {
    const {user} = useAppContext();
    const OutputHeight = 150;
    const OutputWidth = 300;
    let turboWrapper = document.getElementById('application');

    let topPosition = () => turboWrapper ? random(0, turboWrapper.clientHeight - OutputHeight) : 0;
    let leftPosition = () => turboWrapper ? random(0, turboWrapper.clientWidth - OutputWidth) : 0;

    return <TurboOutputWrapper>
        <ActiveBlock width={OutputWidth} height={OutputHeight} top={topPosition()} left={leftPosition()}>
            <TextFit>
                <div className={`text-output ${user.setting.anzanColor}`}>
                    {output}
                </div>
            </TextFit>
        </ActiveBlock>
    </TurboOutputWrapper>;
};

export default React.memo(TurboOutput);