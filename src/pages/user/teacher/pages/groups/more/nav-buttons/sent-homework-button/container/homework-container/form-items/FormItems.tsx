import React, {useState} from 'react';
import {DrawerActions, FormItem} from "../../../../../../../../../../../lib/ui";
import {Button, Input, Select, Form, Divider} from "antd";
import moment from "moment";
import {changeIsSaved} from "store/access/teacher/group/groupSlice";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FileAddOutlined} from '@ant-design/icons';
import Exercises from "./exercises/Exercises";
import {SaveOutlined} from "@ant-design/icons";
import {sentHomeworkStudents} from "../../../../../../../../../../../store/access/teacher/students/homework/sentHomeworkStudent";
import {ParamsProps} from "../../../../../Group";
import {fetchStudentsHomeworkDates} from "../../../../../../../../../../../store/access/teacher/students/homework/fetchStudentsHomeworkDates";
import {Homework} from "../../../../../../../../../../../lib/types/teacher/Homework";

const {TextArea} = Input;

interface FormItemsProps {
    homework: Homework[];
    close: () => void;
}

const FormItems: React.FC<FormItemsProps> = ({homework, close}) => {
    const {id} = useParams<ParamsProps>();
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectHomework, setSelectHomework]: any = useState(null);
    const [loading, setLoading] = useState(false);

    const handlerChange = (id: number) =>
        setSelectHomework(homework.find((_homework) => _homework.id === id));

    const createHomeworkHandler = async () => {
        dispatch(changeIsSaved(true));
        history.push('/homework/create');
    };

    const onFinishHandler = async (values: any) => {
        setLoading(true);
        await dispatch(sentHomeworkStudents(values))
        await dispatch(fetchStudentsHomeworkDates({groupId: Number(id), force: true}));

        close();
        setLoading(false);
    }

    return <>
        <Button block icon={<FileAddOutlined/>} size="large" type="link" onClick={createHomeworkHandler}>
            Создать домашнее задание
        </Button>
        <Form layout="vertical" onFinish={onFinishHandler} id="form-sent-homework">
            <FormItem
                name="homework"
                label="Уровень"
                requiredMsg="Выберите уровень!"
            >
                <Select onChange={handlerChange}>
                    {homework.map((val: any, key: number) =>
                        <Select.Option value={val.id} key={key}>
                            Уровень {val.level} ({moment(val.created_at).format('DD/MM/YYYY')})
                        </Select.Option>
                    )}
                </Select>
            </FormItem>
            {selectHomework && selectHomework?.description}
            <Divider/>
            <FormItem name="message" label="Сообщение">
                <TextArea rows={4}
                          placeholder="Данное сообщение будет отображаться перед выполнением домашнего задания."/>
            </FormItem>
        </Form>
        <Exercises homeworkId={selectHomework?.id}/>
        <DrawerActions>
            <Button onClick={close} style={{marginRight: 8}}>
                Отмена
            </Button>
            <Button
                form="form-sent-homework"
                htmlType="submit"
                loading={loading}
                type="primary"
                icon={<SaveOutlined/>}
            >
                Сохранить
            </Button>
        </DrawerActions>
    </>;
};

export default FormItems;