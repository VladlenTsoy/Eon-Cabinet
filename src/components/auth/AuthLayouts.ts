import styled from "styled-components";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

export const Title = styled.h1`
    text-align: center;
    font-weight: bolder;
`;

export const SubTitle = styled.p`
      display: block;
      text-align: center;
      margin-bottom: 1rem;
`;

export const FormWrapper = styled(Form)`
  .ant-form-item:last-child {
      margin-bottom: 0;
    }
`;