import React from 'react';
import usingFormBodyLayout from "../../../mental/layout/form-body/usingFormBody.layout";
import {FileOutlined} from '@ant-design/icons';
import {Col, InputNumber, Radio, Row, Select} from "antd";
import {FormItem} from "../../../../../../../../layouts/components";
import {RadioWrapper} from "../../../mental/anzan/anzan-form-body/type-setting-anzan/TypeSettingAnzan";
import ConfigBlock from "../../../config/Config";
import {FormInstance} from "antd/es/form";

interface NumbersFormBodyProps {
    form: FormInstance;
}

const NumbersFormBody: React.FC<NumbersFormBodyProps> = ({form}) => {
    return (
        <Row gutter={15}>
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
                <FormItem name="mode" label="Мод" required="Выберите мод!">
                    <Select>
                        <Select.Option value="1">2 - значные</Select.Option>
                        <Select.Option value="2">3 - значные</Select.Option>
                        <Select.Option value="3">Все</Select.Option>
                    </Select>
                </FormItem>
            </Col>
            <Col xs={12}>
                {form.getFieldValue('task-mode') === 'basic' ?
                    <FormItem label="Количество цифр" required="Введите количество цифр" name="count">
                        <InputNumber style={{width: '100%'}}/>
                    </FormItem> :
                    <FormItem label="Количество строк" required="Введите строк" name="count">
                        <InputNumber style={{width: '100%'}}/>
                    </FormItem>
                }
            </Col>
            <Col xs={12}>
                <FormItem label="Время (минуты)" required="Введите время (минуты)" name="time">
                    <InputNumber style={{width: '100%'}}/>
                </FormItem>
            </Col>
            <Col span={24}>
                <ConfigBlock
                    form={form}
                    sounds={form.getFieldValue('task-mode') === 'basic' ? {
                        language: true,
                    } : false}
                />
            </Col>
        </Row>
    );
};

export default usingFormBodyLayout(NumbersFormBody);