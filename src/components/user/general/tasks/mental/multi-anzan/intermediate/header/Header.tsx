import React from 'react';
import styled from "styled-components";
import {ArrowRightOutlined, FlagOutlined, HistoryOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {
    gameChangeCurrentTimes,
    gameChangeExecutionMode,
    gameChangeStatus
} from "../../../../../../../../store/reducers/common/game/actions";
import {useDispatch, useSelector} from "react-redux";
import {game} from "../../../../../../../../store/reducers/common/game/reducer";
import {settingAnzan} from "../../../../../../../../store/reducers/common/tasks/setting/reducer";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme['@background-color-base']};
`;

interface HeaderProps {

}

const Header: React.FC<HeaderProps> = () => {
    const {currentTimes} = useSelector(game);
    const setting = useSelector(settingAnzan);
    const dispatch = useDispatch();
    const times = setting.windows.reduce((arr: number, val: any) => arr < val.times ? val.times : arr, 0);

    const repeatExercise = () => {
        dispatch(gameChangeExecutionMode('repeat'));
        dispatch(gameChangeStatus('start'));
    };

    const nextExercise = () => {
        dispatch(gameChangeStatus('start'));
        dispatch(gameChangeCurrentTimes(currentTimes + 1));
    };

    const completionTask = () => dispatch(gameChangeStatus('result'));

    return <HeaderWrapper>
        <Button
            icon={<HistoryOutlined/>}
            size="large"
            onClick={repeatExercise}
        >
            Повторить текущие примеры
        </Button>
        {currentTimes + 1 >= times ?
            <Button
                type="primary"
                size="large"
                icon={<FlagOutlined/>}
                autoFocus
                onClick={completionTask}
            >
                Завершить
            </Button> :
            <Button
                type="primary"
                size="large"
                autoFocus
                onClick={nextExercise}
            >
                <ArrowRightOutlined/>
                Следующее
            </Button>
        }
    </HeaderWrapper>;
};

export default Header;