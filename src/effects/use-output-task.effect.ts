import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAddInternal} from "./use-add-interval.effect";
import {gameChangeOutput, gameChangeStats, gameChangeStatus} from "../store/game/actions";
import {useAddTimeout} from "./use-add-timeout.effect";

export const useOutputTask = ({times}: any) => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const [addTimeout] = useAddTimeout();
    const [addInterval] = useAddInternal();

    const {totals, currentTimes, setting} = game;
    const sOutput = useCallback((out: string) => dispatch(gameChangeOutput(out)), [dispatch]);

    // Adding Answers to the Totals
    const addingAnswer = useCallback((data: number[]) => {
        let answer = data.reduce((total: any, val: any) => total + val);
        totals[currentTimes] = {...totals[currentTimes], ...{exercise: data, answer}};
        return totals;
    }, [currentTimes, totals]);

    // Output exercise
    const outputExercise = useCallback((exercise: any, i: number = 0) => {
        addInterval(() => {
            if (i === (setting.count))
                dispatch(gameChangeStatus(setting.extra && setting.extra.includes('group') ? 'intermediate' : 'answer'));
            else
                sOutput(exercise[i++]);
        }, setting.time * 1000);
        sOutput(exercise[i++]);
    }, [sOutput, setting, addInterval, dispatch]);

    // Start Application
    const startApplication = useCallback((exercise: any) => {
        sOutput('На старт');
        addTimeout([
            setTimeout(() => sOutput('Внимание'), 1000),
            setTimeout(() => sOutput('Марш'), 2000),
            setTimeout(() => outputExercise(exercise), 3000),
        ]);
        dispatch(gameChangeStats({all: times}));
    }, [outputExercise, sOutput, dispatch, addTimeout, times]);

    return [startApplication, outputExercise, addingAnswer, sOutput];
};