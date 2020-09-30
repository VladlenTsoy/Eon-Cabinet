import React, {useCallback, useState} from "react";
import {useScreenWindow} from "hooks/use-screen-window.effect";
import DrawerEditor from "lib/ui/drawer-editor/DrawerEditor";
import {useSelector} from "react-redux";
import {groupSelector} from "store/access/teacher/group/groupSlice";
import Container from "./container/Container";
import checkStudentGif from "assets/images/hints/check-student.gif";
import {Modal} from "antd";
import {useParams} from "react-router-dom";
import {ParamsProps} from "../../../Group";
import {useSelectSelectedStudentsByIdsGroupId} from "store/access/teacher/students/studentsSelectors";
import {Button} from "../../../../../../../../../lib/ui"
import {SendOutlined} from "@ant-design/icons"

const SentHomeworkStudentButton: React.FC = () => {
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
        <Button type="second" size="large" icon={<SendOutlined />} onClick={selectedIds.length ? open : disabledHandler}>
            Отправить домашнее задание
        </Button>
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