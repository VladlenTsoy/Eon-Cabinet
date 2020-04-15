import React from 'react';
import {Card} from "lib";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Button, Col, Form, Radio, Row} from "antd";
import styled from "styled-components";

const RadioWrapper = styled(Radio.Group)`
  &.ant-radio-group {
    display: flex;
    width: 100%;
  
    .ant-radio-button-wrapper{
      width: 100%;
      text-align: center;
      height: 50px;
      line-height: 48px;
    
      span:last-child{
        //font-weight: 900;
        font-size: 25px;
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

    return <Row align="middle" justify="center">
        <Col xl={8}>
            <Card>
                <Form onFinish={onFinishHandler}>
                    <Form.Item name="control_mode">
                        <RadioWrapper size="large" buttonStyle="solid">
                            <Radio.Button value="addition">+ -</Radio.Button>
                            <Radio.Button value="multiplication">×</Radio.Button>
                            <Radio.Button value="division">÷</Radio.Button>
                        </RadioWrapper>
                    </Form.Item>
                    <Form.Item name="type_task">
                        <RadioWrapper size="large" buttonStyle="solid">
                            <Radio.Button value="basic">Анзан</Radio.Button>
                            <Radio.Button value="list">Листы</Radio.Button>
                        </RadioWrapper>
                    </Form.Item>
                    <Button type="primary" icon={<ArrowRightOutlined/>} size="large" htmlType="submit"
                            block>Далее</Button>
                </Form>
            </Card>
        </Col>
    </Row>;
};

export default Setup;