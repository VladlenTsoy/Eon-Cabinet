import React from 'react';
import {ActionWrapper} from "../../../../../../../homework/more/tasks/task/action/Action";
import {useDispatch} from "react-redux";
import {FlagOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory} from "react-router";
import {changeExecutionMode, changeSetting} from "../../../../../../../../../../store/reducers/common/game/gameSplice"

type ActionProps = {
    task: any;
    type: string;
};

const Action: React.FC<ActionProps> = ({task, type}) => {
    const history = useHistory();
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
        dispatch(changeExecutionMode('fetch'));
        history.push(`/olympiads/${_task.olympiad_id}/${_task.sent_id}/${_task.id}/${_task.discipline_id}/${_task.task_id}`);
    };

    return <ActionWrapper type={type}>
        <div className="title">
            <div className="sub-title">Упражнение</div>
            <span>{task.task_name}</span>
        </div>
        {
            isSec() ?
                <div className="time"><b>Скорость:</b> {task.settings.time} сек.</div> :
                <div className="time"><b>Время:</b> {task.settings.time} мин.</div>
        }
        {
            !task.result ?
                <Button
                    type="dashed"
                    shape="round"
                    icon={<FlagOutlined/>}
                    size="large"
                    onClick={() => startApplication(task)}>
                    Начать
                </Button> :
                null
        }
    </ActionWrapper>
};

export default Action;