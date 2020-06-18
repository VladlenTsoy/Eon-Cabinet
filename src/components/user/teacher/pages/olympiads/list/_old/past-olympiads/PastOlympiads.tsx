import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import { HistoryOutlined } from '@ant-design/icons';

interface PastOlympiadsProps {

}

const PostOlympiadWrapper = styled(Link)`
  width: 100%;
  display: block;
  padding: 3rem 0;
  text-align: center;
  border: 3px dashed ${props => props.theme.color_minimal};
  border-radius: 10px;
  color: ${props => props.theme.color_minimal};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  margin-bottom: 1rem;
  
  .anticon{
    font-size: 55px;
    margin-bottom: 1rem;
  }
  
  p{
    margin-bottom: 0;
    font-size: 25px;
  }
`;

const PastOlympiads:React.FC<PastOlympiadsProps> = () => {
    return (
      <PostOlympiadWrapper to="olympiad/history">
          <HistoryOutlined />
          <p>Мои прошедшие олимпиады</p>
      </PostOlympiadWrapper>
    );
};

export default PastOlympiads;