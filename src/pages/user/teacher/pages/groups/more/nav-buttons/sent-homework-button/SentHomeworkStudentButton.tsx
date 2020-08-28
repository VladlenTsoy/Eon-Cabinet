import React, {useCallback, useState} from "react";
import {useScreenWindow} from "hooks/use-screen-window.effect";
import DrawerEditor from "../../../../../../../../lib/ui/drawer-editor/DrawerEditor";
import {useSelector} from "react-redux";
import {groupSelector} from "../../../../../../../../store/access/teacher/group/groupSlice";
import Container from "./container/Container";
import checkStudentGif from "assets/images/hints/check-student.gif";
import {Modal} from "antd";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "../../../../../../../../store/access/teacher/students/studentsSelectors";

const SentHomeworkStudentButton: React.FC = ({children}) => {
    const {id} = useParams<ParamsProps>();
    const {isSaved} = useSelector(groupSelector);
    const selectedIds = useSelectSelectedStudentsByIdsGroupId(Number(id))
    const [visible, setVisible] = useState(isSaved);
    const [, breakpoint] = useScreenWindow({breakpoint: 'sm'});

    const open = () => setVisible(true);
    const close = useCallback(() => setVisible(false), []);

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
            <Container close={close}/>
        </DrawerEditor>
    </>
};

export default SentHomeworkStudentButton;