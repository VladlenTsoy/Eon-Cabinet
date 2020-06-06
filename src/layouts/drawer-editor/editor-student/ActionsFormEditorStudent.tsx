import React, {useState} from "react";
import {SaveOutlined} from '@ant-design/icons';
import {Button, message} from "antd";
import {useAppContext} from "../../../store/context/use-app-context";
import {FormInstance} from "antd/es/form";
import {DrawerActions} from "lib";

interface ActionsFromEditorStudentProps {
    form: FormInstance;
    close: any;
    user: any;
}

const ActionsFromEditorStudent: React.FC<ActionsFromEditorStudentProps> = ({form, close, user}) => {
    const {api} = useAppContext();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            if (user) {
                await api.user.post(`teacher/student/${user.id}`, values);
                message.success("Вы успешно создали учителя!");
            } else {
                await api.user.post(`teacher/student`, values);
                message.success("Вы успешно создали учителя!");
            }
            form.resetFields();
            close(null, true);
        } catch (e) {
            message.error(e.response.data.message);
            setLoading(false);
        }
    };

    return <DrawerActions>
        <Button onClick={close} style={{marginRight: 8}}>
            Отмена
        </Button>
        <Button
            htmlType="submit"
            onClick={handleSubmit}
            loading={loading}
            type="primary"
            icon={<SaveOutlined/>}
            form="FormEditorStudent">
            Сохранить
        </Button>
    </DrawerActions>;
};

export default ActionsFromEditorStudent;