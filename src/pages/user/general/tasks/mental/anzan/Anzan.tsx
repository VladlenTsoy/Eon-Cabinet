import React from 'react';
import Answer from "./answer/Answer";
import IntermediateBlock from "./intermediate/Intermediate";
import ResultBlock from "./result/Result";
import Application from "./application/Application";
import TaskLayout from "../../layouts/task/Task.layout";

const Anzan: React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        intermediate={<IntermediateBlock/>}
        result={<ResultBlock/>}
    />;
};

export default Anzan;