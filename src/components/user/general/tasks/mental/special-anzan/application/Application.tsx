import React, {useCallback, useEffect} from 'react';
import {Card} from "lib";
import OutputBlock from "../../../layouts/output/Output";
import {useDispatch, useSelector} from "react-redux";
import {
    gameChangeTotals
} from "store/game/actions";
import _ from 'lodash';
import ApplicationAnzanWrapper from "../../../layouts/application/anzan/Anzan.layout";
import {useOutputTask} from "../../../../../../../effects/use-output-task.effect";

const Application: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const {totals, setting, status} = game;
    const [startApplication, , addingAnswer] = useOutputTask({times: setting.times});

    //
    const createNumbers = useCallback(async () => {
        let numbers = [];
        for (let i = 0; i < setting.count; i++) {
            numbers.push(_.random(setting.from, setting.to));
        }
        const _totals = addingAnswer(numbers);
        await dispatch(gameChangeTotals(_totals));
        return numbers;
    }, [dispatch, setting, addingAnswer]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                startApplication(totals);
            else {
                const numbers = await createNumbers();
                startApplication(numbers);
            }
        })();
    }, [startApplication, status, createNumbers, totals]);

    return <ApplicationAnzanWrapper>
        <Card>
            <OutputBlock/>
        </Card>
    </ApplicationAnzanWrapper>
};

export default Application;