import React from 'react';
import styled from "styled-components";
import { BuildOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import StudentsMore from "./students/StudentsMore";
import TasksBtn from "./tasks/TasksBtn";

const {Title} = Typography;

const StepMoreWrapper = styled.div`
  text-align: center;
  
  > h2.ant-typography{
    margin-left: auto;
    margin-right: auto;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  
  .block{
    .title{
      font-size: 16px;
      color: ${props => props.theme.color_second};
      margin-bottom: 0.5rem;
    }
    
    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
      
      .icon {
        margin-right: 1rem;
        
        .anticon{
          font-size: 50px;
        }
      }
      
      .counts{
        font-size: 40px;
      }
    }
  }
  
  .tasks{
    .icon {
      color: ${props => props.theme.color_primary};
    }
  }
  
  .students{
    .icon {
      color: ${props => props.theme.color_warning};
    }
  }
`;

interface StepMoreProps {
    step: any;
}

const StepMore: React.FC<StepMoreProps> = (
    {
        step,
    }
) => {
    return (
        <StepMoreWrapper>
            <Title level={2}>Этап - {step.title}</Title>
            <InfoWrapper>
                <div className="tasks block">
                    <div className="title">Заданий</div>
                    <div className="content">
                        <div className="icon">
                            <BuildOutlined />
                        </div>
                        <div className="counts">{step.tasks_count}</div>
                    </div>
                    <TasksBtn tasks={step.tasks}/>
                </div>
                <div className="students block">
                    <div className="title">Участников</div>
                    <div className="content">
                        <div className="icon">
                            <TeamOutlined />
                        </div>
                        <div className="counts">{step.students_count}</div>
                    </div>
                </div>
                <div className="tasks block">
                    <div className="title">Выполнившие</div>
                    <div className="content">
                        <div className="icon">
                            <TrophyOutlined />
                        </div>
                        <div className="counts">{step.students_completed_count}</div>
                    </div>
                </div>
            </InfoWrapper>
            <StudentsMore step={step}/>
        </StepMoreWrapper>
    );
};

export default StepMore;