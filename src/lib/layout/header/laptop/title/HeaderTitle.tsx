import React, {useEffect} from "react";
import styled from "styled-components";
import {Modal} from "antd";
import {StopOutlined, ArrowLeftOutlined, BarsOutlined, CloseOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router";
import {Titles} from './Titles';
import {QuestionCircleOutlined} from '@ant-design/icons';
import {changeTitle} from 'store/reducers/common/app/appSlice';

const confirm = Modal.confirm;

const HeaderTitleWrapper = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    background: ${props => props.theme.color_primary};
    border-radius: 0 15px 15px 0;
    padding: 0 20px;
    color: #ffffff;
    box-shadow: ${props => props.theme.shadow_primary};
    margin-right: 1rem;
    max-width: 250px;

    :hover {
      background: ${props => props.theme.color_primary};
      filter: brightness(110%);
      color: #ffffff;
    }
    
    .anticon{
      font-size: 18px;
      min-width: 18px;
      margin-right: 15px;
    }
`;

const Title = styled.div`
      font-size: 18px;
      font-weight: bolder;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
`;

const HeaderTitle: React.FC<any> = ({history, collapsed, toggleSidebar}) => {
    const {app} = useSelector((state: any) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (history.listen) {
            history.listen((location: any) => {
                if (Titles[location.pathname])
                    dispatch(changeTitle(Titles[location.pathname]))
            });

            if (Titles[history.location.pathname])
                dispatch(changeTitle(Titles[history.location.pathname]));

            return () => {
                history.listen = null;
            };
        }
    }, [history, dispatch]);

    const buttonNavbar = () => {
        if (app.action === 'back') {
            return <ArrowLeftOutlined/>;
        } else if (app.action === 'cancel') {
            return <StopOutlined/>;
        } else if (app.action === null) {
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

    const cancelTasks = () =>
        confirm({
            icon: <QuestionCircleOutlined/>,
            title: 'Остановить выполнения задания?',
            onOk: () => history.goBack(),
        });

    useEffect(() => {
        document.title = `Eon - ${app.title}`;

        return () => {
            document.title = 'Eon - программа развития интеллекта.';
        }
    }, [app.title]);

    return <HeaderTitleWrapper onClick={actionButtonNavbar}>
        {buttonNavbar()}
        <Title>{app.title}</Title>
    </HeaderTitleWrapper>
};

export default withRouter(HeaderTitle);