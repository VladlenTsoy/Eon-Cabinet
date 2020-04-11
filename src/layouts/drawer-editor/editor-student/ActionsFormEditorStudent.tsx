import React, {useState} from "react";
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { SaveOutlined } from '@ant-design/icons';
import {Button, message} from "antd";
import {useSelector} from "react-redux";
import {DrawerActions} from "../../components";

interface ActionsFromEditorStudentProps {
    close: any;
    user: any;
}

const ActionsFromEditorStudent: React.FC<FormComponentProps & ActionsFromEditorStudentProps> = ({form, close, user}) => {
    const {api} = useSelector((state: any) => state);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        form.validateFields(async (err, values) => {
            setLoading(true);
            if (!err) {
                try {
                    if (user) {
                        await api.user_general.post(`teacher/student/${user.id}`, values);
                        message.success("Вы успешно создали учителя!");
                    } else {
                        await api.user_general.post(`teacher/student`, values);
                        message.success("Вы успешно создали учителя!");
                    }
                    form.resetFields();
                    close(null, true);
                } catch (e) {
                    message.error(e.response.data.message);
                }
            }
            setLoading(false);
        });
    };

    return (
        <DrawerActions>
            <Button onClick={close} style={{marginRight: 8}}>
                Отмена
            </Button>
            <Button
                htmlType="submit"
                onClick={handleSubmit}
                loading={loading}
                type="primary"
                icon={<SaveOutlined />}
                form="FormEditorStudent">
                Сохранить
            </Button>
        </DrawerActions>
    );
};

export default ActionsFromEditorStudent;