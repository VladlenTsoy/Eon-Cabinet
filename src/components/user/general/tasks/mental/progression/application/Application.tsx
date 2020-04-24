import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "lib";
import OutputBlock from "../../../layouts/output/Output";
import ApplicationAnzanWrapper from "../../../layouts/application/_old/anzan/Anzan.layout";
import {useOutputTask} from "../../../../../../../effects/use-output-task.effect";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";

const Application: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const {totals, currentTimes, setting, status} = game;
    const [startApplication, , addingAnswer] = useOutputTask({times: 1});

    //
    const createNumbers = useCallback(async () => {
        const numbers = [];
        for (let i = 1; i <= setting.count; i++) {
            numbers.push(i);
        }
        const _totals = addingAnswer(numbers);
        dispatch(totalsChange(_totals));
        return numbers;
    }, [dispatch, addingAnswer, setting,]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                startApplication(totals[currentTimes].exercise);
            else {
                const numbers = await createNumbers();
                startApplication(numbers);
            }
        })();
    }, [startApplication, status, currentTimes, createNumbers, totals]);

    return <ApplicationAnzanWrapper>
        <Card>
            <OutputBlock/>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default Application;
