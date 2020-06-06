import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Typography} from "antd";
import styled from "styled-components";
import {Alert} from "../../../../../../../lib";
import {Card} from "lib";

const {Title} = Typography;

const InformationWrapper = styled.div`
  margin-bottom: 1rem;
`;

const ItemWrapper = styled.div`
  font-size: 16px;
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  padding: 12px 12px 0;
  
  &:not(:last-child){
    border-bottom: 1px solid ${props => props.theme.color_border};
    padding: 12px;
  }

  &:first-child{
    padding-top: 0;
  }
    
  > span:first-child{
    color: ${props => props.theme.color_second}
  }
  
  .desc{
    text-align: right;
    color: ${props => props.theme.color_main};
    
    span {
      margin-left: 0.5rem;
    }
  }
`;

const SubItemsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  margin-top: 0.25rem;
`;

const SubItemWrapper = styled(ItemWrapper)`
  font-size: 14px;
  padding: 6px 0 0 12px;

  &:not(:last-child){
    border-bottom: 0;
    padding: 6px 0 6px 12px;
  }
  
  .desc{
      i{
      color: ${props => props.theme.color_second}
    }
  }
`;

const Services = () => {
    return (
        <Card>
            <Alert
                showIcon
                type="info"
                message="Тестовый период"
                description={<>Вам предоставлен тестовый период. Осталось <b>25</b> дней.</>}
            />
            <Title level={4}>Услуги</Title>
            <InformationWrapper>
                <ItemWrapper>
                    <span>Ментальная арифметика</span>
                    <div className="desc">
                        <Button shape="circle" icon={<DeleteOutlined />} type="danger" ghost/>
                    </div>
                    <SubItemsWrapper>
                        <SubItemWrapper>
                            <span>Учитель:</span>
                            <div className="desc">200 000 <i>сум/мес.</i></div>
                        </SubItemWrapper>
                        <SubItemWrapper>
                            <span>Ученик:</span>
                            <div className="desc">10 000 <i>сум/мес.</i></div>
                        </SubItemWrapper>
                    </SubItemsWrapper>
                </ItemWrapper>
                <ItemWrapper>
                    <span>Мнемотехника</span>
                    <div className="desc">
                        <Button shape="circle" icon={<DeleteOutlined />} type="danger" ghost/>
                    </div>
                    <SubItemsWrapper>
                        <SubItemWrapper>
                            <span>Учитель:</span>
                            <div className="desc">200 000 <i>сум/мес.</i></div>
                        </SubItemWrapper>
                        <SubItemWrapper>
                            <span>Ученик:</span>
                            <div className="desc">10 000 <i>сум/мес.</i></div>
                        </SubItemWrapper>
                    </SubItemsWrapper>
                </ItemWrapper>
            </InformationWrapper>
            <Button icon={<PlusOutlined />} block>Добавить</Button>
        </Card>
    );
};

export default Services;