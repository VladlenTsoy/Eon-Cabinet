import React from 'react';
import {Col, Radio, Row, Select} from "antd";
import {FormItem} from "../../../../../../../../../lib/ui";
import {RadioWrapper} from "../../../mental/anzan/forms/type-form/TypeForm";
import ConfigBlock from "../../../config/Config";
import {FileOutlined} from '@ant-design/icons';
import Stepper from "../../../../../../../../../lib/ui/stepper/Stepper";

interface FormItemsProps {
    typeTask: string;
}

const FormItems:React.FC<FormItemsProps> = ({typeTask}) => {
    return <Row gutter={15}>
        <Col span={24}>
            <FormItem
                name="task-mode"
                marginBottom="0"
            >
                <RadioWrapper size="large" column="1fr 1fr">
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
            {typeTask === 'basic' ?
                <FormItem label="Количество цифр" requiredMsg="Введите количество цифр" name="count">
                    <Stepper min={1} max={99}/>
                </FormItem> :
                <FormItem label="Количество строк" requiredMsg="Введите строк" name="count">
                    <Stepper min={1} max={99}/>
                </FormItem>
            }
        </Col>
        <Col xs={12}>
            <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                <Stepper min={0.1} step={0.1}/>
            </FormItem>
        </Col>
        <Col span={24}>
            <ConfigBlock
                sounds={typeTask === 'basic' ? {
                    language: true,
                } : false}
            />
        </Col>
    </Row>;
};

export default FormItems;