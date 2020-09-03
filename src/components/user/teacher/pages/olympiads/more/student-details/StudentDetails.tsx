import React from 'react';
import InviteStudentButton from "./invite-student/InviteStudentButton";
import RequestsStudentsButton from "./requests-students/RequestsStudentsButton";
import styled from "styled-components";
import { UsergroupAddOutlined } from '@ant-design/icons';
import { Typography } from "antd";

const {Title} = Typography;

const Wrapper = styled.div`
  margin: 2rem 0;
  text-align: center;
  padding: 1rem;
  border: 1px dashed ${props => props.theme.light_color_border};
  border-radius: 10px;
      
  .info{
    display: flex;
    align-items: center;
    justify-content: center;
    grid-gap: 1rem;
    
    .icon {
      color: ${props => props.theme.color_danger};
      font-size: 50px;
      margin-right: 2.5rem;
    }
    
    .count{
      font-size: 40px;
      margin-right: 2.5rem;
    }
  }
`;

interface StudentDetailsProps {
    olympiad: any;
    fetch: () => void;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({olympiad, fetch}) => {
    if (olympiad.status === 'processing' && olympiad.access === 'private')
        return <Wrapper>
            <Title level={4}>Добавляйте учеников для участия в олимпиаде</Title>
            <InviteStudentButton
                fetch={fetch}
                olympiad={olympiad}/>
        </Wrapper>;

    if (olympiad.status === 'processing' && olympiad.access === 'invite')
        return (
            <Wrapper>
                <Title level={4}>Запросы на участие</Title>
                <div className="info">
                    <div className="icon">
                        <UsergroupAddOutlined />
                    </div>
                    <div className="count">
                        {olympiad.requests_count}
                    </div>
                    <RequestsStudentsButton
                        fetch={fetch}
                        olympiad={olympiad}
                    />
                </div>
            </Wrapper>
        );

    return <></>;
};

export default StudentDetails;