import React from 'react';
import styled from "styled-components";
import {Typography} from "antd";

const {Title} = Typography;

const ItemBlock = styled.div`
  display: inline-block;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
  padding: 1rem;
  width: 350px;
  height: 100%;
  margin-right: 1.5rem;
  overflow-x: auto;
  text-align: center;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
`;

interface ItemProps {
    times: number;
}

const Item:React.FC<ItemProps> = ({times, children}) => {
    return <ItemBlock>
        <Title level={3}>Шаг #{times + 1}</Title>
        {children}
    </ItemBlock>
};

export default Item;