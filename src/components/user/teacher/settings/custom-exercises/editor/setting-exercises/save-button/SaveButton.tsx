import React, {useState} from 'react';
import {Button} from "antd";
import {ArrowRightOutlined} from "@ant-design/icons";
import {FormInstance} from "antd/es/form";
import {Modal} from "layouts/components";
import FormItems from "./form-items/FormItems";
import {flattenDepth} from "lodash";

interface SaveButtonProps {
    form: FormInstance;
    setupSetting: { control_mode: string, type_task: string };
}

const SaveButton: React.FC<SaveButtonProps> = ({form, setupSetting}) => {
    const [visible, setVisible] = useState(false);
    const [exercises, setExercises] = useState([]);

    const close = () => setVisible(false);

    const onSubmitHandler = () => {
        form.validateFields()
            .then((values: any) => {
                setVisible(true);
                let exercises = values.exercises;

                // if (setupSetting.type_task === 'list')
                    exercises = flattenDepth(exercises, 2);

                setExercises(exercises);
            });
    };

    return <>
        <Button size="large" type="primary" icon={<ArrowRightOutlined/>} block onClick={onSubmitHandler}>
            Далее
        </Button>
        <Modal
            title="Сохранить"
            visible={visible}
            onCancel={close}
        >
            <FormItems exercises={exercises} setupSetting={setupSetting}/>
        </Modal>
    </>;
};

export default SaveButton;