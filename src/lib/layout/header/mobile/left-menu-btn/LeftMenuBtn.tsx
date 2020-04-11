import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Modal } from "antd";
import {useSelector} from "react-redux";
import {withRouter, RouteComponentProps} from "react-router";

const confirm = Modal.confirm;

type LeftMenuBtnProps = RouteComponentProps & {
    collapsed: boolean;
    toggleSidebar: () => void;
}

const LeftMenuBtn: React.FC<LeftMenuBtnProps> = (
    {
        toggleSidebar,
        collapsed,
        history
    }
) => {
    const {app} = useSelector((state: any) => state);

    const cancelTasks = () =>
        confirm({
            title: 'Остановить выполнения задания?',
            onOk: () => history.goBack(),
        });

    const buttonNavbar = () => {
        if (app.action === 'back')
            return "arrow-left";
        else if (app.action === 'cancel')
            return "stop";
        else if (app.action === null) {
            if (collapsed)
                return "bars";
            else
                return "close";
        } else
            return "arrow-left";
    };

    const actionButtonNavbar = () => {
        if (app.action === 'back')
            return history.goBack();
        else if (app.action === 'cancel')
            return cancelTasks();
        else if (app.action === null)
            return toggleSidebar();
        else
            return history.push(app.action);
    };

    return (
        <LegacyIcon
            type={buttonNavbar()}
            onClick={actionButtonNavbar}
        />
    );
};

export default withRouter(LeftMenuBtn);