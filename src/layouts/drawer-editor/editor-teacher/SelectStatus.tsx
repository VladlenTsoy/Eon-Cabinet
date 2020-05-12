import React, {useState} from "react";
import { ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Radio, Alert } from "antd";
import {FormItem} from "../../components";
import styled from "styled-components";

const AlertWrapper = styled(Alert)`
  &.ant-alert{
    background: ${props => props.type === 'info' ? props.theme.gradient_info : props.theme.gradient_warning};
    border: 0;
    box-shadow: ${props => props.type === 'info' ? props.theme.shadow_info : props.theme.shadow_warning};
    color: #ffffff;
    margin-bottom: 1.5rem;
    
    .anticon{
      color: #ffffff;
    }
    
    .ant-alert-message{
      color: #ffffff;
    }
  }
`;

const RadioGroupWrapper = styled(Radio.Group)`
  &.ant-radio-group{
    width: 100%;
    display: flex;
    
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
      
      .anticon{
        margin-right: 0.5rem;
      }
    }
  }
`;

const SelectStatus: React.FC = () => {
    const [status, setStatus] = useState('test');
    const handleChange = (e: any) => {
        setStatus(e.target.value);
    };

    return <>
        {status === 'test' ?
            <AlertWrapper
                message="Предупреждение"
                description={
                    <>
                        Тестовый период имеет ограничения на олимпиаду и дается <b><i>на 1 месяц</i></b>, после чего нужно будет активировать
                        аккаунт либо он будет заблокирован!
                    </>
                }
                type="warning"
                showIcon
            /> :
            <AlertWrapper
                message="Информация"
                description={
                    <>
                        Платежный аккаунт предоставляется на ежемесячной платной основе и не имеет ограничения по олимпиаде.
                    </>
                }
                type="info"
                showIcon
            />}

        <FormItem name="status" requiredMsg="Выберите статус!">
            <RadioGroupWrapper buttonStyle="solid" onChange={handleChange}>
                <Radio.Button value="test"><ClockCircleOutlined />Тестовый период</Radio.Button>
                <Radio.Button value="active"><DollarOutlined />Платежный аккаунт</Radio.Button>
            </RadioGroupWrapper>
        </FormItem>
    </>;
};

export default SelectStatus;