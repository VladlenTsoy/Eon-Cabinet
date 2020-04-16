import React from 'react';
import {Form, Radio, Typography} from "antd";
import styled from "styled-components";

const {Text} = Typography;

const RadioWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
      //height: 50px;
      //line-height: 48px;
      border-style: dashed;
      
      span:last-child{
        //font-weight: 900;
      }
    }
  }
  
  &.mode{
    .ant-radio-button-wrapper{
      span:last-child{
        font-size: 25px;
        
        .slash{
          color: ${props => props.theme.light_color_border};
        }
      }
    }
  }
  
  &.type{
    .ant-radio-button-wrapper{
      span:last-child{
        font-size: 20px;
      }
    }
  }
`;


interface TypeTaskItemProps {

}

const FormHeadItems: React.FC<TypeTaskItemProps> = () => {
    return <>
        <Form.Item name="type_task">
            <RadioWrapper size="large" className="type">
                <Radio.Button value="basic">Анзан</Radio.Button>
                <Radio.Button value="list">Листы</Radio.Button>
            </RadioWrapper>
        </Form.Item>

        <p>
            <Text type="secondary">
                Выберите арифметическое действия в котором будут создаваться примеры.
            </Text>
        </p>

        <Form.Item name="mode">
            <RadioWrapper size="large" className="mode">
                <Radio.Button value="plus-minus">+ <span className="slash">/</span> -</Radio.Button>
                <Radio.Button value="multiply">×</Radio.Button>
                <Radio.Button value="divide">÷</Radio.Button>
            </RadioWrapper>
        </Form.Item>
    </>;
};

export default FormHeadItems;