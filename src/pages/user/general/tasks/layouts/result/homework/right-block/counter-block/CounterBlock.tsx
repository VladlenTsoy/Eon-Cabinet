import React from 'react';
import {Card, GrayIcon} from "lib/ui";
import StepSuccessSVG from "assets/images/olympiad/step_success.svg";

interface CounterBlockProps {
    resultData: any;
}

const CounterBlock: React.FC<CounterBlockProps> = ({resultData}) => {
    return <Card className="info">
        <div className="title">Упражнений</div>
        <div className="container">
            <GrayIcon img={StepSuccessSVG} alt="Этап" percent={0} width={'100%'}/>
            <div className="content">
                Выполнено <span
                className="active"
            >
                {resultData.tasks_success}</span> из {resultData.tasks_all}
            </div>
        </div>
    </Card>;
};

export default CounterBlock;