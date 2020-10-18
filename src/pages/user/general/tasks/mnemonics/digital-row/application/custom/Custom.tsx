import React from 'react';
import TextFit
    from "../../../../../../teacher/pages/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {Button} from "lib/ui";
import styled from "styled-components";
import {FlagOutlined} from '@ant-design/icons';

const ApplicationWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const OutputWrapper = styled.div`
  user-select: none;
  text-align: center;
  width: 100%;
  font-weight: 600;
  height: 250px;
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

interface CustomProps {
    outputs: string;
    finishHandler: any;
}

const Custom:React.FC<CustomProps> = ({outputs, finishHandler}) => {
    return <ApplicationWrapper>
        <TextFit isLoading>
            <OutputWrapper>
                {outputs}
            </OutputWrapper>
        </TextFit>
        <Button type="primary" size="large" icon={<FlagOutlined/>} onClick={finishHandler}>
            Завершить
        </Button>
    </ApplicationWrapper>
};

export default Custom;