import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import TaskLayout from "../../layouts/task/Task.layout";
import IntermediateBlock from "../anzan/intermediate/Intermediate";
import ResultBlock from "../anzan/result/Result";

const MultiAnzan: React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        intermediate={<IntermediateBlock/>}
        result={<ResultBlock/>}
    />;
};

export default MultiAnzan;