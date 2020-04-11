import React, {useCallback} from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import {Button, message} from "antd";
import usingModalEditor from "../../../../../../layouts/modal-editor/usingModalEditor";
import SaveHomeworkItems from "./SaveHomeworkItems";
import {useSelector} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";

const SaveButtonHandler = usingModalEditor(SaveHomeworkItems);

interface ButtonSaveHomeworkProps {
    homework?: any;
    exercises: any;
    disciplineId: any;
}

const ButtonSaveHomework: React.FC<ButtonSaveHomeworkProps & RouteComponentProps> = ({history, homework, exercises, disciplineId}) => {
    const {app, api} = useSelector((state: any) => state);

    const afterSaveHomework = useCallback(() => {
        history.push(app.dataForSending.isSaved ? `/groups/${app.dataForSending.groupId}` : '/homework');
    }, [history, app.dataForSending.isSaved, app.dataForSending.groupId]);

    const saveHomework = async (data: any) => {
        try {
            if (homework) {
                const response = await api.user_general.put(`teacher/homework/${homework.id}`, {
                    ...data,
                    discipline: disciplineId,
                    exercises
                });
                if (response.data.status === 'success') {
                    message.success("Вы успешно изменили домашнее задание!");
                }
            } else {
                const response = await api.user_general.post('teacher/homework', {
                    ...data,
                    discipline: disciplineId,
                    exercises
                });
                if (response.data.status === 'success') {
                    message.success("Вы успешно создали домашнее задание!");
                }
            }
        } catch (e) {
            message.error("Неизвестная ошибка!");
            console.log(e);
        }
    };

    return (
        <SaveButtonHandler
            title="Сохранить"
            fetch={afterSaveHomework}
            width={550}
            sendData={saveHomework}
            disciplineId={disciplineId}
            data={homework ? {
                level: homework.level,
                category: homework.category_id,
                description: homework.description,
            } : {}
            }
        >
            <Button type="primary" icon={<ArrowRightOutlined />} block>Далее</Button>
        </SaveButtonHandler>
    );
};

export default withRouter(ButtonSaveHomework);