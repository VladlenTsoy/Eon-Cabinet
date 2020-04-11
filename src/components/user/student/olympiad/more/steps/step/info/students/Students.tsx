import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import BlockWrapper from "../layouts/block/Block";

interface StudentsProps {
    step: any;
}

const Students:React.FC<StudentsProps> = ({step}) => {
    return (
        <BlockWrapper>
            <div>
                <div className="icon">
                    <TeamOutlined />
                </div>
            </div>
            <div className="content">
                <span className="title">Участников</span>
                <div className="counts">
                    {step.students_count}
                </div>
            </div>
        </BlockWrapper>
    );
};

export default Students;