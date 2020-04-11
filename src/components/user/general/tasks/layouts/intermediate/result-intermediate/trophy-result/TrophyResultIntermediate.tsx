import React, {useState} from "react";
import win from "../../../../../../../../assets/images/illustrations/block_win.svg";
import loss from "../../../../../../../../assets/images/illustrations/block_loss.svg";
import {Spin} from "../../../../../../../../layouts/components";
import {Animated} from "react-animated-css";

interface TrophyResultIntermediateProps {
    result: any;
}

const TrophyResultIntermediate: React.FC<TrophyResultIntermediateProps> = ({result}) => {
    const [loading, setLoading] = useState(true);

    const imageLoad = () => {
        setLoading(false);
    };

    return <Spin spinning={loading} tip="Загрузка...">
        <Animated
            animationIn={result ? 'tada' : 'wobble'}
            animationOut="fadeOut"
            animationInDelay={400}
            animationInDuration={1000}
            isVisible
            className="result-image-block">
            <img src={result ? win : loss}
                 alt="result-icon"
                 onLoad={imageLoad}
            />
        </Animated>
    </Spin>
};

export default TrophyResultIntermediate;