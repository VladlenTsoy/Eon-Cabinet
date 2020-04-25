import React, {useCallback} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {random} from 'lodash';
import {FlagOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useAddSpaceToString} from "effects/use-add-space-to-string";
import TextFit
    from "components/user/teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import ApplicationLayout from "../../../layouts/application/Application.layout";
import {settingAnzan} from "store/tasks/setting/reducer";
import {totalsSelect} from "store/tasks/totals/reducer";

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

interface OutputProps {
    outputs: string;
    finishHandler: any;
}

const Output: React.FC<OutputProps> = ({outputs, finishHandler}) => {
    console.log(outputs);
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

const Application: React.FC = () => {
    let setting = useSelector(settingAnzan);
    let totals: any = useSelector(totalsSelect);
    const addSpaceToString = useAddSpaceToString();

    const updateAnswersTotals = useCallback((data, currentTimes) => {
        let fromIntRand = '', toIntRand = '';
        for (let i = 0; i < setting.count; i++) {
            fromIntRand += '1';
            toIntRand += '9';
        }
        let exercise = random(Number(fromIntRand), Number(toIntRand)).toPrecision(setting.count);

        totals[currentTimes] = {
            exercise: exercise,
            answer: exercise,
        };

        return totals;
    }, [setting]);

    const createOutputs = useCallback((totals, currentTimes) => {
        return addSpaceToString(totals[currentTimes].exercise)
    }, [setting]);

    const updateStats = useCallback(() => {
        return {all: 1};
    }, []);


    return <ApplicationLayout
        displayType="custom"
        createOutputs={createOutputs}
        timer
        setting={setting}
        updateAnswersTotals={updateAnswersTotals}
        updateStats={updateStats}
        CustomDisplay={Output}
        nextStatus="answer"
    />
};

export default Application;