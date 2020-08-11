import React from 'react';
import {Homework} from "../../../../../../../../../../../../store/access/teacher/students/homework/homework";

interface MoreProps {
    homework: Homework
}

const More: React.FC<MoreProps> = ({homework}) => {
    console.log(homework)
    return <>

    </>
};

export default More;