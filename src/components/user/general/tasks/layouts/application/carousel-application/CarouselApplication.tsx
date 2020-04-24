import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import {Card} from "lib";
import { FlagOutlined } from '@ant-design/icons';
import {Button, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStatus} from "../../../../../../../store/game/actions";
import TimerBlock from "../timer/Timer";
import CarouselLayout from "./carousel/Carousel.layout";
import Number from "./number/Number";

const CardWrapper = styled(Card)`
  &.ant-card{
     height: 100%;
     margin-bottom: 0;
     
     .ant-card-body{
       height: 100%;
     }
  }
`;

const CarouselWrapper = styled.div`
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  .ant-carousel{
    width: 80%;
    
    @media (max-width: 576px) {
      width: 75%;
    }
        .slick-slide {
      position: relative;
    }
    
    .slick-dots-bottom{
      bottom: -25px;
    }
    
    .slick-dots{ 
      li{ 
        button{
          background: ${props => props.theme.color_second}
        }
      }
      
      li.slick-active button{
        background: ${props => props.theme.color_primary}
      }
    }
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
`;

interface CarouselProps {
    topNumber?: boolean;
    afterFinishing?: () => void;
    outputExercise?: (exercise: any) => string;
    timeIsRunningOut?: () => void;
}

const CarouselApplication: React.FC<CarouselProps> = (
    {
        children,
        afterFinishing,
        topNumber,
        outputExercise,
        timeIsRunningOut,
    }
) => {
    const [current, setCurrent] = useState(1);
    const {game} = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const {setting} = game;

    const checkTimerForAnswer = useCallback(() => {
        Modal.confirm({
            title: "У вас еще осталось время, Вы уверены что хотите перейти к ответам?",
            onOk: () => {
                dispatch(gameChangeStatus('answer'));
            }
        });
    }, [dispatch]);

    const clickHandler = () =>
        afterFinishing ? afterFinishing() : checkTimerForAnswer();

    return <>
        {timeIsRunningOut && setting.time ?
            <TimerBlock
                time={setting.time}
            /> : null}
        <CardWrapper>
            <CarouselWrapper className="animated fadeIn">
                {topNumber ? <Number current={current}/> : null}
                <CarouselLayout
                    outputExercise={outputExercise}
                    setCurrent={setCurrent}
                    checkTimerForAnswer={checkTimerForAnswer}
                >
                    {children}
                </CarouselLayout>
                <ButtonWrapper>
                    <Button type="primary" icon={<FlagOutlined />} size="large" onClick={clickHandler}>
                        Завершить
                    </Button>
                </ButtonWrapper>
            </CarouselWrapper>
        </CardWrapper>
    </>;
};

export default CarouselApplication;