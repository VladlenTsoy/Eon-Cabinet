import React, {useState} from 'react';
import styled from "styled-components";
import {FlagOutlined, QuestionCircleOutlined, UndoOutlined, UserAddOutlined} from '@ant-design/icons';
import {Button, Radio, Switch, Form} from "antd";
import EditorExercises from "./editor-exercise/EditorExercises";
import {FormItem} from "../../../../../../../../layouts/components";
import {FormProps} from "antd/es/form";

const HeaderBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 15px;
  width: 100%;
  justify-content: space-between;
  
  .ant-form-item{
    margin-bottom: 0;
  }
`;

const FormWrapper: React.FC<FormProps> = styled(Form)`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1.5rem;
  font-size: 16px;
  
  span{
    margin-right: 0.5rem;
  }
`;

interface HeaderBlockProps {
    fields: any;
    isDisabledMode: boolean;
    isMaxStudent?: boolean;
    onChange: (setting: any) => void;
    addExercise: (setting: any) => void;
    handlerStart: (setting: any) => void;
    clearExercise: () => void;
}

const HeaderBlock: React.FC<HeaderBlockProps> = (
    {
        fields,
        isDisabledMode,
        isMaxStudent,
        addExercise,
        handlerStart,
        clearExercise,
    }
) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    /**
     * Отправка настроек для начала упражнения
     */
    const handlerSubmit = async () => {
        setLoading(true);
        try {
            await handlerStart(form.getFieldsValue());
        } catch (e) {
            setLoading(false);
        }
    };

    const handlerClear = () => {
        form.resetFields();
        clearExercise();
    };

    return (
        <HeaderBlockWrapper>
            <FormWrapper id="multi-from" onFinish={handlerSubmit} initialValues={{
                mode: fields.mode.value,
                group: fields.group.value
            }}>
                <FormItem
                    name="mode"
                    // TODO - значения по умолчанию
                    // initialValue="addition"
                >
                    <Radio.Group
                        disabled={isDisabledMode}
                        buttonStyle="solid"
                        size="large"
                    >
                        <Radio.Button value="addition">+ Плюс, - Минус</Radio.Button>
                        <Radio.Button value="multiplication">* Умножение, / Деление</Radio.Button>
                    </Radio.Group>
                </FormItem>
                {form.getFieldValue('mode') === 'multiplication' ?
                    <SwitchWrapper>
                        <span>Примеры подряд <QuestionCircleOutlined/></span>
                        <FormItem
                            name="group"
                            valuePropName="checked"
                        >
                            <Switch/>
                        </FormItem>
                    </SwitchWrapper> : null
                }
            </FormWrapper>
            {isMaxStudent ? null :
                <EditorExercises
                    updateExercise={addExercise}
                    mods={form.getFieldValue('mode')}
                >
                    <Button icon={<UserAddOutlined/>} size="large">
                        Добавить участника
                    </Button>
                </EditorExercises>}
            <Button.Group size="large">
                <Button
                    icon={<UndoOutlined/>}
                    onClick={handlerClear}
                >
                    Очистить
                </Button>
                <Button
                    form="multi-from"
                    loading={loading}
                    type="primary"
                    icon={<FlagOutlined/>}
                    onClick={handlerSubmit}
                >
                    Начать
                </Button>
            </Button.Group>
        </HeaderBlockWrapper>
    );
};

export default HeaderBlock;