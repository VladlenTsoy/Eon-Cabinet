import React from 'react';
import styled from "styled-components";
import {Legend} from '../../../../../../../layouts/components';

const DetailsWrapper = styled.div`
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

interface DetailsProps {
}

const Details: React.FC<DetailsProps> = ({children}) => {
    return <DetailsWrapper id="details-for-result">
        <Legend>Результаты</Legend>
        {children}
    </DetailsWrapper>;
};

export default Details;