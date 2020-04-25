import React from 'react';
import Application from "./application/Application";
import Answer from "../anzan/answer/Answer";
import IntermediateBlock from "./intermediate/Intermediate";
import TaskLayout from "../../layouts/task/Task.layout";
import ResultBlock from "../anzan/result/Result";

const SpecialAnzan: React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        intermediate={<IntermediateBlock/>}
        result={<ResultBlock/>}
    />;
};

export default SpecialAnzan;