import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Stars from "./starts/Stars";
import Counter from "./counter/Counter";
import Title from "./title/Title";
import {usePreloadSounds} from "effects/use-preload-sounds.effect";
import {LoadingBlock} from "lib";
import StarSvg from "assets/images/star.svg";
import {usePreloadPictures} from "../../../../../../../effects/use-preload-pictures.effect";
import {useSelector} from "react-redux";
import {game} from "../../../../../../../store/game/reducer";

const TotalWinSound = require('assets/sounds/total_win.mp3');

const MiddleWrapper = styled.div`
  position: relative;
  z-index: 5;
`;

interface MiddleBlockProps {

}

const MiddleBlock: React.FC<MiddleBlockProps> = () => {
    const {stats} = useSelector(game);

    const [loading, setLoading] = useState();
    const [soundsLoading, sounds] = usePreloadSounds({
        complete: new Audio(TotalWinSound),
    });

    const [, preloadImage] = usePreloadPictures();

    const checkStars = () =>{
       return (stats.success / stats.all * 100) / 33.3;
    };

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
    }, [preloadImage]);

    if (soundsLoading || loading)
        return <LoadingBlock/>;

    return <MiddleWrapper>
        <Counter/>
        <Stars numberOfStars={checkStars()}/>
        <Title/>
    </MiddleWrapper>;
};

export default React.memo(MiddleBlock);