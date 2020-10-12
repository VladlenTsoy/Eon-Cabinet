import React, {useState} from "react"
import {Avatar} from "../../../../../../../../../../lib/ui";
import styled from "styled-components";
import {ModalMenuStyled} from "../../../../../../../../../../lib/ui/modal-menu/ModalMenu"
import ActionColumn from "./action/ActionColumn"
import {Student} from "../../../../../../../../../../lib/types/teacher/Student"

const UserNameWrapper = styled.div`
   display: flex;
   align-items: center;
   color: ${props => props.theme.color_main};
   cursor: pointer;

   &:hover{
     color: ${props => props.theme.color_primary};
   }
`;

interface ProfileColumnProps {
    student: Student;
}

const ProfileColumn:React.FC<ProfileColumnProps> = ({student}) => {
    const [visible, setVisible] = useState(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return <>
        <UserNameWrapper onClick={open}>
            <Avatar
                src={student.url_image}
                alt={`${student.last_name} ${student.first_name}`}
                width="50px"
                mr="0.75rem"/>
            {student.last_name} {student.first_name}
        </UserNameWrapper>
        <ModalMenuStyled
            centered
            width={320}
            closable={false}
            visible={visible}
            onCancel={close}
            zIndex={999}
        >
            <div className="menu" onClick={close}>
                <ActionColumn student={student}/>
            </div>
        </ModalMenuStyled>
        </>
};

export default ProfileColumn;