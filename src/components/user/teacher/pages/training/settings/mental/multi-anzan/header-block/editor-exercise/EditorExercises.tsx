import React, {useState} from 'react';
import styled from "styled-components";
import Anzan from "../../../anzan/Anzan";
import {Modal} from "../../../../../../../../../../layouts/components";

const AddExercisesWrapper = styled.div`
  margin-right: 1.5rem;
`;

const AnzanSettingWrapper = styled.div`
  padding: 1rem 0;
`;

interface AddExercisesProps {
    updateExercise: (setting: any) => void,
    mods: string,
    isEdit?: boolean,
    setting?: string,
}

const EditorExercises: React.FC<AddExercisesProps> = (
    {
        mods,
        updateExercise,
        isEdit,
        setting,
        children
    }
) => {
    const [visible, setVisible] = useState(false);

    const openSettingHandler = () =>
        setVisible(true);

    const closeHandler = () =>
        setVisible(false);

    const submitHandler = (setting: any) => {
        closeHandler();
        updateExercise(setting);
    };

    return <AddExercisesWrapper>
        <span onClick={openSettingHandler}>
            {children}
        </span>
        <Modal
            destroyOnClose
            centered
            closable={false}
            width="800px"
            visible={visible}
            onCancel={closeHandler}
        >
            <AnzanSettingWrapper>
                <Anzan
                    isMultiAnzan
                    isEdit={isEdit}
                    mods={mods}
                    userSetting={setting}
                    sound={false}
                    addSettingHomework={submitHandler}
                />
            </AnzanSettingWrapper>
        </Modal>
    </AddExercisesWrapper>;
};

export default EditorExercises;