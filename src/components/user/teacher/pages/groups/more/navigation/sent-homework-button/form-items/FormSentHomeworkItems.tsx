import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {LoadingBlock} from "lib";
import {FormItem, Spin} from "../../../../../../../../../layouts/components";
import { FileAddOutlined } from '@ant-design/icons';
import {Select, Divider, Input, Empty, Button} from "antd";
import ExerciseLists from "../../../../../homework/editor/tabs-tasks/added-exercises/exercise-lists/ExerciseLists";
import moment from "moment";
import {useApiUserGeneral} from "../../../../../../../../../effects/use-api-user-general.effect";
import HomeworkEmpty from "./homework-empty/HomeworkEmpty";
import {appChangeDataForSending} from "../../../../../../../../../store/reducers/common/app/actions";
import {useDispatch} from "react-redux";

const {TextArea} = Input;

type FormSentHomeworkItems = {
    group_id: number;
    setIsSaveBtn: (isSaveBtn: boolean) => void;
}

const FormSentHomeworkItems: React.FC<FormSentHomeworkItems> = (
    {
        group_id,
        setIsSaveBtn
    }
) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectHomework, setSelectHomework]: any = useState(null);
    const [loading, homework] = useApiUserGeneral({url: `/teacher/homework/group/${group_id}`, initValue: []});

    const handlerChange = (id: number) =>
        setSelectHomework(homework.find((val: any) => val.id === id));

    const createHomeworkHandler = async () => {
        await dispatch(appChangeDataForSending({isSaved: true}));
        history.push('/homework/create');
    };

    useEffect(() => {
        if (homework.length)
            setIsSaveBtn(true);

        dispatch(appChangeDataForSending({isSaved: false}));

    }, [homework, setIsSaveBtn, dispatch]);

    if (!loading && !homework.length)
        return <HomeworkEmpty/>;

    return (
        <Spin
            tip="Загрузка..."
            spinning={loading}
        >
            <Button block icon={<FileAddOutlined />} size="large" type="link" onClick={createHomeworkHandler}>
                Создать домашнее задание
            </Button>
            <FormItem
                name="homework"
                label="Уровень"
                requiredMsg="Выберите уровень!"
            >
                <Select loading={loading} onChange={handlerChange}>
                    {homework.map((val: any, key: number) =>
                        <Select.Option value={val.id} key={key}>
                            Уровень {val.level} ({moment(val.created_at).format('DD/MM/YYYY')})
                        </Select.Option>
                    )}
                </Select>
            </FormItem>
            <FormItem
                name="message"
                label="Сообщение"
            >
                <TextArea rows={4} placeholder="Данное сообщение будет отображаться перед выполнением домашнего задания."/>
            </FormItem>
            {!loading ?
                selectHomework ?
                    <>
                        {selectHomework.description}
                        <Divider/>
                        {selectHomework.tasks ? selectHomework.tasks.map((task: any, key: number) =>
                            <ExerciseLists exercise={task} key={key}/>
                        ) : null}
                    </> :
                    <Empty
                        description="Выберите уровень домашнего задания"
                    /> :
                <LoadingBlock/>}

        </Spin>
    );
};

export default FormSentHomeworkItems;