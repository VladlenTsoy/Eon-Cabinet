import React from 'react';
import {ArrowRightOutlined, FlagOutlined, HistoryOutlined} from '@ant-design/icons';
import {Button} from "antd";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {nextGame, repeatGame, completionGame, gameSelector} from "store/reducers/common/game/gameSplice";
import {useRouteMatch} from "react-router-dom";
import {ResultMatchProps} from "../../result/homework/Result";

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
    checkResult: (totals: any) => boolean
}

const ActionIntermediate: React.FC<ActionIntermediateProps> = ({checkResult}) => {
    const {currentTimes, setting, totals} = useSelector(gameSelector);
    const match = useRouteMatch<ResultMatchProps>();

    const dispatch = useDispatch();

    const repeatExercise = () => dispatch(repeatGame(checkResult(totals[currentTimes])));
    const nextExercise = () => dispatch(nextGame());
    const completionTask = () => dispatch(completionGame(setting?.extra.includes('group')));

    return <ActionWrapper>
        {!match.params.homeworkId &&
        <Button icon={<HistoryOutlined/>} size="large" onClick={repeatExercise}>Повторить текущий пример</Button>}
        <div className="counts-block">
            <div className="passed-block">
                <span className="title">Пройдено</span>
                <span className="desc">{currentTimes + 1}</span>
            </div>
            <div className="left-block">
                <span className="title">Всего</span>
                <span className="desc">{setting.times}</span>
            </div>
        </div>
        {currentTimes + 1 >= setting.times ?
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
};

export default ActionIntermediate;