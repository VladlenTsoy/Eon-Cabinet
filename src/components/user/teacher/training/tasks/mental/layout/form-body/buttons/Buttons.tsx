import React, {useState} from 'react';
import {Button} from "antd";
import styled from "styled-components";
import {EditOutlined, FlagOutlined, PlusOutlined, PrinterOutlined, UndoOutlined} from '@ant-design/icons';
import {FormInstance} from "antd/es/form";

const ButtonGroupWrapper = styled(Button.Group)`
  width: 100%;
  text-align: center;
`;

interface ButtonsProps {
    form: FormInstance,
    fields: any,
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    isEdit?: boolean;
}

const Buttons: React.FC<ButtonsProps> = (
    {
        form,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        isEdit
    }
) => {
    const [loading, setLoading] = useState(false);

    /***
     * Начать упражнения
     *
     * @param e
     */
    const onFinish = async (e: any) => {
        e.preventDefault();
        let values = form.getFieldsValue();
        setLoading(true);
        try {
            if (addSettingHomework)
                await addSettingHomework(values);
            else if (startApplication)
                await startApplication(values, false);
        } catch (e) {
            setLoading(false);
        }
    };

    /***
     * Печать листов
     *
     * @param e
     */
    const handlerPrintList = async (e: any) => {
        e.preventDefault();
        let values = form.getFieldsValue();
        setLoading(true);
        if (startApplication)
            await startApplication(values, true);
        setLoading(false);
    };


    /***
     * Очистка настроек
     *
     * @param e
     */
    const clearSetting = (e: any) => {
        e.preventDefault();
        form.resetFields();
        if (clearSaveSetting)
            clearSaveSetting();
    };

    return <ButtonGroupWrapper size="large">
        {addSettingHomework ?
            isEdit ?
                <Button htmlType="submit" type="primary" icon={<EditOutlined/>}>Изменить</Button> :
                <Button htmlType="submit" type="primary" icon={<PlusOutlined/>}>Добавить</Button> :
            <>
                <Button icon={<UndoOutlined/>} onClick={clearSetting}>Очистить</Button>
                {form.getFieldValue('anzan') === 'list' ?
                    <Button
                        icon={<PrinterOutlined/>}
                        type="primary"
                        onClick={handlerPrintList}
                        loading={loading}>
                        Распечатать
                    </Button> : null
                }
                <Button
                    onClick={onFinish}
                    htmlType="submit"
                    type="primary"
                    icon={<FlagOutlined/>}
                    loading={loading}
                >
                    Начать
                </Button>
            </>
        }
    </ButtonGroupWrapper>;
};

export default React.memo(Buttons);