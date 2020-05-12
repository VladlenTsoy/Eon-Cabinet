import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import Output from "../basic/output/Output";
import {SettingAnzanBasicProps,} from "../../../../../../../store/tasks/setting/games-types/anzan.types";
import {StatusProps} from "../../../../../../../store/game/types";
import {useDispatch} from "react-redux";
import {useAddInternal} from "../../../../../../../effects/use-add-interval.effect";
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import {useSoundEffect} from "../use-sound.effect";

const DoubleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
  
  @media (max-width: 576px) {
    .text-wrapper{
       width: 150px;
       height: 150px;
      
      .text-output{
         width: 150px;
      }
    }
  } 
`;

interface DoubleProps {
    outputs: any[];
    setting: SettingAnzanBasicProps;
    nextStatus: StatusProps;
    basicSound: HTMLAudioElement;
}

const Double: React.FC<DoubleProps> = (
    {
        outputs,
        setting,
        nextStatus,
        basicSound,
    }
) => {
    const [output, setOutput] = useState({one: '0', two: '0', key: 0});
    const [addInterval] = useAddInternal();
    const dispatch = useDispatch();
    const [play] = useSoundEffect({basicSound});

    const changeOutput = useCallback((one, two, index) => {
        setOutput({one, two, key: index});
        //
        play({time: setting.time, type: setting.sound})
    }, [setting, play]);

    // Вывод цифр
    const outputInterval = useCallback((outputs: any, i: number = 0) => {
        addInterval(() => {
            if (i >= outputs[1].length)
                return dispatch(gameChangeStatus(nextStatus));

            changeOutput(outputs[0][i], outputs[1][i], i++);
        }, setting.time * 1000);

        // Первый вывод числа
        changeOutput(outputs[0][i], outputs[1][i], i++);
    }, [dispatch, addInterval, changeOutput, nextStatus, setting]);

    useEffect(() => {
        outputInterval(outputs);
    }, [outputInterval, outputs]);

    return <DoubleWrapper>
        <Output time={setting.time} output={output.one} key={`one-${output.key}`}/>
        <Output time={setting.time} output={output.two} key={`two-${output.key}`}/>
    </DoubleWrapper>;
};

export default Double;