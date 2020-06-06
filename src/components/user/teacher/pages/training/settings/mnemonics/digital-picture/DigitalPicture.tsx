import React from 'react';
import {Col, Row, Select} from "antd";
import {FormItem} from "../../../../../../../../lib";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import Stepper from "../../../../../../../../lib/stepper/Stepper";

interface DigitalPictureProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const DigitalPicture: React.FC<DigitalPictureProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const setting = typeof userSetting === 'object' && userSetting.hasOwnProperty('mode') ? {
        ...userSetting,
        mode: String(userSetting.mode)
    } : userSetting;
    return <FormSettingLayout
        initialValues={{
            mode: '1',
            count: 1,
            time_card: 1,
            time: 1,
        }}
        userSetting={setting}
        clearSaveSetting={clearSaveSetting}
        startApplication={startApplication}
        addSettingHomework={addSettingHomework}
    >
        <Row gutter={15}>
            <Col span={24}>
                <FormItem name="mode" label="Мод" requiredMsg="Выберите мод!">
                    <Select>
                        <Select.Option value="1">Уровень 1</Select.Option>
                        <Select.Option value="2">Уровень 2</Select.Option>
                    </Select>
                </FormItem>
            </Col>
            <Col md={8} xs={12}>
                <FormItem label="Количество" requiredMsg="Введите количество цифр" name="count">
                    <Stepper min={1} max={99}/>
                </FormItem>
            </Col>
            <Col md={8} xs={12}>
                <FormItem label="Время" requiredMsg="Введите время" name="time">
                    <Stepper min={0.1} step={0.1} max={99}/>
                </FormItem>
            </Col>
            <Col md={8} xs={24}>
                <FormItem label="Появление второй карты через" requiredMsg="Введите время" name="time_card">
                    <Stepper min={0.1} step={0.1} max={99}/>
                </FormItem>
            </Col>
        </Row>
    </FormSettingLayout>;
};

export default DigitalPicture;