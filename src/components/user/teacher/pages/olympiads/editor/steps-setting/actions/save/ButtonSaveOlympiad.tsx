import React from 'react';
import SaveOlympiadItems from "./items/SaveOlympiadItems";
import {EditOutlined, FlagOutlined} from '@ant-design/icons';
import {Button} from "antd";
import usingDrawerEditor from "../../../../../../../../../layouts/drawer-editor/usingDrawerEditor";
import {useHistory} from "react-router";
import {useScreenWindow} from "../../../../../../../../../hooks/use-screen-window.effect";
import {useDispatch} from "react-redux";
import {createOlympiad} from "store/reducers/teacher/olympiad/createOlympiad";
import {updateOlympiad} from "store/reducers/teacher/olympiad/updateOlympiad";

const SaveButtonHandler = usingDrawerEditor(SaveOlympiadItems);

interface ButtonSaveOlympiadProps {
    olympiad?: any;
    steps?: any;
    exercises?: any;
    fetch?: () => void;
}

const ButtonSaveOlympiad: React.FC<ButtonSaveOlympiadProps> = (
    {
        steps,
        olympiad,
        fetch,
        exercises,
    }
) => {
    const history = useHistory();
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});
    const dispatch = useDispatch();

    const saveOlympiad = async (data: any) => {
        if (olympiad)
            await dispatch(updateOlympiad({olympiadId: olympiad.id, data}))
        else
            await dispatch(createOlympiad({...data, exercises, steps}));
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