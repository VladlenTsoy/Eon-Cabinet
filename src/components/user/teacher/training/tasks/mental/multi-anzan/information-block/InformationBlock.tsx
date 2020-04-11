import React from 'react';
import styled from "styled-components";
import { ArrowUpOutlined, UserAddOutlined } from '@ant-design/icons';

const InformationWrapper = styled.div`
  height: 100%;
  width: 100%;
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
    
  i{
    color: ${props => props.theme.color_border};
    font-size: 200px;
  }
`;

const AddUserWrapper = styled.div`
  position: absolute;
  right: 17rem;
  text-align: center;
  top: 0;
  font-size: 22px;
  line-height: 25px;
  pointer-events: none;

  i{
    color: ${props => props.theme.color_border};
    font-size: 150px;
    margin-bottom: 2rem;
  }
  
  p{
    color: ${props => props.theme.color_border};
    width: 220px;
  }
`;

interface InformationBlockProps {

}

const InformationBlock: React.FC<InformationBlockProps> = () => {
    return (
      <InformationWrapper>
          <UserAddOutlined />
          <AddUserWrapper>
              <ArrowUpOutlined />
              <p>Нажмите для добавления участника</p>
          </AddUserWrapper>
      </InformationWrapper>
    );
};

export default InformationBlock;