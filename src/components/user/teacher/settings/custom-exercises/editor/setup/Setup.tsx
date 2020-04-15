import React from 'react';
import {Card} from "lib";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Button, Typography, Col, Form, Radio, Row} from "antd";
import styled from "styled-components";
import {Alert} from "layouts/components";
import {Link} from "react-router-dom";

const {Text} = Typography;

const RadioWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
      height: 50px;
      line-height: 48px;
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

interface SetupProps {
    setSetupSetting: any;
}

const Setup: React.FC<SetupProps> = ({setSetupSetting}) => {
    const onFinishHandler = (values: any) => {
        setSetupSetting(values);
    };

    return <Row align="middle" justify="center" style={{height: '100%'}}>
        <Col xl={9}>
            <Card>
                <Alert
                    type="info"
                    showIcon
                    message="Создание примеров"
                    description="Выберите арифметическое действия в котором будут создаваться примеры."
                />
                <Form
                    onFinish={onFinishHandler}
                    initialValues={{
                        control_mode: 'addition',
                        type_task: 'basic',
                    }}
                >
                    <Form.Item name="control_mode">
                        <RadioWrapper size="large" className="mode">
                            <Radio.Button value="addition">+ <span className="slash">/</span> -</Radio.Button>
                            <Radio.Button value="multiplication">×</Radio.Button>
                            <Radio.Button value="division">÷</Radio.Button>
                        </RadioWrapper>
                    </Form.Item>
                    <p>
                        <Text type="secondary">
                            Выберите в каком виде буду отображаться примеры. Если вы не знакомы с видами упражнений
                            перейдите в <Link to="/training">тренеровку.</Link>
                        </Text>
                    </p>
                    <Form.Item name="type_task">
                        <RadioWrapper size="large" className="type">
                            <Radio.Button value="basic">Анзан</Radio.Button>
                            <Radio.Button value="list">Листы</Radio.Button>
                        </RadioWrapper>
                    </Form.Item>
                    <Button
                        type="primary"
                        icon={<ArrowRightOutlined/>}
                        size="large"
                        htmlType="submit"
                        block
                    >
                        Далее
                    </Button>
                </Form>
            </Card>
        </Col>
    </Row>;
};

export default Setup;