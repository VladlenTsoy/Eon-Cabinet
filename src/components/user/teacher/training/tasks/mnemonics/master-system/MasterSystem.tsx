import React from "react";
import {Col, Row, Select} from "antd";
import {FormItem} from "layouts/components";
import FormSettingLayout from "../../mental/layout/form-setting/FormSetting.layout";
import Stepper from "../../../../../../../lib/stepper/Stepper";

interface MasterSystemProps {
    userSetting?: any;
    clearSaveSetting?: any;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const MasterSystem: React.FC<MasterSystemProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
    }
) => {
    const setting = userSetting.hasOwnProperty('mode') ? {...userSetting, mode: String(userSetting.mode)} : userSetting;
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
                        <Select.Option value="1">По порядку</Select.Option>
                        <Select.Option value="2">Вразброс</Select.Option>
                    </Select>
                </FormItem>
            </Col>
            <Col xs={12}>
                <FormItem label="Количество цифр" requiredMsg="Введите количество цифр" name="count">
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

export default MasterSystem;