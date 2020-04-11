import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {Link} from "react-router-dom";

const LinkCreateWrapper = styled(Link)`
  min-height: 200px;
  font-size: 20px;
  color: #ffffff;
  height: calc(100% - 25px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px dashed #ffffff;
  border-radius: 10px;
  box-shadow: ${props => props.theme.shadow_primary};
  margin-bottom: 1.5rem;
  
  i{
    font-size: 35px;
    display: block;
    margin-bottom: 0.5rem;
  }
  
  &:hover{
    color: ${props => props.theme.color_warning};
    border: 2px dashed ${props => props.theme.color_warning};
  }
  
  @media (max-width: 576px) {
    margin: 0 1rem;
  }
`;

const OlympiadCreate:React.FC = () => {
    return (
      <LinkCreateWrapper to="/olympiad/create">
          <PlusOutlined />
          Создать олимпиаду
      </LinkCreateWrapper>
    );
};

export default OlympiadCreate;