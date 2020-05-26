import React from 'react';
import {Col, Form, InputNumber, Radio, Row} from "antd";
import {FormItem} from "../../../../../../../../../layouts/components";
import {useAppContext} from "store/context/use-app-context";
import Stepper from "../../../../../../../../../lib/stepper/Stepper";

interface SpecialFormItemsProps {
}

const SpecialFormItems: React.FC<SpecialFormItemsProps> = () => {
    const {language} = useAppContext();

    return <Row gutter={15}>
        <Col span={24}>
            <Form.Item name="mode" required>
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
                requiredMsg="Введите от какой цифры">
                <InputNumber min={1} max={9999999999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={12}>
            <FormItem
                name="to"
                label="До"
                requiredMsg="Введите до какой цифры">
                <InputNumber min={1} max={9999999999} style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="count"
                label="Количество цифр"
                requiredMsg="Введите количество цифр!">
                <Stepper min={1} max={99}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="times"
                label="Количество раз"
                requiredMsg="Введите количество раз!">
                <Stepper min={1} max={99}/>
            </FormItem>
        </Col>
        <Col span={8}>
            <FormItem
                name="time"
                label="Время (секунды)"
                requiredMsg="Введите время!">
                <Stepper min={0.2} max={10} step={0.1}/>
            </FormItem>
        </Col>
    </Row>;
};

export default SpecialFormItems;