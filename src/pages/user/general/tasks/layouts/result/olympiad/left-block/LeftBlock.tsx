import React from 'react';
import SideBlockLayout from "../../../../../../../../lib/layouts/result/layouts/side-block/SideBlock.layout";
import CurrentExercise from "./current-exercise/CurrentExercise";
import ActionBack from "./action-back/ActionBack";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {gameSelector} from "store/common/game/gameSplice";

const LeftBlockLayout = styled(SideBlockLayout)`
  order: 1;
  
  @media (max-width: 992px) {
    order: 2;
  }  
  
  @media (max-width: 576px) {
    order: 3;
  }
`;

const LeftBlock: React.FC = ({children}) => {
    const {stats} = useSelector(gameSelector);

    return <LeftBlockLayout>
        {/* Примеры текущего упражнения */}
        <CurrentExercise stats={stats}>
            {children}
        </CurrentExercise>
        {/* Действие назад */}
        <ActionBack/>
    </LeftBlockLayout>;
};

export default LeftBlock;