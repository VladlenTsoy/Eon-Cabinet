import React from 'react';
import styled from "styled-components";
import {Card} from "lib";

const ApplicationCardWrapper = styled.div`
  min-height: 100%;
  height: 100%;
  
  .ant-card {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    overflow: hidden;
    position: relative;

    .ant-card-body{
      min-height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const ApplicationCardLayout: React.FC = ({children}) => {
    return <ApplicationCardWrapper id="application">
        <Card>
            {children}
        </Card>
    </ApplicationCardWrapper>;
};

export default ApplicationCardLayout;