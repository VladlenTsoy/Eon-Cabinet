import React from 'react';
import styled from "styled-components";
import Stars from "./starts/Stars";
import Counter from "./counter/Counter";
import Title from "./title/Title";

const MiddleWrapper = styled.div`
  
`;

interface MiddleBlockProps {

}

const MiddleBlock: React.FC<MiddleBlockProps> = () => {
    return <MiddleWrapper>
        <Counter/>
        <Stars/>
        <Title/>
    </MiddleWrapper>;
};

export default MiddleBlock;