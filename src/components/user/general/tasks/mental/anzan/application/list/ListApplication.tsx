import React, {useCallback, useEffect, useState} from 'react';
import TimerBlock from "../../../../layouts/application/timer/Timer";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "antd";
import {gameChangeStats, gameChangeTotals} from "../../../../../../../../store/game/actions";
import {LoadingBlock} from "lib";
import TableApplication from "./table/TableApplication";

interface ListApplicationProps {
    numbers: any,
    isMultiplication: boolean;
}

const ListApplication: React.FC<ListApplicationProps> = (
    {
        numbers,
        isMultiplication,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(true);
    const {setting, status} = game;
    const dispatch = useDispatch();

    // Adding Answers to the Totals
    const addingAnswer = useCallback((data: any) => {
        const totalUpdated: any = [];
        data.map((exercise: any, times: number) => {
            if (isMultiplication)
                totalUpdated[times] = {
                    exercise: setting.mode === 'multiply' ? exercise[0] + ' * ' + exercise[1] : exercise[0] + ' / ' + exercise[1],
                    answer: setting.mode === 'multiply' ? exercise[0] * exercise[1] : exercise[0] / exercise[1],
                    result: null,
                    user: null
                };
            else {
                let answer = exercise.reduce((total: any, val: any) => total + val);
                totalUpdated[times] = {exercise: exercise, answer, result: null, user: null};
            }
            return exercise;
        });

        return totalUpdated;
    }, [isMultiplication, setting]);

    // Обновление статаов
    const updateStats = useCallback(() => {
        dispatch(gameChangeStats({all: (isMultiplication ? setting.tables * setting.column * setting.rows : setting.tables * setting.column)}));
    }, [dispatch, setting, isMultiplication]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                updateStats();
            else {
                await dispatch(gameChangeTotals(addingAnswer(numbers)));
                updateStats();
            }
            setLoading(false)
        })();
    }, [dispatch, numbers, status, updateStats, addingAnswer]);

    // Сообщение при завершении времени
    const timeIsRunningOut = () => {
        return Modal.warning({
            title: 'This is a warning message',
            content: 'some messages...some messages...',
            onOk() {
            }
        });
    };

    return loading ?
        <LoadingBlock/> :
        <>
            {
                status === 'start' ||
                status === 'again' ||
                status === 'repeat' ||
                status === 'refresh' ?
                    <TimerBlock
                        time={setting.time}
                        callback={timeIsRunningOut}
                    /> : null
            }
            <TableApplication isMultiplication={isMultiplication}/>
        </>;
};

export default ListApplication;