import React, {useCallback, useEffect, useState} from 'react';
import Output from "./output/Output";
import {useAddTimeout} from "../../../../../../../../effects/use-add-timeout.effect";
import {useAddInternal} from "../../../../../../../../effects/use-add-interval.effect";

interface MultiOutputProps {
    isWait: boolean;
    isGroup: boolean;
    exercises: any;
    setting: any;
    keyTask: number;
    setCompleted: any;
}

const MultiOutput: React.FC<MultiOutputProps> = (
    {
        isWait,
        isGroup,
        exercises,
        keyTask,
        setting,
        setCompleted,
    }
) => {
    const [isMultiplication] = useState(setting.mode === 'divide' || setting.mode === 'multiply');

    const [output, setOutput] = useState<any>('На старт');
    const [keyBlock, setKey] = useState<any>(0);

    const [addTimeout] = useAddTimeout();
    const [addInterval] = useAddInternal();

    /**
     * Вывод подряд
     *
     * @param output
     * @param count
     * @param time
     * @param i
     */
    const rowOutput = useCallback(
        (
            output: (i: number) => string,
            count: number,
            time: number,
            i: number = 0
        ) => {
            let interval = addInterval(async () => {
                setKey(i);
                if (i >= count) {
                    setCompleted((prevState: any) => prevState.includes(keyTask) ? prevState : [...prevState, keyTask]);
                    clearInterval(interval);
                    setOutput(undefined);
                } else
                    setOutput(output(i++));
            }, time * 1000);
            setOutput(output(i++));
        },
        [addInterval, setCompleted, keyTask]
    );

    /**
     * Вывод упражнений
     *
     * @param exercises
     * @param i
     */
    const outputExercise = useCallback(
        async (exercises: any) => {
            if (!isMultiplication)
                return rowOutput(
                    (i) => exercises[i++],
                    setting.count,
                    setting.time,
                );

            if (isGroup)
                return rowOutput(
                    (i) => exercises[i][0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercises[i][1],
                    setting.times,
                    setting.time,
                );

            addTimeout([
                setTimeout(() => {
                    setOutput(undefined);
                    setCompleted((prevState: any) => prevState.includes(keyTask) ? prevState : [...prevState, keyTask])
                }, setting.time * 1000),
            ]);
            return setOutput(exercises[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + exercises[1]);
        },
        [setting, isMultiplication, addTimeout, isGroup, keyTask, rowOutput, setCompleted]
    );

    /**
     * Начало упражнения
     *
     * @param exercises
     * @param callBack
     */
    const startApplication = useCallback(
        (exercises: any[]) => {
            setOutput('На старт');
            addTimeout([
                setTimeout(() => setOutput('Внимание'), 1000),
                setTimeout(() => setOutput('Марш'), 2000),
                setTimeout(() => outputExercise(exercises), 3000),
            ]);
        },
        [addTimeout, outputExercise]
    );

    useEffect(
        () => {
            if (!isWait)
                startApplication(exercises);
            else
                setCompleted((prevState: any) => prevState.includes(keyTask) ? prevState : [...prevState, keyTask]);
        },
        [exercises, startApplication, isWait, keyTask, setCompleted]
    );

    return <Output
        isMultiplication={isMultiplication}
        output={!isWait ? output : undefined}
        key={keyBlock}
        keyTask={keyBlock}
        setting={setting}
    />;
};

export default MultiOutput;