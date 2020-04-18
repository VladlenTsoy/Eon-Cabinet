import React from "react";
import {Col, InputNumber, Radio, Row, Select} from "antd";
import {FormItem} from "layouts/components";
import {RadioWrapper} from "../../mental/anzan/forms/type-form/TypeForm";
import ConfigBlock from "../../config/Config";
import {FileOutlined} from '@ant-design/icons';
import usingFormBodyLayout from "../../mental/layout/form-body/usingFormBody.layout";

interface NumbersProps {
    form: any;
}

const Numbers: React.FC<NumbersProps> = ({form}) => {
    return <Row gutter={15}>
        <Col span={24}>
            <FormItem
                name="task-mode"
                // TODO - Значение по умолчанию
                // initialValue="basic"
                marginBottom="0"
            >
                <RadioWrapper size="large">
                    <Radio.Button value="basic">Обычный</Radio.Button>
                    <Radio.Button value="list"><FileOutlined/> Листы</Radio.Button>
                </RadioWrapper>
            </FormItem>
            <FormItem name="mode" label="Мод" requiredMsg="Выберите мод!">
                <Select>
                    <Select.Option value="1">2 - значные</Select.Option>
                    <Select.Option value="2">3 - значные</Select.Option>
                    <Select.Option value="3">Все</Select.Option>
                </Select>
            </FormItem>
        </Col>
        <Col xs={12}>
            {form.getFieldValue('task-mode') === 'basic' ?
                <FormItem label="Количество цифр" requiredMsg="Введите количество цифр" name="count">
                    <InputNumber style={{width: '100%'}}/>
                </FormItem> :
                <FormItem label="Количество строк" requiredMsg="Введите строк" name="count">
                    <InputNumber style={{width: '100%'}}/>
                </FormItem>
            }
        </Col>
        <Col xs={12}>
            <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                <InputNumber style={{width: '100%'}}/>
            </FormItem>
        </Col>
        <Col span={24}>
            <ConfigBlock
                sounds={form.getFieldValue('task-mode') === 'basic' ? {
                    language: true,
                } : false}
            />
        </Col>
    </Row>;
};

export default usingFormBodyLayout(Numbers);