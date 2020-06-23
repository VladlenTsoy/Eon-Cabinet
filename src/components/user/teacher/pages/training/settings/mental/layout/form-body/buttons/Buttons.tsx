import React, {useState} from 'react';
import {Button} from "antd";
import styled from "styled-components";
import {EditOutlined, FlagOutlined, PlusOutlined, PrinterOutlined, UndoOutlined} from '@ant-design/icons';
import {FormInstance} from "antd/es/form";

const ButtonGroupWrapper = styled(Button.Group)`
  width: 100%;
  justify-content: center;
`;

interface ButtonsProps {
    form: FormInstance,
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
        form.validateFields()
            .then(async (values: any) => {
                setLoading(true);
                if (addSettingHomework)
                    await addSettingHomework(values);
                else if (startApplication)
                    await startApplication(values, false);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            })
    };

    /***
     * Печать листов
     *
     * @param e
     */
    const handlerPrintList = async (e: any) => {
        e.preventDefault();
        form.validateFields()
            .then(async (values: any) => {
                setLoading(true);
                if (startApplication)
                    await startApplication(values, true);
                setLoading(false);
            });
    };

    /***
     * Очистка настроек
     *
     * @param e
     */
    const clearSetting = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        form.resetFields();
        if (clearSaveSetting)
            await clearSaveSetting();
        setLoading(false);
    };

    return <ButtonGroupWrapper size="large">
        {
            addSettingHomework ?
                isEdit ?
                    <Button htmlType="submit" type="primary" loading={loading} onClick={onFinish}
                            icon={<EditOutlined/>}>Изменить</Button> :
                    <Button htmlType="submit" type="primary" loading={loading} onClick={onFinish}
                            icon={<PlusOutlined/>}>Добавить</Button> :
                <>
                    <Button icon={<UndoOutlined/>} loading={loading} onClick={clearSetting}>Очистить</Button>
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