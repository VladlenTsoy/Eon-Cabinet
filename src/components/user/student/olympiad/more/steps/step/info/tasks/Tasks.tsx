import React from 'react';
import StepSuccessSvg from "assets/images/olympiad/step_success.svg";
import BlockWrapper from "../layouts/block/Block";

interface TasksProps {
    step: any;
}

const Tasks:React.FC<TasksProps> = ({step}) => {
    return <BlockWrapper>
        <div className="image">
            <img src={StepSuccessSvg} alt=""/>
        </div>
        <div className="content">
            <span className="title">Заданий</span>
            <div className="counts">
                <span className="active">{step.count_success}</span>
                <span className="slash">/</span>
                {step.count_all}
            </div>
        </div>
    </BlockWrapper>;
};

export default Tasks;