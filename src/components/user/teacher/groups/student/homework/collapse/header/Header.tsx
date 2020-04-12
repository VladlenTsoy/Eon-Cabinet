import React from "react";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Typography } from "antd";
import styled from "styled-components";
import moment from "moment";

const {Text} = Typography;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 576px) {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr;
    margin-left: 1rem;
  }
  
  .lead-time-title {
    display: flex;
    align-self: center;

    .success{
      color: ${props => props.theme.color_success};
    }
    
    .danger{
      color: ${props => props.theme.color_danger};
    }
    
    .warning{
      color: ${props => props.theme.color_warning};
    }

    .anticon{
      font-size: 20px;
      margin-right: 0.5rem;
    }
  }

  .title{
    font-size: 18px;
  }
`;

interface HeaderCollapseHomeworkProps {
    task: any;
}

const Header: React.FC<HeaderCollapseHomeworkProps> = ({task}) => {
    return (
      <HeaderWrapper>
          <div className="lead-time-title">
              {
                  !task.first ?
                      <ClockCircleOutlined className="warning" /> :
                      task.first.exodus ?
                          <CheckCircleOutlined className="success" /> :
                          <CloseCircleOutlined className="danger" />
              }
              {task.first ? moment(task.first.created_at).format('HH:mm DD/MM/YY') : 'Не выполнил'}
          </div>
          <div className="title">
              {task.task_name}
          </div>
          <div>
              <Text type="secondary">Всего:</Text> {task.count_all}
              <Text type="secondary"> \ Выполнено:</Text> {task.first ? task.first.count_success : 0}
          </div>
      </HeaderWrapper>
    );
};

export default Header;