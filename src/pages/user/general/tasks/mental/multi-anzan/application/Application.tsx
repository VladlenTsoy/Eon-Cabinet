import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useApiUserGeneral} from "../../../../../../../hooks/use-api-user-general.effect";
import IconAbacus from "../../../../../../../assets/images/tasks/abacus.svg";
import {LoadingBlock} from "lib/ui";
import {Card} from "lib/ui";
import MultiOutput from "./multi-output/MultiOutput";
import styled from "styled-components";
import {changeStatus, changeTotals, gameSelector, updateCurrentTotal} from "../../../../../../../store/common/game/gameSplice";
import MultiGridLayout from "../layouts/MultiGrid.layout";

const CardWrapper = styled(Card)`
  &.ant-card{
    height: 100%;
    
    .ant-card-body{
      height: 100%;
    }
  }
`;

const Application: React.FC = () => {
    const {currentTimes, executionMode, totals, setting} = useSelector(gameSelector);
    const [completed, setCompleted] = useState([]);
    const dispatch = useDispatch();

    const addAnswer = useCallback(
        (exercises) => {
            if (setting.mode !== 'multiplication')
                return {
                    exercise: exercises,
                    answer: exercises.map((exercise: any) =>
                        exercise.reduce((acc: number, i: number) => acc + i, 0))
                };

            else if (setting.group)
                return {
                    exercise: exercises,
                    answer: exercises.map((exercise: any, key: number) =>
                        exercise.map((val: any) => setting.windows[key].mode === 'multiply' ? val[0] * val[1] : val[0] / val[1])
                    )
                };

            return {
                exercise: exercises,
                answer: exercises.map((val: any, key: number) =>
                    setting.windows[key].mode === 'multiply' ? val[0] * val[1] : val[0] / val[1])
            };
        },
        [setting]
    );

    //
    const [loading] = useApiUserGeneral({
        cancel: executionMode === 'repeat' && (totals[currentTimes]?.exercise || totals?.exercise),
        url: '/algorithm/multi',
        config: {params: {setting}},
        initValue: [],
        afterRequest: async (data: any) => {
            setting.group?
            dispatch(changeTotals(addAnswer(data))):
            dispatch(updateCurrentTotal(addAnswer(data)));

            if (setting.map((val: any) => val.extra.includes('abacus')).includes(true)) {
                return new Promise((resolve => {
                    const iconAbacus = new Image();
                    iconAbacus.onload = () => resolve(true);
                    iconAbacus.src = IconAbacus;
                }));
            }
        }
    });

    const data = setting.group ?
        totals.exercise || [] :
        totals[currentTimes] ? totals[currentTimes].exercise : [];

    useEffect(() => {
        if (data.length && completed.length >= data.length)
            dispatch(changeStatus('answer'));
    }, [data, completed, dispatch]);

    return loading ?
        <LoadingBlock/> :
        <CardWrapper>
            <MultiGridLayout
                gridGap={1}
                gridGapType="px"
                background="@background-color-base"
                length={data.length}
            >
                {data.map((exercise: any, key: number) =>
                    <MultiOutput
                        isWait={!setting.group && setting.windows[key].times < currentTimes + 1}
                        key={key}
                        isGroup={setting.group}
                        keyTask={key}
                        setting={setting.windows[key]}
                        exercises={exercise}
                        setCompleted={setCompleted}
                    />
                )}
            </MultiGridLayout>
        </CardWrapper>;
};

export default Application;