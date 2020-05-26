import React from 'react';
import {useSelector} from "react-redux";
import SaveOlympiadItems from "./items/SaveOlympiadItems";
import {EditOutlined, FlagOutlined} from '@ant-design/icons';
import {Button, message} from "antd";
import usingDrawerEditor from "../../../../../../../../../layouts/drawer-editor/usingDrawerEditor";
import {useHistory} from "react-router";
import {useScreenWindow} from "../../../../../../../../../effects/use-screen-window.effect";

const SaveButtonHandler = usingDrawerEditor(SaveOlympiadItems);

interface ButtonSaveOlympiadProps {
    olympiad?: any;
    steps?: any;
    exercises?: any;
    disciplineId?: any;
    fetch?: () => void;
}

const ButtonSaveOlympiad: React.FC<ButtonSaveOlympiadProps> = (
    {
        steps,
        olympiad,
        fetch,
        exercises,
        disciplineId
    }
) => {
    const history = useHistory();
    const {api} = useSelector((state: any) => state);
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const saveOlympiad = async (data: any) => {
        try {
            if (olympiad) {
                const response = await api.user.patch(`teacher/olympiad/${olympiad.id}`, data);
                if (response.data.status === 'success')
                    message.success("Вы успешно изменили олимпиаду!");
            } else {
                const response = await api.user.post('teacher/olympiad', {
                    ...data,
                    discipline: disciplineId,
                    exercises,
                    steps,
                });
                if (response.data.status === 'success') {
                    message.success("Вы успешно создали олимпиаду!");
                }
            }
        } catch (e) {
            message.error("Неизвестная ошибка!");
            console.log(e);
        }
    };

    const afterSaveOlympiad = () => {
        if (olympiad) {
            if (fetch)
                fetch();
        } else
            history.push('/olympiad');
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
                    <Button icon={<EditOutlined/>}>Изменить</Button> :
                    <Button icon={<FlagOutlined/>} block>Завершить</Button>
            }
        </SaveButtonHandler>
    );
};

export default ButtonSaveOlympiad;