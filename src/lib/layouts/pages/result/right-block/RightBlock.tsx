import React from 'react';
import styled from "styled-components";
import SideBlockLayout
    from "../layouts/side-block/SideBlock.layout";

const RightBlockLayout = styled(SideBlockLayout)`
  order: 3;
  
  > div{
    animation: fadeInRight 2s 0s both;
  }
  
  @media (max-width: 992px) {
    order: 3;
  }  
  
  @media (max-width: 576px) {
    order: 2;
    
    > div{
      animation-name: fadeInUp;  
    }
  }
`;

const RightBlock:React.FC = ({children}) => {
    return <RightBlockLayout>
        {children}
    </RightBlockLayout>
};

export default RightBlock;