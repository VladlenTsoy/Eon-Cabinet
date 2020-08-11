import React from 'react';
import styled from "styled-components";

const EmptyStyled = styled.div`
  color: ${props => props.theme.color_minimal};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Empty = () => {
    return <EmptyStyled>
        Пусто
    </EmptyStyled>;
};

export default Empty;