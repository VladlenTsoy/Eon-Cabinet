import React from "react"
import {Collapse} from "antd"
import Tasks from "./tasks/Tasks"
import Header from "./header/Header"
import {StudentSentHomeworkTask} from "../../../../../../../../../../../../../lib/types/teacher/StudentHomework"

const {Panel} = Collapse

interface CollapseHomeworkProps {
    tasks: StudentSentHomeworkTask[]
}

const CollapseHomework: React.FC<CollapseHomeworkProps> = ({tasks}) => {
    return (
        <Collapse accordion style={{border: "0"}}>
            {tasks.map((task: any) => (
                <Panel header={<Header task={task} />} key={task.id} disabled={!task.first}>
                    <Tasks task={task} />
                </Panel>
            ))}
        </Collapse>
    )
}

export default CollapseHomework
