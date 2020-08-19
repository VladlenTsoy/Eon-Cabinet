import React from 'react';
import EditorButton from "../../../../../nav-buttons/editor-button/EditorButton";
import {Student} from "../../../../../../../../../../../lib/types/teacher/Student";
import {EditOutlined} from '@ant-design/icons';
import {Button} from "antd";

interface EditProps {
    student: Student
}

const Edit: React.FC<EditProps> = ({student}) => {
    return <EditorButton title="Редактировать ученика" student={student}>
        <Button shape="circle" icon={<EditOutlined/>} size="large"/>
    </EditorButton>
}

export default Edit;