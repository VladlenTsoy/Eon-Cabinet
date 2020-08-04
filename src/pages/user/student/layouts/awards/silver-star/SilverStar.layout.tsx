import React from 'react';
import SilverStarSvg from "../../../../../../assets/images/awards/common/SilverStar.svg";
import AwardLayout from "../award/Award.layout";

interface SilverStarProps {
    stage?: number;
}

const SilverStarLayout: React.FC<SilverStarProps> = ({stage = 0}) => {
    return <AwardLayout
        title={`Серебряная звезда`}
        content="Выполните 15 домашних заданий."
        icon={SilverStarSvg}
        stage={stage}
    />
};

export default React.memo(SilverStarLayout);