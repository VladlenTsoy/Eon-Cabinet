import React, {useState} from 'react';
import {FormItem, Upload} from "../../../../../lib";
import {Card} from "lib";
import {SaveOutlined} from '@ant-design/icons';
import {Col, Input, message, Button, Row, Form} from "antd";

const {TextArea} = Input;

const FranchiseSettingFormData: React.FC<any> = ({franchise, update}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            await update(values);
            message.success('Вы успешно изменили данные!');
        } catch (e) {
            message.error(e.response.data.message);
        }
        setLoading(false);
    };

    return (
        <Card>
            <Card.Title level={3} title="Информация"/>
            <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={{
                title: franchise.title,
                description: franchise.description,
                image: franchise.image,
            }}>
                <Row gutter={15} align="middle">
                    <Col xl={12}>
                        <Upload form={form} name="image" label="Лого"/>
                    </Col>
                    <Col xl={12}>
                        <FormItem name="title" label="Название" requiredMsg="Введите название">
                            <Input/>
                        </FormItem>
                        <FormItem name="description" label="Описание">
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <Button htmlType="submit" type="primary" icon={<SaveOutlined/>} block
                                loading={loading}>Сохранить</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default FranchiseSettingFormData;