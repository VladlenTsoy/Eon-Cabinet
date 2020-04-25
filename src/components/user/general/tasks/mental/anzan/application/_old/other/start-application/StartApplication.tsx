import React, {useEffect} from 'react';
import {Card} from "lib";
import OutputBlock from "../../../../../../layouts/output/Output";
import ApplicationAnzanWrapper from "../../../../../../layouts/application/_old/anzan/Anzan.layout";
import {useDispatch, useSelector} from "react-redux";
import {totalsChange} from "../../../../../../../../../../store/tasks/totals/action";

interface StartApplicationProps {
    numbers: any;
    addingAnswer: any;
    startApplication: any;
    outputExercise: any;
}

const StartApplication: React.FC<StartApplicationProps> = (
    {
        numbers,
        addingAnswer,
        startApplication,
        outputExercise,
    }
) => {
    const {game} = useSelector((state: any) => state);
    const {totals, currentTimes, status} = game;
    const dispatch = useDispatch();

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status === 'refresh' || status === 'repeat')
                startApplication(totals[currentTimes].exercise, outputExercise);
            else {
                await dispatch(totalsChange(addingAnswer(numbers)));
                startApplication(numbers, outputExercise);
            }
        })();
    }, [numbers, startApplication, outputExercise, addingAnswer, totals, status, dispatch, currentTimes]);

    return (
        <ApplicationAnzanWrapper>
            <Card>
                <OutputBlock/>
            </Card>
        </ApplicationAnzanWrapper>
    );
};

export default StartApplication;