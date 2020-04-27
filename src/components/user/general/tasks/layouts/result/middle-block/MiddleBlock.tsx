import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Stars from "./starts/Stars";
import Counter from "./counter/Counter";
import Title from "./title/Title";
import {usePreloadSounds} from "effects/use-preload-sounds.effect";
import {LoadingBlock} from "lib";
import StarSvg from "assets/images/star.svg";
import {usePreloadPictures} from "../../../../../../../effects/use-preload-pictures.effect";

const TotalWinSound = require('assets/sounds/total_win.mp3');

const MiddleWrapper = styled.div`
  position: relative;
  z-index: 5;
`;

interface MiddleBlockProps {

}

const MiddleBlock: React.FC<MiddleBlockProps> = () => {
    const [loading, setLoading] = useState();
    const [soundsLoading, sounds] = usePreloadSounds({
        complete: new Audio(TotalWinSound),
    });

    const [, preloadImage] = usePreloadPictures();

    useEffect(() => {
        if (!soundsLoading) {
            sounds.complete.currentTime = 0;
            sounds.complete.play().then();
            return () => {
                sounds.complete.pause();
            }
        }
    }, [soundsLoading, sounds]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await preloadImage([StarSvg]);
            setLoading(false);
        })()
    }, []);

    if (soundsLoading || loading)
        return <LoadingBlock/>;

    return <MiddleWrapper>
        <Counter/>
        <Stars/>
        <Title/>
    </MiddleWrapper>;
};

export default React.memo(MiddleBlock);