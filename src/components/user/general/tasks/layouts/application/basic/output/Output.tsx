import React from 'react';
import styled from "styled-components";
import TextFit
    from "components/user/teacher/pages/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {useSelector} from "react-redux";

interface OutputStyleProps extends React.HTMLAttributes<HTMLDivElement> {
    time: number;
}

export const OutputWrapper: React.FC<OutputStyleProps> = styled.div<OutputStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 450px;
  width: 450px;
  border-radius: 50%;
  animation: pulsar-primary ${props => props.time}s ease-in-out infinite;

  .text-output {
    width: 450px;
    white-space: nowrap;
    text-align: center;
    font-weight: bolder;
    background: none;
  }
  
  @media (max-width: 576px) {
    height: 250px;
    width: 250px;

    .text-output {
      width: 250px;
    }  
  }

  @keyframes pulsar-primary {
    100% {
      box-shadow: 0 0 3px 0 ${props => props.theme.color_primary};
    }
    0% {
      box-shadow: 0 0 170px 5px ${props => props.theme.color_primary};
    }
  }
`;

interface OutputProps {
    output: string | number
    time: number
}

const Output: React.FC<OutputProps> = ({output, time}) => {
    const {user} = useSelector((state: any) => state);
    return <OutputWrapper
        time={time}
        className={`text-wrapper ${user.setting.anzanColor}`}
    >
        {/* TODO - Доработать отображение */}
        <TextFit widthOnly>
            <div className="text-output">
                {output}
            </div>
        </TextFit>
    </OutputWrapper>;
};

export default React.memo(Output);