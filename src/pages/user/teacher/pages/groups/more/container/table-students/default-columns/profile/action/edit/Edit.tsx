import React from "react"
import EditorButton from "../../../../../../nav-buttons/editor-button/EditorButton"
import {Student} from "../../../../../../../../../../../../lib/types/teacher/Student"
import {EditFilled} from "@ant-design/icons"

interface EditProps {
    student: Student
}

const Edit: React.FC<EditProps> = ({student}) => {
    return <EditorButton title="Редактировать ученика" student={student}>
        <EditFilled/> Редактировать
    </EditorButton>
}

export default Edit