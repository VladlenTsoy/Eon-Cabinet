import React from 'react';
import {Card, GrayIcon, LoadingBlock} from "lib/components";
import StepSuccessSVG from "assets/images/olympiad/step_success.svg";

interface CounterTasksProps {
    loading: boolean;
    resultData: any;
}

const CounterTasks: React.FC<CounterTasksProps> = ({loading, resultData}) => {
    return <Card className="info">
        <div className="title">Упражнений</div>
        <div className="container">
            <GrayIcon img={StepSuccessSVG} alt="Этап" percent={0} width={'100%'}/>
            {
                loading ?
                    <LoadingBlock title={null}/> :
                    <div className="content">
                        Выполнено <span
                        className="active"
                    >
                            {resultData.tasks_success}</span> из {resultData.tasks_all}
                    </div>
            }
        </div>
    </Card>;
};

export default React.memo(CounterTasks);