import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Stars from "./starts/Stars";
import Counter from "./counter/Counter";
import Title from "./title/Title";
import {usePreloadSounds} from "effects/use-preload-sounds.effect";
import {LoadingBlock} from "lib";
import StarSvg from "assets/images/star.svg";
import {usePreloadPictures} from "../../../../../../../../effects/use-preload-pictures.effect";
import {useSelector} from "react-redux";
import {gameSelector} from "../../../../../../../../store/reducers/common/game/gameSplice";

const TotalWinSound = require('assets/sounds/total_win.mp3');
const TotalLoseSound = require('assets/sounds/loss.mp3');

const MiddleWrapper = styled.div`
  position: relative;
  z-index: 5;
`;

interface MiddleBlockProps {

}

const MiddleBlock: React.FC<MiddleBlockProps> = () => {
    const {stats} = useSelector(gameSelector);

    const [loading, setLoading] = useState<boolean>();
    const result: boolean = stats.all !== 0 && stats.all === stats.success;

    const [soundsLoading, sounds] = usePreloadSounds({
        complete: new Audio(TotalWinSound),
        lose: new Audio(TotalLoseSound),
    });

    const [, preloadImage] = usePreloadPictures();

    const checkStars = () => {
        return (stats.success / stats.all * 100) / 33.3;
    };

    useEffect(() => {
        if (!soundsLoading) {
            if (result) {
                sounds.complete.currentTime = 0;
                sounds.complete.play().then();
            } else {
                sounds.lose.currentTime = 0;
                sounds.lose.play().then();
            }
            return () => {
                sounds.complete.pause();
                sounds.lose.pause();
            }
        }
    }, [soundsLoading, sounds, result]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await preloadImage([StarSvg]);
            setLoading(false);
        })()
    }, [preloadImage]);

    if (soundsLoading || loading)
        return <LoadingBlock/>;

    return <MiddleWrapper>
        <Counter delay={result ? 4000 : 2000}/>
        <Stars numberOfStars={checkStars()} delay={result ? 3200 : 1000}/>
        <Title delay={result ? 4000 : 2000}/>
    </MiddleWrapper>;
};

export default React.memo(MiddleBlock);