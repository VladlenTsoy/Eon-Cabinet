import React from 'react';
import Application from "./application/Application";
import Answer from "../anzan/answer/Answer";
import IntermediateBlock from "../anzan/intermediate/Intermediate";
import ResultBlock from "../anzan/result/Result";
import TaskLayout from "../../layouts/task/Task.layout";

const CustomExercises = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        intermediate={<IntermediateBlock/>}
        result={<ResultBlock/>}
    />;
};

export default CustomExercises;