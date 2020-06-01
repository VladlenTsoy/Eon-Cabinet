import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import {Card} from "lib";
import {useAddTimeout} from "../../../../../../../effects/use-add-timeout.effect";
import TextFit
    from "../../../../../teacher/pages/training/settings/mental/multi-anzan/exercise-setting/multiplication-block/TextFit";
import {PreparationSoundProps} from "../use-load-sounds.effect";
import {SettingAnzanProps} from "../../../../../../../store/reducers/common/game/setting/games-types/anzan.types";

const PreparationWrapper = styled(Card)`
  &.ant-card{
    height: 100%;
    margin-bottom: 0;
    
    .ant-card-body{
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const OutputWrapper = styled.div`
  width: 70%;
  text-align: center;
  
  .output{
    height: 250px;
    white-space: nowrap;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: PreparationFade 0.5s ease-in-out;
  }

  @keyframes PreparationFade{
    0%{
      transform: scale(1);
    }
    100%{
      transform: scale(1);
    }
  }
`;

interface PreparationProps {
    setting?: SettingAnzanProps;
    sounds?: PreparationSoundProps;
    basicSound?: HTMLAudioElement;
}

const PreparationLayout: React.FC<PreparationProps> = (
    {
        children,
        setting,
        sounds,
        basicSound
    }
) => {
    const [startApplication, setStartApplication] = useState(false);
    const [output, setOutput] = useState('На старт');

    const [addTimeout] = useAddTimeout();

    const updateOutput = useCallback((output: string) => {
        if (setting) {
            if (sounds && (setting.sound === 'ru' || setting.sound === 'en')) {
                const sound = sounds[output === 'Внимание' ? 'set' : output === 'Марш' ? 'go' : 'reade'];
                sound.playbackRate = 1.5;
                sound.play().then()
            } else if (basicSound && setting.sound === 'basic') {
                basicSound.play().then();
            }
        }
        setOutput(output);
    }, [sounds, setting, basicSound]);

    // Start Application
    const startPreparation = useCallback(() => {
        updateOutput('На старт');
        addTimeout([
            setTimeout(() => updateOutput('Внимание'), 1000),
            setTimeout(() => updateOutput('Марш'), 2000),
            setTimeout(() => setStartApplication(true), 3000),
        ]);
    }, [addTimeout, updateOutput]);

    useEffect(() => {
        startPreparation();
    }, [startPreparation]);

    if (startApplication)
        return <>{children}</>;

    return <PreparationWrapper>
        <OutputWrapper>
            <TextFit key={output} isLoading>
                <div className="output">{output}</div>
            </TextFit>
        </OutputWrapper>
    </PreparationWrapper>;
};

export default PreparationLayout;