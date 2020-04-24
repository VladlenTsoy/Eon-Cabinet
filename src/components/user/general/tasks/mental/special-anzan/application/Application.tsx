import React, {useCallback, useEffect} from 'react';
import {Card} from "lib";
import OutputBlock from "../../../layouts/output/Output";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash';
import ApplicationAnzanWrapper from "../../../layouts/application/anzan/Anzan.layout";
import {useOutputTask} from "../../../../../../../effects/use-output-task.effect";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";

const Application: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const {totals, setting, status, currentTimes} = game;
    const [startApplication, , addingAnswer] = useOutputTask({times: setting.times});

    //
    const createNumbers = useCallback(async () => {
        let numbers = [];
        for (let i = 0; i < setting.count; i++) {
            numbers.push(_.random(setting.from, setting.to));
        }
        const _totals = addingAnswer(numbers);
        await dispatch(totalsChange(_totals));
        return numbers;
    }, [dispatch, setting, addingAnswer]);

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
    }, [startApplication, status, createNumbers, totals, currentTimes]);

    return <ApplicationAnzanWrapper>
        <Card>
            <OutputBlock/>
        </Card>
    </ApplicationAnzanWrapper>
};

export default Application;