import React from 'react';
import styled from "styled-components";
import {Form} from 'antd';
import {FormProps} from 'antd/lib/form';

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
  .ant-form-item:last-child {
      margin-bottom: 0;
    }
`;