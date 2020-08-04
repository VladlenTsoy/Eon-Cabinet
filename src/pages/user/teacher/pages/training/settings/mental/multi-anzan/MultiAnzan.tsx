import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Modal} from "antd";
import HeaderBlock from "./header-block/HeaderBlock";
import MultiGridLayout from "../../../../../../general/tasks/mental/multi-anzan/layouts/MultiGrid.layout";
import InformationBlock from "./information-block/InformationBlock";
import ExerciseSetting from "./exercise-setting/ExerciseSetting";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

interface MultiAnzanProps {
    userSetting: any;
    clearSaveSetting: () => void;
    startApplication: (setting: any) => void;
}

const initFields = [
    {name: ['mode'], value: 'addition'},
    {name: ['group'], value: false},
];

const MultiAnzan: React.FC<MultiAnzanProps> = (
    {
        userSetting,
        clearSaveSetting,
        startApplication,
    }
) => {
    const eventChangeExercise = new Event('change-exercise');
    const [exercises, setExercise] = useState<any[]>([]);
    const [fields, setFields] = useState<any[]>(initFields);

    /**
     * Добавление окна настроек
     * @param setting
     */
    const addExercise = async (setting: any) => {
        await setExercise([
            ...exercises,
            setting
        ]);
        if (exercises.length === 2 || exercises.length === 4 || exercises.length === 6)
            window.dispatchEvent(eventChangeExercise);
    };

    /**
     * Добавление окна настроек
     * @param setting
     * @param key
     */
    const editExercise = async (setting: any, key: number) => {
        setExercise(prevState => {
            prevState[key] = setting;
            return [...prevState];
        });
        window.dispatchEvent(eventChangeExercise);
    };

    /**
     * Удаление окна настроек
     * @param keyId
     */
    const deleteExercise = async (keyId: number) => {
        await setExercise(exercises.filter((item: any, key: number) => key !== keyId));
        if (exercises.length === 3 || exercises.length === 5 || exercises.length === 7)
            window.dispatchEvent(eventChangeExercise);
    };

    /**
     * Запуск уражнения
     *
     * @param setting
     */
    const handlerStart = async (setting: any) => {
        if (exercises.length > 1)
            await startApplication({...setting, windows: exercises});
        else {
            Modal.warning({
                title: 'Добавьте участников!',
                content: 'Минимум два участника должно быть для старта упражнения.',
            });
            throw new Error();
        }
    };

    /**
     * Очистка настроек
     */
    const clearExercise = () => {
        setExercise([]);
        setFields(initFields);
        clearSaveSetting();
    };

    /**
     * Обновление настроек
     *
     * @param changedFields
     * @param allFields
     */
    const handlerChangeHeader = (changedFields: any[], allFields: any[]) =>
        setFields(allFields);

    useEffect(() => {
        try {
            if (userSetting?.mode) {
                setFields([
                    {name: ['mode'], value: userSetting.mode},
                    {name: ['group'], value: userSetting.group},
                ]);
                setExercise(userSetting.windows || []);
            }
        } catch (e) {

        }
    }, [userSetting]);

    return <Wrapper>
        <HeaderBlock
            initialValues={userSetting}
            fields={fields}
            isMaxStudent={exercises.length >= 8}
            isDisabledMode={!!exercises.length}
            addExercise={addExercise}
            onChange={handlerChangeHeader}
            handlerStart={handlerStart}
            clearExercise={clearExercise}
        />
        <MultiGridLayout
            height="calc(100% - 65px)"
            length={exercises.length}
        >
            {exercises.length ?
                exercises.map((exercise: any, key: number) =>
                    <ExerciseSetting
                        key={key}
                        keyId={key}
                        editExercise={editExercise}
                        setting={exercise}
                        deleteExercise={deleteExercise}
                    />
                ) :
                <InformationBlock/>
            }
        </MultiGridLayout>
    </Wrapper>;
};

export default MultiAnzan;