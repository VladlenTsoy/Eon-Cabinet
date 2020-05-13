import React from 'react';
import styled from "styled-components";
import Trophy from "./trophy/Trophy";
import Title from "./title/Title";
import Actions from "./actions/Actions";

const TrophyTitleActionsWrapper = styled.div`
    margin: 5rem 1rem 4rem;
    display: grid;
    grid-template-columns: 300px 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    
    @media (max-width: 768px) {
      grid-gap: 3rem;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      margin: 0 0 3rem;
    }
`;

interface TrophyTitleActionsProps {
    result: boolean;
}

const TrophyTitleActions: React.FC<TrophyTitleActionsProps> = ({result}) => {
    return <TrophyTitleActionsWrapper>
        <Trophy result={result}/>
        <Title/>
        <Actions/>
    </TrophyTitleActionsWrapper>;
};

export default React.memo(TrophyTitleActions);