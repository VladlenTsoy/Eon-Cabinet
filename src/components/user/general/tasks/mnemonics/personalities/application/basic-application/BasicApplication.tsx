import React from 'react';
import styled from "styled-components";
import {Modal} from "antd";
import moment from "moment";
import {Avatar} from "../../../../../../../../layouts/components";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStatus} from "../../../../../../../../store/game/actions";
import CarouselApplication from "../../../../layouts/application/carousel-application/CarouselApplication";
import PreparationLayout from "../../../../layouts/application/preparation/Preparation.layout";
import {useScreenWindow} from "../../../../../../../../effects/use-screen-window.effect";

interface CarouselApplicationProps {

}

const ExerciseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-direction: column;
  
  > .image{
    margin-bottom: 1.5rem;
  }
  
  > .name{
    font-size: 55px;
    line-height: 1;
    font-weight: bold;
    color: ${props => props.theme.color_black};
    
    @media (max-width: 576px) {
      font-size: 30px;
    }
  }
  
  > .dates{
    display: flex;
    font-size: 30px;
    font-weight: bold;

    @media (max-width: 576px) {
      font-size: 20px;
    }
    
    .slash{
      margin: 0 1rem;
      color: ${props => props.theme.color_second}
    }
  }
`;

const BasicApplication: React.FC<CarouselApplicationProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {totals, setting} = game;
    const dispatch = useDispatch();
    const [, isBreakpoint] = useScreenWindow({breakpoint: 'sm'});

    /**
     * Окончание таймера
     */
    const timeIsRunningOut = () => {
        Modal.destroyAll();
        document.onkeyup = null;
        return Modal.warning({
            title: 'Время закончилось!',
            // content: '',
            onOk() {
                dispatch(gameChangeStatus('answer'));
            }
        });
    };

    return <PreparationLayout>
        <CarouselApplication
            topNumber
            timeIsRunningOut={timeIsRunningOut}
        >
            {totals.map((total: any, key: number) =>
                <div key={key}>
                    <ExerciseWrapper>
                        <Avatar
                            width={isBreakpoint ? '150px' : '200px'}
                            className="image"
                            src={total.exercise.url_photo}
                            alt={total.exercise.full_name}
                        />
                        {
                            Number(setting.mode) > 1 &&
                            <div className="dates">
                                <div>{moment(total.exercise.born).format('DD-MM-YYYY')}</div>
                                {Number(setting.mode) === 3 ?
                                    <>
                                        <div className="slash">-</div>
                                        <div>{moment(total.exercise.die).format('DD-MM-YYYY')}</div>
                                    </> : null
                                }
                            </div>
                        }
                        <div className="name">{total.exercise.full_name}</div>
                    </ExerciseWrapper>
                </div>
            )}
        </CarouselApplication>
    </PreparationLayout>;
};

export default BasicApplication;