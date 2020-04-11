import React from 'react';
import Details from "./details/Details";
import Description from "./description/Description";
import Access from "./access/Access";
import Status from "./status/Status";
import styled from "styled-components";

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
  }
    
  @media (max-width: 992px) {
  }  
    
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
    
  @media (max-width: 576px) {
  }
`;


interface InfoProps {
    olympiad: any;
}

const Info:React.FC<InfoProps> = ({olympiad}) => {
    return <InfoWrapper>
        <Details olympiad={olympiad}/>
        <Description olympiad={olympiad}/>
        <Access olympiad={olympiad}/>
        <Status olympiad={olympiad}/>
    </InfoWrapper>;
};

export default Info;