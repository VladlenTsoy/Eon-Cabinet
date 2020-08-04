import React from 'react';
import {Form} from "antd";
import {Card as CardStyled} from "lib/components";
import styled from "styled-components";
import {FormProps} from "antd/lib/form";

export const Title = styled.h1`
    text-align: center;
    font-weight: bolder;
`;

export const SubTitle = styled.p`
    display: block;
    text-align: center;
    margin-bottom: 1rem;
`;

export const FormWrapper: React.FC<FormProps> = styled(Form)`
  > .ant-form-item:last-child {
      margin-bottom: 0;
    }
`;

interface CardProps {
    title: string;
    subTitle?: string;
    onFinish: (values: any) => void;
}

const Card: React.FC<CardProps> = ({title, subTitle, onFinish, children}) => {
    return <CardStyled>
        <Title>{title}</Title>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        <FormWrapper onFinish={onFinish} size="large" layout="vertical">
            {children}
        </FormWrapper>
    </CardStyled>;
};

export default Card;