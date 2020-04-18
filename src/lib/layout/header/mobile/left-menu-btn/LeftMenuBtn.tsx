import React from 'react';
import {ArrowLeftOutlined, StopOutlined, BarsOutlined, CloseOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import {Modal} from "antd";
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
            icon: <QuestionCircleOutlined/>,
            title: 'Остановить выполнения задания?',
            onOk: () => history.goBack(),
        });

    const buttonNavbar = () => {
        if (app.action === 'back')
            return <ArrowLeftOutlined/>;
        else if (app.action === 'cancel')
            return <StopOutlined/>;
        else if (app.action === null) {
            if (collapsed)
                return <BarsOutlined/>;
            else
                return <CloseOutlined/>;
        } else
            return <ArrowLeftOutlined/>;
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

    return <div
        style={{display: "flex"}}
        onClick={actionButtonNavbar}
    >
        {buttonNavbar()}
    </div>;
};

export default withRouter(LeftMenuBtn);