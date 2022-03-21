import styled from "styled-components";
import SideBlockLayout
    from "../layouts/side-block/SideBlock.layout";
import React from "react";

const LeftBlockLayout = styled<any>(SideBlockLayout)`
  order: 1;
  
  > div{
    animation: fadeInLeft 2s 0s both;
  }
  
  @media (max-width: 992px) {
    order: 2;
  }  
  
  @media (max-width: 576px) {
    order: 3;

    > div{
      animation-name: fadeInUp;  
    }
  }
`;

const LeftBlock: React.FC = ({children}) => {
    return <LeftBlockLayout>
        {children}
    </LeftBlockLayout>;
};

export default LeftBlock;
