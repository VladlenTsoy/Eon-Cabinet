import React from 'react';
import {ArrowRightOutlined, FlagOutlined, HistoryOutlined} from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {gameChangeStatus} from "../../../../../../../store/game/actions";

const ActionWrapper = styled.div`
  text-align: center;
    .counts-block {
      display: flex;
      margin-top: 1.5rem;
      margin-bottom: .5rem;

      div {
        width: 100%;

        span {
          display: block;
        }

        .title {
          color: ${props => props.theme.color_second};
        }

        .desc {
          color: ${props => props.theme.color_main};
          font-size: 90px;
          line-height: 120px;
          font-weight: bolder;
          
          @media (max-width: 576px) {
            font-size: 70px;
          }
        }
      }

      .passed-block {

      }

      .left-block {

      }
    }

    .btn-sub-finish{
      margin-top: 1rem;
    }
`;

interface ActionIntermediateProps {
}

const ActionIntermediate: React.FC<ActionIntermediateProps> = () => {
    const {game} = useSelector((state: any) => state);
    const {setting, currentTimes, status} = game;
    const dispatch = useDispatch();

    const repeatExercise = () => dispatch(gameChangeStatus('refresh'));
    const nextExercise = () => dispatch(gameChangeStatus(status === 'repeat' ? 'repeat' : 'start'));

    const completionTask = () => setting.extra && setting.extra.includes('group') ?
        dispatch(gameChangeStatus('answer')) :
        dispatch(gameChangeStatus('result'));

    return (
        <ActionWrapper>
            <Button icon={<HistoryOutlined/>} size="large" onClick={repeatExercise}>Повторить текущий пример</Button>
            <div className="counts-block">
                <div className="passed-block">
                    <span className="title">Пройдено</span>
                    <span className="desc">{currentTimes}</span>
                </div>
                <div className="left-block">
                    <span className="title">Всего</span>
                    <span className="desc">{setting.times}</span>
                </div>
            </div>
            {currentTimes >= setting.times ?
                <Button type="primary" size="large" autoFocus icon={<FlagOutlined/>}
                        onClick={completionTask}>Завершить</Button> :
                <Button.Group size="large">
                    <Button icon={<FlagOutlined/>} onClick={completionTask}>Завершить</Button>
                    <Button type="primary" size="large" autoFocus onClick={nextExercise}>
                        Следующее
                        <ArrowRightOutlined/>
                    </Button>
                </Button.Group>
            }
        </ActionWrapper>
    );
};

export default ActionIntermediate;