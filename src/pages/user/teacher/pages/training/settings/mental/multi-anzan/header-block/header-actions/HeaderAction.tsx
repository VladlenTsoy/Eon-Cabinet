import React from 'react';
import {Button} from "lib/ui";
import EditorExercises from "../editor-exercise/EditorExercises";
import {FlagOutlined, UndoOutlined, UserAddOutlined} from '@ant-design/icons';

interface HeaderActionProps {
    mode: string;
    isMaxStudent?: boolean;
    addExercise: (setting: any) => void;
    loading: boolean;
    handlerClear: () => void;
}

const HeaderAction: React.FC<HeaderActionProps> = (
    {
        loading,
        mode,
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
                    mods={mode}
                >
                    <Button icon={<UserAddOutlined/>} size="large">
                        Добавить участника
                    </Button>
                </EditorExercises>
        }
        <div>
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
        </div>
    </>
};

export default HeaderAction;