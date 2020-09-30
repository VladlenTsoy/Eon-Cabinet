import React from 'react';
import BlockButton from "./block/BlockButton";
import TagNotifyButton from "./tag-notify/TagNotifyButton";
import UnblockButton from "./unblock/UnblockButton";
import Edit from "./edit/Edit";
import {Student} from "../../../../../../../../../../../lib/types/teacher/Student";
import DeleteButton from "./delete/DeleteButton"
import HomeworkButton from "../../../../homework/HomeworkButton"

interface ActionColumnProps {
    student: Student;
    fetch: () => void;
}

const ActionColumn: React.FC<ActionColumnProps> = ({student, fetch}) => {
    return <>
        <Edit student={student}/>
        <HomeworkButton studentId={student.id}/>
        {
            student.is_blocked ?
                student.day_block && student.day_block > 0 ?
                    <TagNotifyButton student={student}/> :
                    <UnblockButton student={student} fetch={fetch}/> :
                <BlockButton student={student} fetch={fetch}/>
        }
        <DeleteButton student={student} fetch={fetch}/>
    </>;
};

export default ActionColumn;