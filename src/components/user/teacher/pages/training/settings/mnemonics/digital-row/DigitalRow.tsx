import React from 'react';
import {Col, InputNumber, Row} from "antd";
import {FormItem} from "../../../../../../../../lib";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";

interface DigitalRowProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const DigitalRow: React.FC<DigitalRowProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    return <FormSettingLayout
        initialValues={{
            count: 1,
            time: 1,
            extra: [],
            sound: 'basic',
        }}
        userSetting={userSetting}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
    >
        <Row gutter={15}>
            <Col xs={12}>
                <FormItem label="Количество цифр" requiredMsg="Введите количество цифр" name="count">
                    <InputNumber style={{width: '100%'}} max={100} min={1}/>
                </FormItem>
            </Col>
            <Col xs={12}>
                <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                    <InputNumber style={{width: '100%'}}/>
                </FormItem>
            </Col>
        </Row>
    </FormSettingLayout>;
};

export default DigitalRow;