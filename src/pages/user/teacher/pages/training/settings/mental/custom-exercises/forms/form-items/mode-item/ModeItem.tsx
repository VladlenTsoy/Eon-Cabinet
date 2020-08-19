import React from 'react';
import {Radio} from "antd";
import {FormItem} from "../../../../../../../../../../../lib/ui";
import styled from "styled-components";

const RadioStyleWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
    }
  }
`;


interface ModeItemProps {
    modes: any[];
}

const ModeItem:React.FC<ModeItemProps> = ({modes}) => {
    return <FormItem name="mode" requiredMsg="Выберите действие!">
        <RadioStyleWrapper size="large">
            <Radio.Button
                disabled={!modes.includes('plus-minus')}
                value="plus-minus"
            >
                + <span className="slash">/</span> -
            </Radio.Button>
            <Radio.Button
                disabled={!modes.includes('multiply')}
                value="multiply"
            >
                ×
            </Radio.Button>
            <Radio.Button
                disabled={!modes.includes('divide')}
                value="divide"
            >
                ÷
            </Radio.Button>
        </RadioStyleWrapper>
    </FormItem>;
};

export default React.memo(ModeItem);