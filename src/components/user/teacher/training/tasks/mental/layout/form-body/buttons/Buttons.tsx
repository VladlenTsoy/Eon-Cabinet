import React from 'react';
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
    clearSaveSetting?: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    setLoading: (loading: boolean) => void;
    addSettingHomework?: (setting: any) => void;
    loading: boolean;
    isEdit?: boolean;
}

const Buttons: React.FC<ButtonsProps> = (
    {
        form,
        loading,
        setLoading,
        clearSaveSetting,
        startApplication,
        addSettingHomework,
        isEdit
    }
) => {

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

export default Buttons;