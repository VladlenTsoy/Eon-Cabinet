import styled from "styled-components";
import SideBlockLayout
    from "../layouts/side-block/SideBlock.layout";
import React from "react";

const LeftBlockLayout = styled(SideBlockLayout)`
  order: 1;
  
  @media (max-width: 992px) {
    order: 2;
  }  
  
  @media (max-width: 576px) {
    order: 3;
  }
`;

const LeftBlock: React.FC = ({children}) => {
    return <LeftBlockLayout>
        {children}
    </LeftBlockLayout>;
};

export default LeftBlock;