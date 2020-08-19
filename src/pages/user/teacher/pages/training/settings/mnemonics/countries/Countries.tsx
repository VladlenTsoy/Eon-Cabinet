import React from 'react';
import {Col, Row, Select} from "antd";
import {FormItem} from "../../../../../../../../lib/ui";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import Stepper from "../../../../../../../../lib/ui/stepper/Stepper";

interface CountriesProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const Countries: React.FC<CountriesProps> = (
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
                    </Select>
                </FormItem>
            </Col>
            <Col xs={12}>
                <FormItem label="Количество стран" requiredMsg="Введите количество стран" name="count">
                    <Stepper min={1}/>
                </FormItem>
            </Col>
            <Col xs={12}>
                <FormItem label="Время (минуты)" requiredMsg="Введите время (минуты)" name="time">
                    <Stepper min={1} max={99}/>
                </FormItem>
            </Col>
        </Row>
    </FormSettingLayout>;
};

export default Countries;