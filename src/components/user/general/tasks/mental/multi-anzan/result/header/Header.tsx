import React from 'react';
import {FlagOutlined, HistoryOutlined, ReloadOutlined} from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {
    gameChangeCurrentTimes,
    gameChangeExecutionMode, gameChangeStats,
    gameChangeStatus
} from "../../../../../../../../store/game/actions";
import {totalsChange} from "../../../../../../../../store/tasks/totals/action";

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

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const back = () => history.goBack();
    const again = () => {
        dispatch(gameChangeCurrentTimes(0));
        dispatch(totalsChange([]));
        dispatch(gameChangeStats({all: 0, success: 0}));
        dispatch(gameChangeExecutionMode('first'));
        dispatch(gameChangeStatus('start'));
    };

    const repeat = () => {
        dispatch(gameChangeCurrentTimes(0));
        dispatch(gameChangeStats({all: 0, success: 0}));
        dispatch(gameChangeStatus('start'));
        dispatch(gameChangeExecutionMode('repeat'));
    };

    return <HeaderWrapper>
        <Button icon={<HistoryOutlined/>} size="large" onClick={repeat}>Повторить те же примеры</Button>
        <Button icon={<ReloadOutlined/>} onClick={again} size="large">Еще раз</Button>
        <Button type="primary" icon={<FlagOutlined/>} onClick={back} size="large">Завершить</Button>
    </HeaderWrapper>
};

export default Header;