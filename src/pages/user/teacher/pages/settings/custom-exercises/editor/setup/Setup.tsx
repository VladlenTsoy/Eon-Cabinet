import React, {useState} from 'react';
import {Card} from "lib/components";
import {ArrowRightOutlined} from "@ant-design/icons";
import {Button, Col, Form, Row} from "antd";
import {Alert} from "lib/components";
import {Link} from "react-router-dom";
import FormHeadItems from "./form-head-items/FormHeadItems";
import FormBodyItems from "./form-body-items/FormBodyItems";

interface SetupProps {
    setSetupSetting: any;
}

const Setup: React.FC<SetupProps> = ({setSetupSetting}) => {
    const [form] = Form.useForm();
    const [typeTask, setTypeTask] = useState('basic');
    const [mode, setMode] = useState('plus-minus');

    const onChangeHandler = (changeValues: any, allValues: any) => {
        setMode(allValues.mode);
        setTypeTask(allValues.type_task);
    };

    const onFinishHandler = (values: any) => {
        setSetupSetting(values);
    };

    return <Row align="middle" justify="center" style={{height: '100%'}}>
        <Col xl={12}>
            <Card>
                <Alert
                    type="info"
                    showIcon
                    message="Создание примеров"
                    description={
                        <>
                            Выберите в каком виде буду отображаться примеры. Если вы не знакомы с видами упражнений
                            перейдите в <Link to="/training">тренеровку.</Link>
                        </>
                    }
                />
                <Form
                    onValuesChange={onChangeHandler}
                    form={form}
                    layout="vertical"
                    onFinish={onFinishHandler}
                    initialValues={{
                        type_task: 'basic',
                        mode: 'plus-minus',
                        count: 1,
                        times: 1,
                        tables: 1,
                        column: 6,
                        rows: 1,
                    }}
                >
                    <FormHeadItems/>
                    <FormBodyItems typeTask={typeTask} mode={mode}/>
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