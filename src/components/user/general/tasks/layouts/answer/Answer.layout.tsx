import React from 'react';
import {Col, Row, Form} from "antd";
import styled from "styled-components";
import {Card} from "lib";

const RowWrapper = styled(Row)`
  height: 100%;
`;

const CardWrapper = styled(Card)`
  &.ant-card{
    text-align: center;
    
    .ant-card-body{
      .ant-typography{
        margin-bottom: 1rem;
      }  
      
      padding: 1.5rem;
    }
  }
`;

interface AnswerProps {
    cols: {},
    checkHandler: (values: any) => void;
}

const AnswerLayout: React.FC<AnswerProps> = (
    {
        children,
        cols,
        checkHandler
    }
) => {
    const submitHandler = (values: any) => {
        checkHandler(values);
    };

    return <RowWrapper justify="center" align="middle" gutter={15}>
        <Col {...cols}>
            <CardWrapper>
                <Form onFinish={submitHandler}>
                    {children}
                </Form>
            </CardWrapper>
        </Col>
    </RowWrapper>;
};

export default AnswerLayout;