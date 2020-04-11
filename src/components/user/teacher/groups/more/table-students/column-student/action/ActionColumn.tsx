import React from 'react';
import styled from "styled-components";
import BlockButton from "./block/BlockButton";
import TagNotifyButton from "./tag-notify/TagNotifyButton";
import UnblockButton from "./unblock/UnblockButton";

const ActionColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  
  a, button:not(:last-child){
    margin-right: 0.5rem;
  }
`;

interface ActionColumnProps {
    student: any;
    fetch: () => void;
}

const ActionColumn: React.FC<ActionColumnProps> = ({student, fetch}) => {
    return <ActionColumnWrapper>
        {
            student.is_blocked ?
                student.day_block > 0 ?
                    <TagNotifyButton student={student}/> :
                    <UnblockButton student={student} fetch={fetch}/> :
                <BlockButton student={student} fetch={fetch}/>
        }
    </ActionColumnWrapper>;
};

export default ActionColumn;