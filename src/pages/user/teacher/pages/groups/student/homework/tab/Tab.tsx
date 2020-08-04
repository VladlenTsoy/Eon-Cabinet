import React from "react";
import styled from "styled-components";
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import moment from "moment";

const TitleIconWrapper = styled.div`
  .ant-tabs-nav .ant-tabs-tab &{
    display: flex;
    align-items: center;
    
    span.anticon {
      font-size: 35px;
      margin-right: 1rem;
      
      &.success{
        color: ${props => props.theme.color_success};
      }
      
      &.danger{
        color: ${props => props.theme.color_danger};
      }
    }
    
    .info {
      margin-bottom: 0;
      text-align: left;
    
      .date {
        font-size: 12px;
        color: ${props => props.theme.color_second};
      }
    
      .title {
        font-size: 16px;
      }
    }
  }
`;

interface TabHomeworkProps {
    homework: any;
}

const Tab: React.FC<TabHomeworkProps> = ({homework}) => {
    return (
        <TitleIconWrapper>
            {homework.status === 1 ?
                <CheckCircleOutlined className="success"/> :
                <CloseCircleOutlined className="danger"/>}

            <div className="info">
                <div className="date">{moment(homework.created_at).format('HH:ss DD/MM/YY')}</div>
                <div className="title">Уровень {homework.level}</div>
            </div>
        </TitleIconWrapper>
    );
};

export default Tab;