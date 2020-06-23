import React, {useState} from 'react';
import {Button, Form, Switch} from "antd";
import styled from "styled-components";
import {EditOutlined, FlagOutlined, PlusOutlined, PrinterOutlined, UndoOutlined} from '@ant-design/icons';

const ButtonGroupWrapper = styled(Button.Group)`
  width: 100%;
  justify-content: center;
`;

const PrintWrapper = styled.div`
  display: flex;
  justify-content: center;
  transform: scale(1.5);
`;

interface ActionFormProps {
    typeTask: string;
    isEdit?: boolean,
    loading: boolean,
    clearForms: () => void;
    startApplication?: (setting: any, print: boolean) => void;
    addSettingHomework?: (setting: any) => void;
}

const ActionForm: React.FC<ActionFormProps> = (
    {
        loading,
        typeTask,
        isEdit = false,
        clearForms,
        addSettingHomework,
    }
) => {
    const [isPrint, setIsPrint] = useState(false);

    const changePrintHandler = () => {
        setIsPrint(!isPrint)
    };

    return <Form name="action">
        {
            typeTask === 'list' ?
                <PrintWrapper>
                    <Form.Item
                        name="print"
                        valuePropName="checked"
                    >
                        <Switch
                            onChange={changePrintHandler}
                            checkedChildren={<PrinterOutlined/>}
                            unCheckedChildren={<FlagOutlined/>}
                            defaultChecked
                        />
                    </Form.Item>
                </PrintWrapper> : null
        }

        <ButtonGroupWrapper size="large">
            {
                addSettingHomework ?
                    isEdit ?
                        <Button htmlType="submit" type="primary" icon={<EditOutlined/>}>Изменить</Button> :
                        <Button htmlType="submit" type="primary" icon={<PlusOutlined/>}>Добавить</Button> :
                    <>
                        <Button icon={<UndoOutlined/>} onClick={clearForms}>Очистить</Button>
                        {
                            isPrint ?
                                <Button htmlType="submit" icon={<PrinterOutlined/>} type="primary"
                                        loading={loading}>Распечатать</Button> :
                                <Button htmlType="submit" type="primary" icon={<FlagOutlined/>}
                                        loading={loading}>Начать</Button>
                        }
                    </>
            }
        </ButtonGroupWrapper>
    </Form>;
};

export default React.memo(ActionForm);