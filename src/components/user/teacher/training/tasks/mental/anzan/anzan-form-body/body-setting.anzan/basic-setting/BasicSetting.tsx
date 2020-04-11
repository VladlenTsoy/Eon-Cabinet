import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../../../layouts/components";

interface BasicSettingProps {
    form: any;
    mods?: string;
    multi?: boolean;
    setting: any;
    isMultiplication: boolean;
}

const BasicSetting: React.FC<BasicSettingProps> = (
    {
        form,
        mods,
        multi,
        setting,
        isMultiplication
    }
) => {
    return <Row  gutter={15}>
        {!isMultiplication ?
            <Col sm={multi ? 12 : 8} xs={12}>
                <FormItem
                    form={form}
                    name="count"
                    label="Количество цифр"
                    initialValue={setting.count || 1}
                    required="Введите количество цифр!">
                    <InputNumber min={1} max={
                        isMultiplication ? 200 :
                            form.getFieldValue('length') === 1 ? 10 :
                                form.getFieldValue('length') === 2 ? 20 : 200
                    } style={{width: '100%'}}/>
                </FormItem>
            </Col> : null}
        {!multi || mods === 'multiplication' ?
            <Col sm={isMultiplication ? 12 : 8} xs={12}>
                <FormItem
                    form={form}
                    name="times"
                    label="Количество раз"
                    initialValue={1}
                    required="Введите количество раз!">
                    <InputNumber min={1} style={{width: '100%'}}/>
                </FormItem>
            </Col> : null}
        <Col sm={multi || isMultiplication ? 12 : 8} xs={multi || isMultiplication ? 12 : 24}>
            <FormItem
                form={form}
                name="time"
                label="Время (секунды)"
                initialValue={2}
                required="Введите время!">
                <InputNumber min={0.2} max={10} step={0.1} style={{width: '100%'}}/>
            </FormItem>
        </Col>
    </Row>;
};

export default BasicSetting;