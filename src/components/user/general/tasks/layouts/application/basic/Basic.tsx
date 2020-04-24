import React, {useCallback, useEffect, useState} from 'react';
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import {useAddInternal} from "../../../../../../../effects/use-add-interval.effect";
import {useDispatch, useSelector} from "react-redux";
import {StatusProps} from "../../../../../../../store/game/types";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../store/game/reducer";
import ApplicationAnzanWrapper from "../anzan/Anzan.layout";
import {Card} from "../../../../../../../lib";
import BasicOutput from "../../output/ModeOutput/BasicOutput";

interface BasicProps {
    time: number;
    nextStatus: StatusProps;
}

const Basic: React.FC<BasicProps> = (
    {
        time,
        nextStatus
    }
) => {
    const totals = useSelector(totalsSelect);
    const {currentTimes} = useSelector(game);
    const [output, setOutput] = useState();
    const [addInterval] = useAddInternal();
    const dispatch = useDispatch();

    // Вывод цифр
    const outputInterval = useCallback((exercise: any, i: number = 0) => {
        addInterval(() => {
            if (i >= exercise.length)
                return false;
            // return dispatch(gameChangeStatus(nextStatus));

            setOutput(exercise[i++]);
        }, time * 1000);

        // Первый вывод числа
        setOutput(exercise[i++]);
    }, [dispatch, addInterval]);

    useEffect(() => {
        outputInterval(totals[currentTimes].output);
    }, [outputInterval, totals]);

    // TODO - заменить ApplicationAnzanWrapper
    return <ApplicationAnzanWrapper>
        <Card>
            <BasicOutput output={output} state="start" time={1}/>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default Basic;