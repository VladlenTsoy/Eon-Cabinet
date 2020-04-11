import React from 'react';
import {LoadingBlock} from "lib";
import ProfileBlock from "../../../../layouts/profile-block/ProfileBlock";
import {useApiUserGeneral} from "../../../../../../../effects/use-api-user-general.effect";

interface TeacherProps {
}

const Teacher: React.FC<TeacherProps> = () => {
    const [loading, teacher] = useApiUserGeneral({url: `student/teacher`});

    return loading ?
        <LoadingBlock/> :
        <ProfileBlock user={teacher} teacher/>;
};

export default Teacher;