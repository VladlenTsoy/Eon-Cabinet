import React, {useState} from 'react';
import styled from "styled-components";
import { FlagOutlined, QuestionCircleOutlined, UndoOutlined, UserAddOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Radio, Switch } from "antd";
import EditorExercises from "./editor-exercise/EditorExercises";
import { FormComponentProps } from '@ant-design/compatible/es/form';
import {FormItem} from "../../../../../../../../layouts/components";

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

const FormWrapper = styled(Form)`
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

const HeaderBlock: React.FC<FormComponentProps & HeaderBlockProps> = (
    {
        form,
        isDisabledMode,
        isMaxStudent,
        addExercise,
        handlerStart,
        clearExercise,
    }
) => {
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
            <FormWrapper id="multi-from" onSubmit={handlerSubmit}>
                <FormItem
                    form={form}
                    name="mode"
                    initialValue="addition"
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
                        <span>Примеры подряд <QuestionCircleOutlined /></span>
                        <FormItem
                            form={form}
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
                    <Button icon={<UserAddOutlined />} size="large">
                        Добавить участника
                    </Button>
                </EditorExercises>}
            <Button.Group size="large">
                <Button
                    icon={<UndoOutlined />}
                    onClick={handlerClear}
                >
                    Очистить
                </Button>
                <Button
                    form="multi-from"
                    loading={loading}
                    type="primary"
                    icon={<FlagOutlined />}
                    onClick={handlerSubmit}
                >
                    Начать
                </Button>
            </Button.Group>
        </HeaderBlockWrapper>
    );
};

export default Form.create<FormComponentProps & HeaderBlockProps>(
    {
        onFieldsChange(props, changedFields) {
            props.onChange(changedFields);
        },
        mapPropsToFields({fields}) {
            return {
                mode: Form.createFormField({
                    ...fields.mode,
                    value: fields.mode.value
                }),
                group: Form.createFormField({
                    ...fields.group,
                    value: fields.group.value
                })
            }
        }
    }
)(HeaderBlock);