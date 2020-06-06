import React from 'react';
import {FormItem} from "../../../../../../../../../../lib";
import {Radio, Switch} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';
import styled from "styled-components";
import {FormInstance} from "antd/es/form";

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1.5rem;
  font-size: 16px;
  
  span{
    margin-right: 0.5rem;
  }
`;

interface HeaderRadioProps {
    form: FormInstance;
    isDisabledMode: boolean;
}

const HeaderRadio: React.FC<HeaderRadioProps> = ({form, isDisabledMode}) => {
    return <>
        <FormItem name="mode">
            <Radio.Group
                disabled={isDisabledMode}
                value={form.getFieldValue('mode')}
                buttonStyle="solid"
                size="large"
            >
                <Radio.Button value="addition">+ Плюс, - Минус</Radio.Button>
                <Radio.Button value="multiplication">* Умножение, / Деление</Radio.Button>
            </Radio.Group>
        </FormItem>
        {
            form.getFieldValue('mode') === 'multiplication' ?
                <SwitchWrapper>
                    <span>Примеры подряд <QuestionCircleOutlined/></span>
                    <FormItem
                        name="group"
                        valuePropName="checked"
                    >
                        <Switch/>
                    </FormItem>
                </SwitchWrapper> : null
        }
    </>
};

export default HeaderRadio;