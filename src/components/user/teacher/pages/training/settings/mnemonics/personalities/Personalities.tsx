import React from 'react';
import {FormItem} from "lib";
import {Col, Row, Select} from "antd";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import Stepper from "../../../../../../../../lib/stepper/Stepper";

interface PersonalitiesProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Personalities: React.FC<PersonalitiesProps> = (
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
                        <Select.Option value="3">Уровень 3</Select.Option>
                    </Select>
                </FormItem>
            </Col>
            <Col sm={12} xs={24}>
                <FormItem label="Количество личностей" requiredMsg="Введите количество личностей" name="count">
                    <Stepper min={1}/>
                </FormItem>
            </Col>
            <Col sm={12} xs={24}>
                <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                    <Stepper min={1} max={99}/>
                </FormItem>
            </Col>
        </Row>
    </FormSettingLayout>;
};

export default Personalities;