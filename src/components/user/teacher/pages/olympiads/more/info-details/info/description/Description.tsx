import React from 'react';
import styled from "styled-components";
import { MessageOutlined } from '@ant-design/icons';
import BlockWrapper from "../layouts/Block.layout";

const DescriptionWrapper = styled(BlockWrapper)`
  grid-column-start: 3;
  grid-column-end: 5;
  
  @media (max-width: 1200px) {
    grid-row-start: 1;
    grid-row-end: 3;
  }
  
  @media (max-width: 768px) {
    grid-row-start: auto;
    grid-row-end: auto;
    grid-column-start: 1;
    grid-column-end: 3;
  }
`;

interface DescriptionProps {
    olympiad: any;
}

const Description: React.FC<DescriptionProps> = ({olympiad}) => {
    return (
        <DescriptionWrapper>
            <MessageOutlined />
            <div>
                <span>Описание:</span>
                <p>{olympiad.description}</p>
            </div>
        </DescriptionWrapper>
    );
};

export default Description;