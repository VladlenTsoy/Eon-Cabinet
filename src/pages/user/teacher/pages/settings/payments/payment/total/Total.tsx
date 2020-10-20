import React from 'react';
import { DollarOutlined } from '@ant-design/icons';
import {Button, Title} from "lib/ui";
import styled from "styled-components";

const TotalWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  
  .price{
    text-align: right;
    margin-right: 1rem;
    
    h4.ant-typography{
      margin: 0;
      
      span.ant-typography{
        margin-right: 0.5rem;
      }
    }
  }
  
  .action{
    grid-column-start: 1;
    grid-column-end: 3;
    text-align: right;
  }
`;

interface TotalProps {

}

const Total:React.FC<TotalProps> = () => {
    return (
      <TotalWrapper>
          <div className="price">
              <Title level={4}>
                  <span className="second">Итог:</span>
                  3 840 000 сум
              </Title>
          </div>
          <div className="action">
              <Button type="primary" icon={<DollarOutlined />} size="large">Оплатить</Button>
          </div>
      </TotalWrapper>
    );
};

export default Total;