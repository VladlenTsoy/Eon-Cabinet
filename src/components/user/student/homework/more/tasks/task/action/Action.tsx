import React from 'react';
import {FlagOutlined, RedoOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {changeExecutionMode, changeTotals, changeSetting} from "store/reducers/common/game/gameSplice";
import {withRouter, RouteComponentProps} from "react-router";
import styled from "styled-components";

export const ActionWrapper = styled.div<any>`
  display: grid;
  align-items: center;
  grid-gap: 0.5rem 0;

  .title{
    span{
      font-size: 1.5rem;
      font-weight: bolder;
      margin: 0;
      color: ${(props: any) => props.type === 'default' ? 'inherit' : '#fff'};
    }

    .sub-title{
      color: ${(props: any) => props.type === 'default' ? props.theme.color_second : 'rgba(255, 255, 255, 0.65)'};
    }
  }
  
  .time{
    color: ${(props: any) => props.type === 'default' ? props.theme.color_main : '#fff'};
    
    b{
      color: ${(props: any) => props.type === 'default' ? props.theme.color_second : 'rgba(255, 255, 255, 0.65)'};
    }
  }
`;

type Action = RouteComponentProps & {
    id: string;
    task: any;
    type: string;
};

const Action: React.FC<Action> = ({task, history, id, type}) => {
    const dispatch = useDispatch();

    const isSec = () => {
        switch (task.task_id) {
            case 15:
            case 8:
            case 9:
            case 10:
                return false;
            case 16:
                return task.settings['task-mode'] === 'basic';
            case 24:
                return task.settings.type_task === 'basic';
        }
        return true;
    };

    const checkTaskTypeOldTask = (_task: any) => {
        if (_task.settings?.task)
            switch (Number(_task.settings?.task)) {
                case 2:
                case 4:
                    _task.settings.anzan = 'list';
                    break;
                case 1:
                case 3:
                    _task.settings.anzan = 'basic';
                    break;
                case 5:
                    _task.settings.anzan = 'double';
                    break;
            }
        return _task;
    };

    const startApplication = (_task: any) => {
        _task = checkTaskTypeOldTask(_task);

        dispatch(changeSetting(_task.settings));
        dispatch(changeExecutionMode('first'));
        history.push(`/homework/${id}/${_task.id}/${_task.discipline_id}/${_task.task_id}`);
    };

    const startSecondApplication = (_task: any) => {
        _task = checkTaskTypeOldTask(_task);

        dispatch(changeSetting(_task.settings));
        if (Number(_task.first.view) !== 1) {
            dispatch(changeExecutionMode('repeat'));
            dispatch(changeTotals(_task.first.totals));
        }
        history.push(`/homework/${id}/${_task.id}/${_task.discipline_id}/${_task.task_id}`);
    };

    return (
        <ActionWrapper type={type}>
            <div className="title">
                <div className="sub-title">Упражнение</div>
                <span>{task.task_name}</span>
            </div>
            {isSec() ?
                <div className="time"><b>Скорость:</b> {task.settings.time} сек.</div> :
                <div className="time"><b>Время:</b> {task.settings.time} мин.</div>
            }
            {!task.first &&
            <Button
                shape="round"
                icon={<FlagOutlined/>}
                size="large"
                onClick={() => startApplication(task)}>
                Начать
            </Button>
            }
            {task.first && !task.first.exodus && !task.second &&
            <Button
                shape="round"
                icon={<RedoOutlined/>}
                type={'danger'}
                size="large"
                onClick={() => startSecondApplication(task)}>
                Повторить
            </Button>
            }
        </ActionWrapper>
    );
};

export default withRouter(Action);