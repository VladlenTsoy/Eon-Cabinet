import React, {useState} from 'react';
import {Button, Form, Input, Select} from "antd";
import {DrawerActions, FormItem} from "lib/ui";
import {SaveOutlined} from "@ant-design/icons";
import {updateOlympiad} from "../../../../../../../../../../store/access/teacher/olympiad/updateOlympiad";
import {createOlympiad} from "../../../../../../../../../../store/access/teacher/olympiad/createOlympiad";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";

const {TextArea} = Input;
const {Option} = Select;

interface SaveOlympiadItemsProps {
    fetch?: () => void;
    close: () => void
    olympiad?: any;
    steps?: any;
    exercises?: any;
}

const SaveOlympiadItems: React.FC<SaveOlympiadItemsProps> = ({olympiad, close, exercises ,steps, fetch}) => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const history = useHistory();

    const onFinishHandler = async (data: any) => {
        setLoading(true)
        if (olympiad)
            await dispatch(updateOlympiad({olympiadId: olympiad.id, data}))
        else
            await dispatch(createOlympiad({...data, exercises, steps}));

        if (olympiad) {
            if (fetch)
                fetch();
        } else
            history.push('/olympiad');

        setLoading(false)
        close()
    }

    return <Form
        layout="vertical"
        onFinish={onFinishHandler}
        initialValues={{
            title: olympiad.title,
            description: olympiad.description,
            access: olympiad.access,
        }}
    >
        <FormItem
            name="title"
            label="Название"
            requiredMsg="Введите название!"
        />
        <FormItem
            name="description"
            label="Описание"
            requiredMsg="Введите описание!"
        >
            <TextArea rows={4}/>
        </FormItem>
        <FormItem
            name="access"
            label="Доступ"
            requiredMsg="Выберите доступ!"
        >
            <Select>
                <Option value="public">Публичный</Option>
                <Option value="invite">По запросам</Option>
                <Option value="private">Закрытый</Option>
            </Select>
        </FormItem>
        <DrawerActions>
            <Button onClick={close} style={{marginRight: 8}}>
                Отмена
            </Button>
            <Button
                htmlType="submit"
                loading={loading}
                type="primary"
                icon={<SaveOutlined/>}
            >
                Сохранить
            </Button>
        </DrawerActions>
    </Form>;
};

export default SaveOlympiadItems;