import React, {useEffect} from 'react';
import {BlockOutlined, FileOutlined, ThunderboltOutlined} from '@ant-design/icons';
import {Form, Radio} from "antd";
import {RadioGroupProps} from "antd/es/radio";
import {FormItem} from "../../../../../../../../../../layouts/components";
import styled from "styled-components";

interface StyledProps {
    column?: string
}

type RadioWrapper = RadioGroupProps & StyledProps;

export const RadioWrapper: React.FC<RadioWrapper> = styled(Radio.Group)<StyledProps>`
    &.ant-radio-group{
      width: 100%;
      display: grid;
      box-shadow: none;
      grid-template-columns: ${props => props.column ? props.column : '1fr 1fr 1fr 1fr'};
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }
      
      label{
        width: 100%;
        text-align: center;
        border: 0;
      }
      
      .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active{
        color: ${props => props.theme.color_warning};
        outline: none;
      }
      
      .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
        color: ${props => props.theme.color_warning};
        outline: none;
      }
      
      .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
        box-shadow: none;
      }
      
      .ant-radio-button-wrapper:not(:first-child)::before{
        content: none;
      }
  }
`;

interface TypeFormProps {
    isClearForm: boolean;
    initialValues: any;
}

const TypeForm: React.FC<TypeFormProps> = (
    {
        isClearForm,
        initialValues
    }
) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (isClearForm)
            form.resetFields()
    }, [form, isClearForm]);

    return <Form
        form={form}
        name="types"
        initialValues={{
            anzan: 'basic',
            ...initialValues
        }}
    >
        <FormItem name="anzan">
            <RadioWrapper size="large">
                <Radio.Button value="basic">Обычный</Radio.Button>
                <Radio.Button value="list"><FileOutlined/> Листы</Radio.Button>
                <Radio.Button value="turbo"><ThunderboltOutlined/> Турбо</Radio.Button>
                <Radio.Button value="double"><BlockOutlined/> Двойной</Radio.Button>
            </RadioWrapper>
        </FormItem>
    </Form>
};

export default React.memo(TypeForm);