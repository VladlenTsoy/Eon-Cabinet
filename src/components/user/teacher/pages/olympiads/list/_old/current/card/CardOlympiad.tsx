import React from 'react';
import {ButtonLink} from "lib";
import {Card} from "lib";
import {Tag} from "antd";
import styled from "styled-components";
import ImageTimer from "./image-timer/ImageTimer";

const Wrapper = styled.div`
  border-radius: 10px;
  background: ${props => props.theme['@body-background']};
  display: grid;
  padding: 1rem;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1.5rem;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
  
  .content-wrapper{
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    justify-content: space-around;
  
      h4.ant-typography, .ant-typography h4{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
  
      .info-wrapper{
        margin-bottom: 0.5rem;
        
        p{
          margin-bottom: 0.5rem;
          color: ${props => props.theme.color_second};
          
          span{
            color: ${props => props.theme.color_main};
          }
          .ant-tag{
            color: #ffffff;
          }
        }       
      }
  }
`;

interface OlympiadProps {
    id: number;
    title: string;
    access: 'public' | 'invite' | 'private'
    discipline: string;
    students_count: number;
    steps_count: number;
    current_step: {
        step: number;
        start_at: string;
        end_at: string;
    };
}

interface CardOlympiadProps {
    olympiad: OlympiadProps;
    callback: any;
}

const CardOlympiad: React.FC<CardOlympiadProps> = ({olympiad, callback}) => {
    return <Wrapper>
        <ImageTimer callback={callback} endAt={olympiad.current_step.end_at}/>
        <div className="content-wrapper">
            <Card.Title level={4} title={olympiad.title}/>
            <div className="info-wrapper">
                <p>Этап: <span>{olympiad.current_step.step + 1} из {olympiad.steps_count}</span></p>
                <p>{olympiad.discipline}</p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Участвующих: <span>{olympiad.students_count}</span></p>
            </div>
            <ButtonLink
                block
                type="default"
                to={`olympiad/${olympiad.id}`}
            >
                Подробнее
            </ButtonLink>
        </div>
    </Wrapper>;
};

export default React.memo(CardOlympiad);