import React from 'react';
import {useSelector} from "react-redux";
import SaveOlympiadItems from "./items/SaveOlympiadItems";
import { EditOutlined, FlagOutlined } from '@ant-design/icons';
import {Button, message} from "antd";
import usingDrawerEditor from "../../../../../../../../layouts/drawer-editor/usingDrawerEditor";
import {RouteComponentProps, withRouter} from "react-router";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

const SaveButtonHandler = usingDrawerEditor(SaveOlympiadItems);

interface ButtonSaveOlympiadProps {
    olympiad?: any;
    steps?: any;
    exercises?: any;
    disciplineId?: any;
    fetch?: () => void;
}

const ButtonSaveOlympiad: React.FC<ButtonSaveOlympiadProps & RouteComponentProps> = (
    {
        history,
        steps,
        olympiad,
        fetch,
        exercises,
        disciplineId
    }
) => {
    const {api} = useSelector((state: any) => state);
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const saveOlympiad = async (data: any) => {
        try {
            if (olympiad) {
                const response = await api.user_general.patch(`teacher/olympiad/${olympiad.id}`, data);
                if (response.data.status === 'success') {
                    message.success("Вы успешно изменили олимпиаду!");
                    if (fetch)
                        fetch();
                }
            } else {
                const response = await api.user_general.post('teacher/olympiad', {
                    ...data,
                    discipline: disciplineId,
                    exercises,
                    steps,
                });
                if (response.data.status === 'success') {
                    message.success("Вы успешно создали олимпиаду!");
                    history.push('/olympiad');
                }
            }
        } catch (e) {
            message.error("Неизвестная ошибка!");
            console.log(e);
        }
    };

    const afterSaveOlympiad = () => {

    };

    return (
        <SaveButtonHandler
            title={olympiad ? 'Редактировать олимпиаду' : 'Сохранить олимпиаду'}
            fetch={afterSaveOlympiad}
            width={breakpoint ? '100%' : 550}
            sendData={saveOlympiad}
            data={olympiad ?
                {
                    title: olympiad.title,
                    description: olympiad.description,
                    access: olympiad.access,
                } : {}
            }
        >
            {
                olympiad ?
                    <Button icon={<EditOutlined />}>Изменить</Button> :
                    <Button icon={<FlagOutlined />} block>Завершить</Button>
            }
        </SaveButtonHandler>
    );
};

export default withRouter(ButtonSaveOlympiad);