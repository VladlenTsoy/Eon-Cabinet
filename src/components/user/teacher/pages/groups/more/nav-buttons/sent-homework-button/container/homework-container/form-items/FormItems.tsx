import React, {useState} from 'react';
import {HomeworkProps} from "../../../../../../../../../../../store/reducers/teacher/homework/homeworkSlice";
import {FormItem} from "../../../../../../../../../../../lib";
import {Button, Input, Select, Form, Divider, Empty} from "antd";
import moment from "moment";
import {changeIsSaved} from "store/reducers/teacher/group/groupSlice";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {FileAddOutlined} from '@ant-design/icons';
import Tasks from "./tasks/Tasks";

const {TextArea} = Input;

interface FormItemsProps {
    homework: HomeworkProps[];
}

const FormItems: React.FC<FormItemsProps> = ({homework}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [selectHomework, setSelectHomework]: any = useState(null);

    const handlerChange = (id: number) =>
        setSelectHomework(homework.find((_homework) => _homework.id === id));

    const createHomeworkHandler = async () => {
        dispatch(changeIsSaved(true));
        history.push('/homework/create');
    };

    return <>
        <Button block icon={<FileAddOutlined/>} size="large" type="link" onClick={createHomeworkHandler}>
            Создать домашнее задание
        </Button>
        <Form layout="vertical">
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
            <FormItem
                name="message"
                label="Сообщение"
            >
                <TextArea rows={4}
                          placeholder="Данное сообщение будет отображаться перед выполнением домашнего задания."/>
            </FormItem>
        </Form>
        {selectHomework?.id ?
            <Tasks homeworkId={selectHomework.id} key={selectHomework.id}/> :
            <Empty description="Выберите уровень домашнего задания"/>
        }
    </>;
};

export default FormItems;