import React, {useState} from 'react';
import { EyeOutlined } from '@ant-design/icons';
import {Button} from "antd";
import RequestTable from "./request-table/RequestTable";
import {Drawer} from "lib";
import {useScreenWindow} from "../../../../../../../../hooks/use-screen-window.effect";

interface RequestsStudentsButtonProps {
    olympiad: any;
    fetch: any;
}

const RequestsStudentsButton: React.FC<RequestsStudentsButtonProps> = ({olympiad, fetch}) => {
    const [isChange, setIsChange] = useState(false);
    const [visible, setVisible] = useState(false);
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'md'});

    const close = () => {
        if (isChange)
            fetch();
        setIsChange(false);
        setVisible(false);
    };
    const open = () => setVisible(true);

    return <>
        <Button icon={<EyeOutlined />} onClick={open} size="large">Посмотреть</Button>
        <Drawer
            width={isBreakpoint ? '100%' : 750}
            notFooter={true}
            title="Запросы на участие от учеников"
            onClose={close}
            visible={visible}
        >
            <RequestTable olympiad={olympiad} setIsChange={setIsChange}/>
        </Drawer>
    </>;
};

export default RequestsStudentsButton;