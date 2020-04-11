import React, {useEffect, useState} from 'react';
import {FormItem, Upload} from "../../../../../layouts/components";
import {Card} from "lib";
import { SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Input, message, Button, Row } from "antd";

const {TextArea} = Input;

const FranchiseSettingFormData: React.FC<any> = ({form, franchise, update}) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.setFieldsValue({
            title: franchise.title,
            description: franchise.description,
            image: franchise.image,
        });
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err: any, values: any) => {
            if (!err) {
                setLoading(true);
                try {
                    await update(values);
                    message.success('Вы успешно изменили данные!');
                } catch (e) {
                    message.error(e.response.data.message);
                }
                setLoading(false);
            }
        });
    };

    return (
        <Card>
            <Card.Title level={3} title="Информация"/>
            <Form onSubmit={handleSubmit}>
                <Row  gutter={15} align="middle">
                    <Col xl={12}>
                        <Upload form={form} name="image" label="Лого"/>
                    </Col>
                    <Col xl={12}>
                        <FormItem form={form} name="title" label="Название" required="Введите название">
                            <Input/>
                        </FormItem>
                        <FormItem form={form} name="description" label="Описание">
                            <TextArea autoSize={{minRows: 3, maxRows: 5}}/>
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <Button htmlType="submit" type="primary" icon={<SaveOutlined />} block loading={loading}>Сохранить</Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default Form.create<any>()(FranchiseSettingFormData);