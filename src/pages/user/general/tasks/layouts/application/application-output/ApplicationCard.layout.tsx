import React from 'react';
import styled from "styled-components";
import {Card} from "lib/ui";

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
      
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeIn;
      
      .ant-carousel{
        width: 80%;
        
        @media (max-width: 576px) {
          width: 75%;
        }
        
        .slick-slide {
          position: relative;
        }
        
        .slick-dots-bottom{
          bottom: -25px;
        }
        
        .slick-dots{ 
          li{ 
            button{
              background: ${props => props.theme.color_second}
            }
          }
        
          li.slick-active button{
            background: ${props => props.theme.color_primary}
          }
        }
      }

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