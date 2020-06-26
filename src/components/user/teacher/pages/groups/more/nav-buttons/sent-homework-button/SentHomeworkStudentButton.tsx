import React, {useCallback, useState} from "react";
import {useScreenWindow} from "hooks/use-screen-window.effect";
import DrawerEditor from "../../../../../../../../layouts/drawer-editor/DrawerEditor";
import {useSelector} from "react-redux";
import {groupSelector} from "../../../../../../../../store/reducers/teacher/group/groupSlice";
import Container from "./container/Container";
import checkStudentGif from "assets/images/hints/check-student.gif";
import {Modal} from "antd";
import {studentsSelector} from "../../../../../../../../store/reducers/teacher/students/studentsSlice";

const SentHomeworkStudentButton: React.FC = ({children}) => {
    const {isSaved} = useSelector(groupSelector);
    const {selectedIds} = useSelector(studentsSelector);
    const [visible, setVisible] = useState(isSaved);
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = useCallback(() => setVisible(false), []);

    // const {api} = useAppContext();
    // const dispatch = useDispatch();
    //
    // const sendHomework = useCallback(async (data: any) => {
    //     try {
    //         const response = await api.user.post(`teacher/homework/send`, {
    //             ...data,
    //             userIds: selectUsersId
    //         });
    //         if (response.data.status === 'success') {
    //             dispatch(changeIsSaved(false));
    //             fetch();
    //             message.success('Вы успешно отправили домашнее задание!');
    //         }
    //     } catch (e) {
    //         message.error('Неизвестная ошибка!');
    //     }
    // }, [selectUsersId, fetch, dispatch, api.user]);
    //
    const disabledHandler = () => {
        Modal.info({
            title: 'Выберите учеников!',
            content: <>
                <p>Отметьте учеников в списке для отправки домашнего задания.</p>
                <img src={checkStudentGif} alt="Выберите учеников!" width="100%"/>
            </>
        });
    };

    return <>
        <span onClick={selectedIds.length ? open : disabledHandler}>
            {children}
        </span>
        <DrawerEditor
            visible={visible}
            close={close}
            title="Отправить домашнее задание"
            width={breakpoint ? '100%' : 650}
        >
            <Container/>
        </DrawerEditor>
    </>
};

export default SentHomeworkStudentButton;