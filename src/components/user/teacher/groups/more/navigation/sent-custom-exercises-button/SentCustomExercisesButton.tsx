import React, {useCallback} from 'react';
import {NavigationButton} from "../../../../../../../layouts/components";
import {SendOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {useScreenWindow} from "../../../../../../../effects/use-screen-window.effect";
import {appChangeDataForSending} from "../../../../../../../store/app/actions";
import {message, Modal} from "antd";
import checkStudentGif from "../../../../../../../assets/images/hints/check-student.gif";
import usingDrawerEditor from "../../../../../../../layouts/drawer-editor/usingDrawerEditor";
import SentCustomExercisesItems from "./form-items/SentCustomExercisesItems";

const DrawerButton = usingDrawerEditor(SentCustomExercisesItems);

interface SentCustomExercisesButtonProps {
    selectUsersId: any;
    group_id: string;
    fetch: any;
    isVisible?: boolean;
}

const SentCustomExercisesButton: React.FC<SentCustomExercisesButtonProps> = (
    {
        selectUsersId,
        group_id,
        fetch,
        isVisible
    }
) => {
    const {api} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const sendHomework = useCallback(async (data: any) => {
        try {
            const response = await api.user_general.post(`teacher/custom-exercises/send`, {
                ...data,
                userIds: selectUsersId
            });
            if (response.data.status === 'success') {
                dispatch(appChangeDataForSending({
                    isVisibleCustomExercises: false,
                }));
                fetch();
                message.success('Вы успешно отправили домашнее задание!');
            }
        } catch (e) {
            message.error('Неизвестная ошибка!');
        }
    }, [selectUsersId, fetch, dispatch, api.user_general]);

    const disabledHandler = () => {
        Modal.info({
            title: 'Выберите учеников!',
            content: <>
                <p>Отметьте учеников в списке для отправки домашнего задания.</p>
                <img src={checkStudentGif} alt="Выберите учеников!" width="100%"/>
            </>
        });
    };

    const buttonWrapper = (button: any) => {
        if (selectUsersId.length)
            return <DrawerButton
                title="Отправить свои примеры"
                isVisible={isVisible}
                fetch={() => null}
                sendData={sendHomework}
                group_id={group_id}
                width={breakpoint ? '100%' : 560}
            >
                {button}
            </DrawerButton>;

        return <span onClick={disabledHandler}>
                {button}
            </span>;
    };

    return <>
        {buttonWrapper(
            <NavigationButton type="primary" icon={<SendOutlined/>}>
                Отправить свои примеры
            </NavigationButton>
        )}
    </>;
};

export default SentCustomExercisesButton;