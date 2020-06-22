import React, {useState} from "react";
import {Drawer} from "../../../../../../../../../../../lib";
import MoreHomeworkItem from "./MoreHomeworkItem";
import {useScreenWindow} from "../../../../../../../../../../../hooks/use-screen-window.effect";
import {HomeworkProps} from "../../../../../../../../../../../store/reducers/teacher/homework/homeworkSlice";

interface MoreHomeworkDrawerProps {
    homework: HomeworkProps;
}

const MoreHomeworkDrawer: React.FC<MoreHomeworkDrawerProps> = ({homework, children}) => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const onClose = () => setVisible(false);
    const handler = () => setVisible(true);

    return <>
        <div onClick={handler}>
            {children}
        </div>
        <Drawer
            title={`Домашнее задание. Уровень №${homework.level}`}
            placement="right"
            width={isBreakpoint ? '100%' : 450}
            notFooter={true}
            onClose={onClose}
            visible={visible}
        >
            <MoreHomeworkItem homework={homework}/>
        </Drawer>
    </>;
};

export default MoreHomeworkDrawer;