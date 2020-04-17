import React from 'react';
import { HistoryOutlined, InfoCircleOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from "antd";
import styled from "styled-components";
import moment from "moment";

const DetailsWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  display: grid;
  grid-template-columns: 25px 1fr 25px 1fr;
  //grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  
  > .anticon {
    font-size: 25px;
    color: ${props => props.theme.color_minimal};
  } 
   
  .block {
    > span{
      display: inline-block;
      margin-bottom: 0.25rem;
      color: ${props => props.theme.color_black};
    }
    
    > p {
      margin-bottom: 0;
    }
    
    .max-students{
      border-bottom: 1px dashed ${props => props.theme.color_danger};
      font-weight: bold;
    }
  }
`;

interface DetailsProps {
    olympiad: any;
}

const Details: React.FC<DetailsProps> = ({olympiad}) => {
    return (
        <DetailsWrapper>
            <InfoCircleOutlined />
            <div className="block">
                <span>Дисциплина:</span>
                <p>{olympiad.discipline}</p>
            </div>
            <UserOutlined />
            <div className="block">
                <span>Создатель</span>
                <p>{olympiad.creator.first_name} {olympiad.creator.last_name}</p>
            </div>
            <TeamOutlined />
            <div className="block">
                <span>Участвующих:</span>
                <p>{olympiad.students_count} из <Tooltip title="Максимальное кол-во"><span className="max-students">100</span></Tooltip></p>
            </div>
            <HistoryOutlined />
            <div className="block">
                <span>Дата создания</span>
                <p>{moment(olympiad.created_at).format('DD-MM-YYYY')}</p>
            </div>
        </DetailsWrapper>
    );
};

export default Details;