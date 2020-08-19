import React from 'react';
import styled from "styled-components";
import BlockButton from "./block/BlockButton";
import TagNotifyButton from "./tag-notify/TagNotifyButton";
import UnblockButton from "./unblock/UnblockButton";
import Edit from "./edit/Edit";
import {Student} from "../../../../../../../../../../lib/types/teacher/Student";

const ActionColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  
  > a:not(:last-child), > button:not(:last-child), > span:not(:last-child){
    margin-right: 0.5rem;
  }
`;

interface ActionColumnProps {
    student: Student;
    fetch: () => void;
}

const ActionColumn: React.FC<ActionColumnProps> = ({student, fetch}) => {
    return <ActionColumnWrapper>
        <Edit student={student}/>
        {
            student.is_blocked ?
                student.day_block && student.day_block > 0 ?
                    <TagNotifyButton student={student}/> :
                    <UnblockButton student={student} fetch={fetch}/> :
                <BlockButton student={student} fetch={fetch}/>
        }
    </ActionColumnWrapper>;
};

export default ActionColumn;