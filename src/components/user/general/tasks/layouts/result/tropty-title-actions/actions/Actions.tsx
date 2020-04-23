import React from 'react';
import styled from "styled-components";
import {ArrowLeftOutlined, HistoryOutlined, RedoOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {gameChangeCurrentTimes, gameChangeStatus, gameChangeTotals} from "../../../../../../../../store/game/actions";
import {withRouter, RouteComponentProps} from "react-router";

const ActionsWrapper = styled.div`
    font-size: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    > div {
      cursor: pointer;
      display: grid;
      grid-template-columns: 40px 1fr;
      align-items: center;
      grid-gap: 0.75rem;
      line-height: 1.3;
      transition: all 0.3s ease-in-out; 
      
      :not(:last-child) {
        margin-bottom: 1.5rem;
      }
    
      i{
        transition: all 0.3s ease-in-out; 
        font-size: 30px;
        color: ${props => props.theme.color_second};
      }
      
      :hover{
        color: ${props => props.theme.color_black};
        
        i{
          color: ${props => props.theme.color_primary};
        }
      }
    }
    
    @media (max-width: 768px) {
      font-size: 18px;
      > div {
        grid-template-columns: 30px 1fr;
        
        i{
          font-size: 25px;
        }
      }
    }
`;

type ActionsProps = RouteComponentProps<{ homeworkId?: string, id?: string }>

const Actions: React.FC<ActionsProps> = ({match, history}) => {
    const {game} = useSelector((state: any) => state);
    const {totals} = game;

    const dispatch = useDispatch();

    const again = () => dispatch(gameChangeStatus('again'));
    const repeat = () => {
        let _totals = totals.map((total: any) => ({exercise: total.exercise, answer: total.answer}));
        dispatch(gameChangeCurrentTimes(1));
        dispatch(gameChangeTotals(_totals));
        dispatch(gameChangeStatus('repeat'));
    };
    const back = () => history.goBack();

    return (
        <ActionsWrapper>
            {match.params.homeworkId ?
                <>
                    <div onClick={back}>
                        <ArrowLeftOutlined/> Вернуться назад
                    </div>
                </> :
                <>
                    <div onClick={again}>
                        <RedoOutlined/> Повторить с новыми примерами
                    </div>
                    <div onClick={repeat}>
                        <HistoryOutlined/> Повторить те же примеры
                    </div>
                </>
            }
        </ActionsWrapper>
    );
};

export default withRouter(Actions);