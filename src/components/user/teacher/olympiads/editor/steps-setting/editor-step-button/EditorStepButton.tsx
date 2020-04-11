import React, {useState} from 'react';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from "antd";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import {FormItem} from "lib";
import ModalEditor from "layouts/modal-editor/ModalEditor";
import RangePicker from "./range-picker/RangePicker";
import moment from "moment";

type EditorStepButtonProps = FormComponentProps & {
    step?: any;
    first?: boolean;
    stepKey: number;
    setSteps: (steps: any) => void;
    setCurrent: (current: number) => void;
};

const EditorStepButton: React.FC<EditorStepButtonProps> = (
    {
        form,
        step,
        first = false,
        stepKey,
        children,
        setSteps,
        setCurrent
    }
) => {
    const [visible, setVisible] = useState(false);

    const onClickOpenModal = () => setVisible(true);
    const close = () => setVisible(false);

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                if (step && step.title)
                    setSteps((prevState: any) => {
                        prevState[stepKey] = values;
                        return JSON.parse(JSON.stringify(prevState));
                    });
                else {
                    setSteps((prevState: any) => [...prevState, values]);
                    if (!first)
                        setCurrent(stepKey + 1);
                }
                close();
            }
        })
    };

    return <>
        <ModalEditor
            close={close}
            visible={visible}
            title={step && step.title ? 'Редактирование этапа' : 'Создание этапа'}
            destroyOnClose={false}
        >
            <Form onSubmit={onSubmitHandler}>
                <FormItem form={form} name="title" label="Название" required="Введите название!"/>
                <RangePicker form={form} first={first}/>
                {step && step.title ?
                    <Button type="primary" block icon={<SaveOutlined />} htmlType="submit">Сохранить</Button> :
                    <Button type="primary" block icon={<PlusOutlined />} htmlType="submit">Создать</Button>
                }
            </Form>
        </ModalEditor>
        <span onClick={onClickOpenModal}>
            {children}
        </span>
    </>;
};

export default Form.create<EditorStepButtonProps>({
    name: 'editor-step',
    mapPropsToFields({step}) {
        if (step)
            return {
                title: step.title ? Form.createFormField({value: step.title}) : null,
                start_at: step.start_at ? Form.createFormField({value: moment(step.start_at)}) : null,
                end_at: step.end_at ? Form.createFormField({value: moment(step.end_at)}) : null
            };
    },
})(EditorStepButton);