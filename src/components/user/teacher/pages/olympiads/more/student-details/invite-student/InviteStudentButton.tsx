import React, {useState} from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import {Button} from "antd";
import {Drawer} from "../../../../../../../../lib";
import InviteTable from "./invite-table/InviteTable";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

interface InviteStudentButtonProps {
    olympiad: any;
    fetch: any;
}

const InviteStudentButton: React.FC<InviteStudentButtonProps> = ({olympiad, fetch}) => {
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const close = () => setVisible(false);
    const open = () => setVisible(true);

    return <>
        <Button
            icon={<UserAddOutlined />}
            size="large"
            onClick={open}>
            Пригласить ученика
        </Button>
        <Drawer
            width={isBreakpoint ? '100%' : 750}
            notFooter={true}
            title="Пригласить ученика"
            onClose={close}
            visible={visible}
        >
            <InviteTable olympiad={olympiad} fetch={fetch}/>
        </Drawer>
    </>;
};

export default InviteStudentButton;