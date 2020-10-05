import React from 'react';
import styled from "styled-components";
// import CollapseHomework from "./collapse/Collapse"
import {StudentSentHomework} from "../../../../../../../../../../../../lib/types/teacher/StudentHomework"

const MoreStyled = styled.div`
`

interface MoreProps {
    homework: StudentSentHomework
}

const More: React.FC<MoreProps> = ({homework}) => {

    return <MoreStyled>

    </MoreStyled>
};

export default More;