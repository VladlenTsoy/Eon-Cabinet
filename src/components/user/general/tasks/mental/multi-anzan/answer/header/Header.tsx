import React from 'react';

import {
    ArrowRightOutlined,
    EyeOutlined,
    FlagOutlined,
    HistoryOutlined,
    ReloadOutlined,
} from '@ant-design/icons';

import {Button} from "antd";
import styled from "styled-components";
import {withRouter, RouteComponentProps} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {
    clearGame,
    gameSelector,
    refreshGame
} from "../../../../../../../../store/reducers/common/game/gameSplice";

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
    isAnswersOpen: boolean;
    openAnswer: () => void;
}

const Header: React.FC<HeaderProps & RouteComponentProps> = (
    {
        history,
        isAnswersOpen,
        openAnswer,
    }
) => {
    const {setting} = useSelector(gameSelector);
    const dispatch = useDispatch();

    const back = () => history.goBack();
    const again = () => dispatch(clearGame());
    const repeat = () => dispatch(refreshGame());

    return (
        <HeaderWrapper>
            {!isAnswersOpen ?
                <>
                    {setting.group ?
                        <Button
                            icon={<EyeOutlined/>}
                            size="large"
                            onClick={openAnswer}
                        >
                            Показать ответы
                        </Button> : null}
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined/>}
                        form="form-answer"
                    >
                        Проверить ответы
                    </Button>
                </> :
                <>
                    <Button icon={<HistoryOutlined/>} size="large" onClick={repeat}>Повторить те же примеры</Button>
                    <Button icon={<ReloadOutlined/>} onClick={again} size="large">Еще раз</Button>
                    <Button type="primary" icon={<FlagOutlined/>} onClick={back} size="large">Завершить</Button>
                </>
            }

        </HeaderWrapper>
    );
};

export default withRouter(Header);