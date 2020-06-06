import React, {useState} from "react";
import { InfoCircleOutlined } from '@ant-design/icons';
import {Drawer} from "../../../../../../../../lib";
import MoreHomeworkItem from "./MoreHomeworkItem";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

const MoreHomeworkDrawer: React.FC<any> = ({homework}) => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const onClose = () => setVisible(false);
    const handler = () => setVisible(true);

    return <>
        <div onClick={handler}>
            <InfoCircleOutlined /> Подробнее
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