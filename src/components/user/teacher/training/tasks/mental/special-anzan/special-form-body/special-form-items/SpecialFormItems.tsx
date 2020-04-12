import React from 'react';
import {Col, Form, InputNumber, Radio, Row} from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";
import {useSelector} from "react-redux";

interface SpecialFormItemsProps {
}

const SpecialFormItems: React.FC<SpecialFormItemsProps> = () => {
    const {language} = useSelector((state: any) => state);

    return <Row gutter={15}>
        <Col span={24}>
            <Form.Item
                name="mode"
                required
                // TODO - Значание по умолчанию
                // initialValue="plus"
            >
                <Radio.Group className="setting-mode" buttonStyle="solid">
                    <Radio.Button value="plus">
                        {language.common.modeNames['plus']}
                    </Radio.Button>
                    <Radio.Button value="plus-minus">
                        {language.common.modeNames['plus-minus']}
                    </Radio.Button>
                </Radio.Group>
            </Form.Item>
        </Col>
        <Col span={12}>
            <FormItem
                name="from"
                label="От"
                required="Введите от какой цифры">
                <InputNumber min={1} max={9999999999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="to"
                label="До"
                required="Введите до какой цифры">
                <InputNumber min={1} max={9999999999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="count"
                label="Количество цифр"
                required="Введите количество цифр!">
                <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="times"
                label="Количество раз"
                required="Введите количество раз!">
                <InputNumber min={1} max={10} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="time"
                label="Время (секунды)"
                required="Введите время!">
                <InputNumber min={0.2} max={10} step={0.1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default SpecialFormItems;