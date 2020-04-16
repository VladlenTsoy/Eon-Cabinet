import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useApiUserGeneral} from "effects/use-api-user-general.effect";
import {appChangeDataForSending} from "store/app/actions";
import {FormItem, Spin} from "layouts/components";
import {Button, Divider, Input, Select, Empty} from "antd";
import moment from "moment";
import ExercisesEmpty from "./empty/Empty";
import {FileAddOutlined} from "@ant-design/icons";

const {TextArea} = Input;

type SentCustomExercisesItemsProps = {
    group_id: number;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const SentCustomExercisesItems: React.FC<SentCustomExercisesItemsProps> = (
    {
        group_id,
        setIsSaveBtn
    }
) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectExercises, setSelectExercises]: any = useState(null);
    const [loading, exercises] = useApiUserGeneral({url: `/teacher/custom-exercises/group/${group_id}`, initValue: []});

    const handlerChange = (id: number) =>
        setSelectExercises(exercises.find((val: any) => val.id === id));

    const createCustomExercisesHandler = async () => {
        await dispatch(appChangeDataForSending({isVisibleCustomExercises: true}));
        history.push('/settings/custom-exercises/create');
    };

    useEffect(() => {
        if (exercises.length)
            setIsSaveBtn(true);

        dispatch(appChangeDataForSending({isVisibleCustomExercises: false}));

    }, [exercises, setIsSaveBtn]);

    if (!loading && !exercises.length)
        return <ExercisesEmpty/>;


    return <Spin
        tip="Загрузка..."
        spinning={loading}
    >
        <Button block icon={<FileAddOutlined/>} size="large" type="link" onClick={createCustomExercisesHandler}>
            Создать свои примеры
        </Button>
        <FormItem
            name="custom-exercises"
            label="Уровень"
            requiredMsg="Выберите уровень!"
        >
            <Select loading={loading} onChange={handlerChange}>
                {exercises.map((exercise: any, key: number) =>
                    <Select.Option value={exercise.id} key={key}>
                        {moment(exercise.created_at).format('DD/MM/YYYY')} - Уровень #{exercise.level}
                    </Select.Option>
                )}
            </Select>
        </FormItem>
        {
            !loading && selectExercises ?
                <>
                    {selectExercises.description}
                    <Divider/>
                    <FormItem
                        name="message"
                        label="Сообщение"
                    >
                        <TextArea rows={4}
                                  placeholder="Данное сообщение будет отображаться перед выполнением домашнего задания."/>
                    </FormItem>
                </> :
                <Empty
                    description="Выберите уровень для дальнейших действий"
                />
        }
    </Spin>;
};

export default SentCustomExercisesItems;