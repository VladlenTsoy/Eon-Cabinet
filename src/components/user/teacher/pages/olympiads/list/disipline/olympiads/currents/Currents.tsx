import React from 'react';
import styled from "styled-components";

const OlympiadStyled = styled.div`

`;

interface CurrentsProps {
    olympiads: any[];
}

const Currents: React.FC<CurrentsProps> = ({olympiads}) => {
    return <>
        {olympiads.map((olympiad) =>
            <OlympiadStyled>

            </OlympiadStyled>
        )}
    </>;
};

export default Currents;