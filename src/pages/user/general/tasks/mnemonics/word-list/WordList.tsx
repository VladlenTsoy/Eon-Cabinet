import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import ResultBlock from "./result/Result";
import TaskLayout from "../../layouts/task/Task.layout";

const WordList: React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        result={<ResultBlock/>}
    />;
};

export default WordList;