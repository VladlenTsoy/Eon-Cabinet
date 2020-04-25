import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LoadingBlock} from "lib";
import BasicApplication from "./basic/BasicApplication";
import DoubleApplication from "./double/DoubleApplication";
import {useAddInternal} from "../../../../../../../../../effects/use-add-interval.effect";
import {useAddTimeout} from "../../../../../../../../../effects/use-add-timeout.effect";

interface OtherApplicationProps {
    numbers: any,
    isMultiplication: boolean;
}

const OtherApplication: React.FC<OtherApplicationProps> = (
    {
        isMultiplication,
        numbers,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    //
    const {setting} = game;
    const [addInterval] = useAddInternal();
    const [addTimeout] = useAddTimeout();

    // Вывод текузего примера
    // const sOutput = useCallback((number: any) => dispatch(gameChangeOutput(number)), [dispatch]);
    const sOutput = useCallback((number: any) => number, [dispatch]);

    // Update exercise mirror
    const updateMirror = useCallback((exercises: any) => {
        return exercises.map((int: any) => parseInt(`${int}${Math.abs(int)}`));
    }, []);

    // Start Application
    const startApplication = useCallback((exercise: any, callBack: any) => {
        sOutput('На старт');
        addTimeout([
            setTimeout(() => sOutput('Внимание'), 1000),
            setTimeout(() => sOutput('Марш'), 2000),
            setTimeout(() => callBack(exercise), 3000),
        ]);
    }, [addTimeout, sOutput]);

    // Count the answer
    const countAnswer = useCallback((exercises: any) => {
        if (isMultiplication)
            return setting.mode === 'multiply' ? exercises[0] * exercises[1] : exercises[0] / exercises[1];
        else
            return exercises.reduce((total: any, val: any) => total + val);
    }, [setting, isMultiplication]);

    return setting.anzan === 'basic' || setting.anzan === 'turbo' ?
        <BasicApplication
            isMultiplication={isMultiplication}
            numbers={numbers}
            addInterval={addInterval}
            addTimeout={addTimeout}
            sOutput={sOutput}
            updateMirror={updateMirror}
            startApplication={startApplication}
            countAnswer={countAnswer}
        /> :
        setting.anzan === 'double' ?
            <DoubleApplication
                isMultiplication={isMultiplication}
                numbers={numbers}
                addInterval={addInterval}
                addTimeout={addTimeout}
                sOutput={sOutput}
                updateMirror={updateMirror}
                startApplication={startApplication}
                countAnswer={countAnswer}
            /> :
            <LoadingBlock/>;
};

export default OtherApplication;