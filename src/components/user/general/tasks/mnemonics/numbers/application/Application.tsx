import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {random, shuffle} from 'lodash';
import {LoadingBlock} from "lib";
import ListApplication from "./list-application/ListApplication";
import BasicApplication from "./basic-application/BasicApplication";
import {totalsChange} from "../../../../../../../store/tasks/totals/action";

const Application: React.FC = () => {
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const {setting, status, totals} = game;
    const [loading, setLoading] = useState(false);

    const createNumbers = useCallback(async (numbers: any = []) => {
        setLoading(true);
        const {mode, count} = setting;
        const _count = setting['task-mode'] === 'list' ? count * 10 : count;

        for (let i = 0; i < _count; i++) {
            let a = random(10, 99);
            let b = random(100, 999);
            numbers.push(mode === '1' ? a : mode === '3' ? (i % 2 === 0 ? a : b) : b);
        }

        let _totals = shuffle(numbers.map((number: number) => ({exercise: number})));
        await dispatch(totalsChange(_totals));
        setLoading(false);
    }, [setting, dispatch]);

    // Fetch algorithms or check totals exercise
    useEffect(() => {
        (async () => {
            if (status !== 'refresh' && status !== 'repeat' && status !== 'answer' && status !== 'intermediate')
                await createNumbers([]);
        })();
    }, [status, createNumbers]);

    return loading && !totals.length ?
        <LoadingBlock/> :
        setting['task-mode'] === 'list' ?
            <ListApplication/> :
            <BasicApplication/>;
};

export default Application;