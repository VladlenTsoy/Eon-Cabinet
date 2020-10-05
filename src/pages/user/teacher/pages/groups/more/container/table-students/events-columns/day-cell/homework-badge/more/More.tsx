import React from 'react';
import {StudentHomework} from "store/access/teacher/student-homework/studentHomeworkSlice";
import styled from "styled-components";
import CollapseHomework from "./collapse/Collapse"

const MoreStyled = styled.div`
`

interface MoreProps {
    homework: StudentHomework
}

const More: React.FC<MoreProps> = ({homework}) => {
    return <MoreStyled>
        <CollapseHomework homework={homework}/>
    </MoreStyled>
};

export default More;