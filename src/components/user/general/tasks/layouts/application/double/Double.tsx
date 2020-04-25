import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Output from "../basic/output/Output";
import {SettingAnzanBasicProps,} from "../../../../../../../store/tasks/setting/games-types/anzan.types";
import {StatusProps} from "../../../../../../../store/game/types";
import {useDispatch, useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {game} from "../../../../../../../store/game/reducer";
import {useAddInternal} from "../../../../../../../effects/use-add-interval.effect";
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import {useSoundEffect} from "../use-sound.effect";
import {useAddTimeout} from "../../../../../../../effects/use-add-timeout.effect";

const DoubleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
`;

interface DoubleProps {
    setting: SettingAnzanBasicProps;
    nextStatus: StatusProps;
    basicSound: HTMLAudioElement;
}

const Double: React.FC<DoubleProps> = (
    {
        setting,
        nextStatus,
        basicSound,
    }
) => {
    const totals = useSelector(totalsSelect);
    const {currentTimes} = useSelector(game);
    const [output, setOutput] = useState({one: '0', two: '0', key: 0});
    const [addInterval] = useAddInternal();
    const [addTimeout] = useAddTimeout();
    const dispatch = useDispatch();
    const [play] = useSoundEffect({basicSound});
    const [isMultiplication] = useState(setting.mode === 'multiply' || setting.mode === 'divide');

    const changeOutput = useCallback((one, two, index) => {
        setOutput({one, two, key: index});
        //
        play({time: setting.time, type: setting.sound})
    }, [setting, basicSound]);

    // Вывод цифр
    const outputInterval = useCallback((total: any, i: number = 0) => {
        if (isMultiplication){
            addTimeout([setTimeout(() => dispatch(gameChangeStatus(nextStatus)), setting.time * 1000)]);
            return changeOutput(total[0].output, total[1].output, i++);
        }

        addInterval(() => {
            if (i >= (setting.count || setting.times))
                return dispatch(gameChangeStatus(nextStatus));

            changeOutput(total[0].output[i], total[1].output[i], i++);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(total[0].output[i], total[1].output[i], i++);
    }, [dispatch, addInterval, isMultiplication]);

    useEffect(() => {
        outputInterval(totals[currentTimes]);
    }, [outputInterval, totals, currentTimes]);

    return <DoubleWrapper>
        <Output time={setting.time} output={output.one} key={`one-${output.key}`}/>
        <Output time={setting.time} output={output.two} key={`two-${output.key}`}/>
    </DoubleWrapper>;
};

export default Double;