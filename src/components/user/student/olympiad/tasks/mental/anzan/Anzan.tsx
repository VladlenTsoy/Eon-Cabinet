import React from "react";
import Application from "../../../../../general/tasks/mental/anzan/application/Application";
import Answer from "../../../../../general/tasks/mental/anzan/answer/Answer";
import IntermediateBlock from "../../../../../general/tasks/mental/anzan/intermediate/Intermediate";
import ResultBlock from "../../../../../general/tasks/mental/anzan/result/Result";
import TaskLayout from "../../layouts/Task.layout";

const Anzan: React.FC = () => {
    return <TaskLayout
        start={<Application/>}
        answer={<Answer/>}
        intermediate={<IntermediateBlock/>}
        result={<ResultBlock/>}
    />
};

export default Anzan;