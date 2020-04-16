import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    gameChangeStats,
    gameChangeStatus,
} from "../../../../../../../../../store/game/actions";
import StartApplication from "../start-application/StartApplication";

interface BasicApplicationProps {
    numbers: any,
    isMultiplication: boolean;
    addInterval: (interval: any, time: number) => void;
    addTimeout: (timeout: any) => void;
    sOutput: (number: any) => void;
    updateMirror: (exercises: any) => any;
    countAnswer: (exercises: any) => any;
    startApplication: (exercise: any, callBack: (exercise: any) => void) => any;
}

const BasicApplication: React.FC<BasicApplicationProps> = (
    {
        isMultiplication,
        numbers,
        addTimeout,
        addInterval,
        sOutput,
        updateMirror,
        startApplication,
        countAnswer,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const {totals, currentTimes, setting} = game;
    const dispatch = useDispatch();

    // Output exercise
    const outputExercise = useCallback((exercise: any, i: number = 0) => {
        if (isMultiplication) {
            sOutput(exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercise[1]);
            addTimeout([
                setTimeout(() => dispatch(gameChangeStatus('answer')), setting.time * 1000),
            ])
        } else {
            addInterval(() => {
                if (i === (setting.count))
                    dispatch(gameChangeStatus(setting.extra && setting.extra.includes('group') ? 'intermediate' : 'answer'));
                else
                    sOutput(exercise[i++]);
            }, setting.time * 1000);

            // Первый вывод числа
            sOutput(exercise[i++]);
        }
    }, [isMultiplication, sOutput, setting, dispatch, addInterval, addTimeout]);

    // Adding Answers to the Totals
    const addingAnswer = useCallback((data: any) => {
        let updateData = setting.extra && setting.extra.includes('mirror') ? updateMirror(data) : data;
        totals[currentTimes] = {
            exercise: updateData,
            answer: countAnswer(updateData)
        };
        return totals;
    }, [countAnswer, currentTimes, updateMirror, setting.extra, totals]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        dispatch(gameChangeStats({all: setting.times}));
    }, [dispatch, setting]);

    return <StartApplication
        numbers={numbers}
        addingAnswer={addingAnswer}
        outputExercise={outputExercise}
        startApplication={startApplication}
    />;
};

export default BasicApplication;