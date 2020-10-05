import React from "react";
import {Collapse} from "antd";
import Tasks from "./tasks/Tasks";
import Header from "./header/Header";
import {StudentHomework} from "../../../../../../../../../../../../../store/access/teacher/student-homework/studentHomeworkSlice"

const {Panel} = Collapse;

interface CollapseHomeworkProps {
    homework: StudentHomework;
}

const CollapseHomework: React.FC<CollapseHomeworkProps> = ({homework}) => {
    return <Collapse accordion style={{border: '0'}}>
        {homework.tasks.map((task: any) =>
            <Panel
                header={<Header task={task}/>}
                key={task.id}
                disabled={!task.first}>
                <Tasks task={task}/>
            </Panel>
        )}
    </Collapse>
};

export default CollapseHomework;