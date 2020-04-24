import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "lib";
import {gameChangeStats, gameChangeStatus} from "store/game/actions";
import _ from 'lodash';
import TimerBlock from "../../../layouts/application/_old/timer/Timer";
import { FlagOutlined } from '@ant-design/icons';
import {Button, Modal} from "antd";
import {useAddSpaceToString} from "../../../../../../../effects/use-add-space-to-string";
import ApplicationAnzanWrapper from "../../../layouts/application/_old/anzan/Anzan.layout";
import TextFit
    from "components/user/teacher/training/tasks/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import PreparationLayout from "../../../layouts/application/preparation/Preparation.layout";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";

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

const Application:React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const [output, setOutput] = useState('');
    const dispatch = useDispatch();

    const addSpaceToString = useAddSpaceToString();

    const {totals, currentTimes, setting, status} = game;

    // Adding Answers to the Totals
    const addingAnswer = useCallback((data: any) => {
        totals[currentTimes] = {exercise: data, answer: data};
        return totals;
    }, [totals, currentTimes]);

    // Start Application
    const startApplication = useCallback((exercise: any) => {
        setOutput(String(exercise));
        dispatch(gameChangeStats({all: String(exercise).length}));
    }, [dispatch]);

    //
    const createNumbers = useCallback(async () => {
        let fromIntRand = '', toIntRand = '';
        for (let i = 0; i < setting.count; i++) {
            fromIntRand += '1';
            toIntRand += '9';
        }
        let exercise = _.random(Number(fromIntRand), Number(toIntRand)).toPrecision(setting.count);
        const _totals = addingAnswer(exercise);
        await dispatch(totalsChange(_totals));
        return exercise;
    }, [setting, dispatch, addingAnswer]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                startApplication(totals[currentTimes].exercise);
            else {
                let exercise = await createNumbers();
                startApplication(exercise);
            }
        })();
    }, [startApplication, status, currentTimes, totals, createNumbers]);

    //
    const timeIsRunningOut = () => {
        return Modal.warning({
            title: "У вас еще осталось время, Вы уверены что хотите перейти к ответам?",
            onOk() {
                dispatch(gameChangeStatus('answer'))
            }
        });
    };

    const finishHandler = () => {
        dispatch(gameChangeStatus('answer'));
    };

    return (
        <PreparationLayout>
            <ApplicationAnzanWrapper>
                {
                    (status === 'start' ||
                        status === 'again' ||
                        status === 'repeat' ||
                        status === 'refresh') ?
                        <TimerBlock
                            time={setting.time}
                        /> : null
                }
                <Card>
                    <ApplicationWrapper>
                        <TextFit isLoading key={output}>
                            <OutputWrapper>
                                {addSpaceToString(output)}
                            </OutputWrapper>
                        </TextFit>
                        <Button type="primary" size="large" icon={<FlagOutlined />} onClick={finishHandler}>
                            Завершить
                        </Button>
                    </ApplicationWrapper>
                </Card>
            </ApplicationAnzanWrapper>
        </PreparationLayout>
    );
};

export default Application;