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
import {Card} from "../../../../../../../lib";
import ApplicationAnzanWrapper from "../_old/anzan/Anzan.layout";

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
    const [outputOne, setOutputOne] = useState();
    const [outputTwo, setOutputTwo] = useState();
    const [addInterval] = useAddInternal();
    const dispatch = useDispatch();

    const soundPlay = useCallback(() => {
        if (setting.sound === 'basic') {
            basicSound.currentTime = 0;
            basicSound.playbackRate = 1;
            basicSound.play().then();
        }
    }, [setting, basicSound]);

    // Вывод цифр
    const outputInterval = useCallback((total: any, i: number = 0) => {
        addInterval(() => {
            if (i >= (setting.count || setting.times))
                return dispatch(gameChangeStatus(nextStatus));

            setOutputOne(total[0].output[i++]);
            setOutputTwo(total[1].output[i++]);
            soundPlay();
        }, setting.time * 1000);

        // Первый вывод числа
        setOutputOne(total[0].output[i++]);
        setOutputTwo(total[1].output[i++]);
        soundPlay();
    }, [dispatch, addInterval, soundPlay]);

    useEffect(() => {
        console.log(totals);
        outputInterval(totals[currentTimes]);
    }, [outputInterval, totals, currentTimes]);

    return <ApplicationAnzanWrapper>
        <Card>
            <DoubleWrapper>
                <Output time={setting.time} output={outputOne} key={`one-${outputOne}`}/>
                <Output time={setting.time} output={outputTwo} key={`two-${outputTwo}`}/>
            </DoubleWrapper>
        </Card>
    </ApplicationAnzanWrapper>;
};

export default Double;