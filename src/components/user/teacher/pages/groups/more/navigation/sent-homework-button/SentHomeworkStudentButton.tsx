import React, {useCallback} from "react";
import {SendOutlined} from "@ant-design/icons";
import {NavigationButton} from "lib";
import usingDrawerEditor from "layouts/drawer-editor/usingDrawerEditor";
import FormSentHomeworkItems from "./form-items/FormSentHomeworkItems";
import checkStudentGif from "assets/images/hints/check-student.gif";
import {useDispatch} from "react-redux";
import {message, Modal} from "antd";
import {useScreenWindow} from "effects/use-screen-window.effect";
import {changeIsSaved} from "store/reducers/teacher/group/groupSlice";
import {useAppContext} from "../../../../../../../../store/context/use-app-context";

const SentDrawerButton = usingDrawerEditor(FormSentHomeworkItems);

interface SentHomeworkStudentButtonProps {
    selectUsersId: any;
    group_id: string;
    fetch: any;
    isVisible?: boolean;
}

const SentHomeworkStudentButton: React.FC<SentHomeworkStudentButtonProps> = (
    {
        selectUsersId,
        group_id,
        fetch,
        isVisible
    }
) => {
    const {api} = useAppContext();
    const dispatch = useDispatch();
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const sendHomework = useCallback(async (data: any) => {
        try {
            const response = await api.user.post(`teacher/homework/send`, {
                ...data,
                userIds: selectUsersId
            });
            if (response.data.status === 'success') {
                dispatch(changeIsSaved(false));
                fetch();
                message.success('Вы успешно отправили домашнее задание!');
            }
        } catch (e) {
            message.error('Неизвестная ошибка!');
        }
    }, [selectUsersId, fetch, dispatch, api.user]);

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
            return <SentDrawerButton
                title="Отправить домашнее задание"
                isVisible={isVisible}
                fetch={() => null}
                sendData={sendHomework}
                group_id={group_id}
                width={breakpoint ? '100%' : 560}
            >
                {button}
            </SentDrawerButton>;

        return <span onClick={disabledHandler}>
                {button}
            </span>;
    };

    return <>
        {buttonWrapper(
            <NavigationButton type="primary" icon={<SendOutlined/>}>
                Отправить домашнее задание
            </NavigationButton>
        )}
    </>
};

export default SentHomeworkStudentButton;