import React from 'react';
import { FlagOutlined, HistoryOutlined, ReloadOutlined } from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";
import {withRouter, RouteComponentProps} from "react-router";
import {useDispatch} from "react-redux";
import {gameChangeExecutionMode, gameChangeStatus} from "../../../../../../../../store/game/actions";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  width: 100%;
  justify-content: flex-end;
  border-bottom: 1px solid ${props => props.theme['@background-color-base']};
  
  .ant-btn:not(:last-child){
    margin-right: 1.5rem;
  }
`;

interface HeaderProps {
}

const Header: React.FC<HeaderProps & RouteComponentProps> = (
    {
        history,
    }
) => {
    const dispatch = useDispatch();

    const back = () => history.goBack();
    const again = () => dispatch(gameChangeExecutionMode('again'));
    const repeat = () => dispatch(gameChangeExecutionMode('repeat'));

    return (
        <HeaderWrapper>
            <Button icon={<HistoryOutlined />} size="large" onClick={repeat}>Повторить те же примеры</Button>
            <Button icon={<ReloadOutlined />} onClick={again} size="large">Еще раз</Button>
            <Button type="primary" icon={<FlagOutlined />} onClick={back} size="large">Завершить</Button>
        </HeaderWrapper>
    );
};

export default withRouter(Header);