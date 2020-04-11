import React from 'react';
import styled from "styled-components";
import {GrayIcon} from "lib";
import {withRouter, RouteComponentProps} from "react-router-dom";
import SuccessFinallySVG from "assets/images/olympiad/step_success_finally.svg";
import { TrophyOutlined } from '@ant-design/icons';
import {Button, Typography} from "antd";
import Timer from "react-compound-timer";
import moment from "moment";

const {Title} = Typography;

const CardWrapper = styled.div`
  padding: 1rem;
  background: ${props => props.theme['@component-background']};
  display: grid;
  grid-template-columns: 125px 1fr;
  gap: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    margin-right: 1rem;
  }
  
  .image-data{
    text-align: center;  
    display: flex;
    align-items: center;
    justify-content: center;
      
    .image{
      width: 125px;
      height: 125px;
      
      .timer{
        font-size: 16px;
        background: #ff4755;
        border-radius: 50px;
        color: #fff;
        font-weight: 600;
        padding: 0.2rem 0.5rem;
        position: relative;
        top: -20px;
      }
    }
  }
  
  .content-data{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .info{
      margin-bottom: 0.25rem;
      
      > div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-bottom: 0.25rem;
        font-size: 16px;
        
        .title{
          color: ${props => props.theme.color_second};
        }
        
        .desc{
          > span {
            color ${props => props.theme.color_minimal};
          }
        }
      }
    }
  }
`;

type CardOlympiadProps = RouteComponentProps & {
    olympiad: any;
    fetch: () => void;
}

const CardOlympiadBlock: React.FC<CardOlympiadProps> = ({olympiad, fetch, history}) => {
    const currentStep = olympiad.current_step ? olympiad.current_step.step + 1 : 1;

    const openOlympiad = () => history.push(`/olympiads/${olympiad.id}`);

    return (
        <CardWrapper>
            <div className="image-data">
                <div className="image">
                    <GrayIcon
                        width="100%"
                        alt={olympiad.title}
                        img={SuccessFinallySVG}
                        percent={olympiad.tasks.success / olympiad.tasks.all * 100}
                    />
                    {
                        olympiad.current_step ?
                            <div className="timer">

                                <Timer
                                    formatValue={(value: any) => value < 10 ? `0${value}` : value}
                                    initialTime={moment(olympiad.current_step.end_at).valueOf() - moment().valueOf()}
                                    direction="backward"
                                    checkpoints={[
                                        {
                                            time: 1000,
                                            callback: fetch,
                                        }
                                    ]}
                                >
                                    <Timer.Days/> д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                                </Timer>
                            </div> : null
                    }
                </div>
            </div>
            <div className="content-data">
                <Title level={4}>{olympiad.title}</Title>
                <div className="info">
                    <div>
                        <div className="title">Этапов:</div>
                        <div className="desc">{currentStep} <span>из</span> {olympiad.steps_count}</div>
                    </div>
                    <div>
                        <div className="title">Заданий:</div>
                        <div className="desc">{olympiad.tasks.success} <span>из</span> {olympiad.tasks.all}</div>
                    </div>
                    <div>
                        <div className="title">Участников:</div>
                        <div className="desc">{olympiad.students_count}</div>
                    </div>
                </div>
                <Button type={olympiad.current_step ? 'dashed' : 'default'} icon={<TrophyOutlined />} size="large" block
                        onClick={openOlympiad} shape="round"
                        disabled={!olympiad.current_step}>
                    {olympiad.current_step ? 'Подробнее' : 'Завершена'}
                </Button>
            </div>
        </CardWrapper>
    );
};

export default withRouter(CardOlympiadBlock);