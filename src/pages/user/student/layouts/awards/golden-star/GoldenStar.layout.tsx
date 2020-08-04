import React from 'react';
import GoldenStarSvg from "../../../../../../assets/images/awards/common/GoldenStar.svg";
import AwardLayout from "../award/Award.layout";

interface GoldenStarProps {
    stage?: number;
}

const GoldenStarLayout: React.FC<GoldenStarProps> = ({stage = 0}) => {
    return <AwardLayout
        title={`Золотая Звезда`}
        content="Выполните 45 домашних заданий."
        icon={GoldenStarSvg}
        stage={stage}
    />
};

export default React.memo(GoldenStarLayout);