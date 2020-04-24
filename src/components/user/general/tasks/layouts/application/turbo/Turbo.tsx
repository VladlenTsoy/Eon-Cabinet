import React from 'react';
import {Card} from "lib";
import styled from "styled-components";

const CardWrapper = styled.div`
  &.ant-card{
    height: 100%;
    margin-bottom: 0;
    
    .ant-card-body{
      height: 100%;
      position: relative;
      
    }
  }
`;

interface TurboProps {

}

const Turbo:React.FC<TurboProps> = ({}) => {
    return <Card>

    </Card>;
};

export default Turbo;