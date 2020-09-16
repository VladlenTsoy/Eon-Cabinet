import React from 'react';
import styled from "styled-components";
import ProfileBlock from "../../../../layouts/_old/profile-block/ProfileBlock";
import Message from "./message/Message";

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin: 2rem 0;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

interface InfoProps {
    olympiad: any;
}

const Info: React.FC<InfoProps> = ({olympiad}) => {
    return <>
        <InfoWrapper>
            <ProfileBlock user={olympiad.creator} teacher/>
            <Message description={olympiad.description}/>
        </InfoWrapper>
    </>;
};

export default Info;