import React from 'react';
import {Button} from "antd";
import EditorExercises from "../editor-exercise/EditorExercises";
import {FlagOutlined, UndoOutlined, UserAddOutlined} from '@ant-design/icons';
import {FormInstance} from "antd/es/form";

interface HeaderActionProps {
    form: FormInstance;
    isMaxStudent?: boolean;
    addExercise: (setting: any) => void;
    loading: boolean;
    handlerClear: () => void;
}

const HeaderAction: React.FC<HeaderActionProps> = (
    {
        loading,
        form,
        addExercise,
        handlerClear,
        isMaxStudent
    }
) => {
    return <>
        {
            isMaxStudent ? null :
                <EditorExercises
                    updateExercise={addExercise}
                    mods={form.getFieldValue('mode')}
                >
                    <Button icon={<UserAddOutlined/>} size="large">
                        Добавить участника
                    </Button>
                </EditorExercises>
        }
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
                htmlType="submit"
                type="primary"
                icon={<FlagOutlined/>}
            >
                Начать
            </Button>
        </Button.Group>
    </>
};

export default HeaderAction;