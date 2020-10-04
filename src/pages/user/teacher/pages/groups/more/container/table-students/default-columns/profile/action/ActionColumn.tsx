import React from "react"
import BlockButton from "./block/BlockButton"
import TagNotifyButton from "./tag-notify/TagNotifyButton"
import UnblockButton from "./unblock/UnblockButton"
import Edit from "./edit/Edit"
import {Student} from "../../../../../../../../../../../lib/types/teacher/Student"
import DeleteButton from "./delete/DeleteButton"
import HomeworkButton from "../../../../homework/HomeworkButton"

interface ActionColumnProps {
    student: Student;
}

const ActionColumn: React.FC<ActionColumnProps> = ({student}) => {
    return <>
        <HomeworkButton studentId={student.id}/>
        <Edit student={student}/>
        {
            student.is_blocked ?
                student.day_block && student.day_block > 0 ?
                    <TagNotifyButton student={student}/> :
                    <UnblockButton student={student}/> :
                <BlockButton student={student}/>
        }
        <DeleteButton student={student}/>
    </>
}

export default ActionColumn