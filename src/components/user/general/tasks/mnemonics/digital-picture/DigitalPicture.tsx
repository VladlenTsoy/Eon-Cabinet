import React from 'react';
import Application from "./application/Application";
import Answer from "./answer/Answer";
import TaskLayout from "../../layouts/task/Task.layout";
import ResultBlock from "../personalities/result/Result";

const DigitalPicture:React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        result={<ResultBlock/>}
    />;
};

export default DigitalPicture;