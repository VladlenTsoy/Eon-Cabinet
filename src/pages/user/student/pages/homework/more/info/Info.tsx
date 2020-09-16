import React from "react";
import Teacher from "./teacher/Teacher";
import {Card} from "lib/ui";
import styled from "styled-components";
import Message from "./message/Message";
import Counter from "./counter/Counter";

const InfoWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 20% 1fr 15%;
  
  @media (max-width: 1200px) {
    grid-template-columns: 24% 1fr 16%;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 26% 1fr 21%;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }
  
  @media (max-width: 576px) {
  }
`;

interface InfoProps {
    homework: any;
}

const Info: React.FC<InfoProps> = ({homework}) => {
    return <Card>
        <InfoWrapper>
            <Teacher/>
            <Message homework={homework}/>
            <Counter homework={homework}/>
        </InfoWrapper>
    </Card>;
};

export default Info;