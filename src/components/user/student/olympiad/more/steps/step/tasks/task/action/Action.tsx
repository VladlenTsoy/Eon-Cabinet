import React from 'react';
import {ActionWrapper} from "../../../../../../../homework/more/tasks/task/action/Action";
import {useDispatch} from "react-redux";
import {FlagOutlined} from '@ant-design/icons';
import {Button} from "antd";
import {useHistory} from "react-router";
import {settingChange} from "../../../../../../../../../../store/reducers/common/tasks/setting/action";

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
        }
        return true;
    };

    const startApplication = (_task: any) => {
        dispatch(settingChange(_task.settings));
        history.push(`/olympiads/${_task.sent_id}/${_task.id}/${_task.discipline_id}/${_task.task_id}`);
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