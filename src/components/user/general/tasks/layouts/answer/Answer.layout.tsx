import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Row } from "antd";
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
    form: any,
    cols: {},
    checkHandler: (values: any) => void;
}

const AnswerLayout: React.FC<AnswerProps> = (
    {
        children,
        form,
        cols,
        checkHandler
    }
) => {
    const submitHandler = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err)
                checkHandler(values);
        });
    };

    return <RowWrapper  justify="center" align="middle" gutter={15}>
        <Col {...cols}>
            <CardWrapper>
                <Form onSubmit={submitHandler}>
                    {children}
                </Form>
            </CardWrapper>
        </Col>
    </RowWrapper>;
};

export default AnswerLayout;