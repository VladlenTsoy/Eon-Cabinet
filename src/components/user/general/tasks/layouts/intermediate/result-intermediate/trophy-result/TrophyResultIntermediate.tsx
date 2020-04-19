import React, {useState} from "react";
import win from "assets/images/illustrations/block_win.svg";
import loss from "assets/images/illustrations/block_loss.svg";
import {Spin} from "layouts/components";
import styled from "styled-components";

interface TrophyAnimationProps {
    nameAnimation: string;
}

const TrophyAnimation: React.FC<TrophyAnimationProps> = styled.div<TrophyAnimationProps>`
  height: 400px;
  width: 400px;
  margin: 0 auto;
  animation: ${props => props.nameAnimation} 1s .4s ease-in-out;
  
  img {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
  
  @media (max-width: 576px) {
    height: 250px;
    width: 250px;
  }
`;

interface TrophyResultIntermediateProps {
    result: any;
}

const TrophyResultIntermediate: React.FC<TrophyResultIntermediateProps> = ({result}) => {
    const [loading, setLoading] = useState(true);

    const imageLoad = () => {
        setLoading(false);
    };

    return <Spin spinning={loading} tip="Загрузка...">
        <TrophyAnimation nameAnimation={result ? 'tada' : 'wobble'}>
            <img
                src={result ? win : loss}
                alt="result-icon"
                onLoad={imageLoad}
            />
        </TrophyAnimation>
    </Spin>
};

export default React.memo(TrophyResultIntermediate);