import React from 'react';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {CardWrapper} from "../../../layouts/result/homework/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';
import {UserImage} from "../../../../../../../layouts/components";
import moment from "moment";

const ResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    
    .number, .image, .trophy{
      grid-row-start: 1;
      grid-row-end: 4;
    }
    
    .answer{
      font-size: 30px;
     
      p:not(:first-child){
        font-size: 20px;
        margin-bottom: 1rem;
      }
    }
    
    .user{
      font-size: 30px;
      
      p:not(:first-child){
        font-size: 20px;
        margin-bottom: 1rem;
     }
    }
  }
`;


const ResultBlock = () => {
    const {totals} = useSelector((state: any) => state.game);

    return totals.map((total: any, key: any) =>
        <ResultWrapper key={key}>
            <div className="card">
                <div className="number">
                    #{key + 1}
                </div>
                <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                <div className="image">
                    <UserImage
                        width="150px"
                        className="image"
                        src={total.exercise.url_photo}
                        alt={total.exercise.full_name}
                    />
                </div>
                <div className="answer">
                    {total.exercise.full_name}
                </div>
                <div className={`user ${total.result ? 'success' : 'danger'}`}>
                    {total.user && total.user.full_name ? total.user.full_name : 'Пусто'}
                </div>
                {total.exercise.born ? <div>{moment(total.exercise.born).format('DD-MM-YYYY')}</div> : null}
                {total.user.born ? <div>{total.user.born.format('DD-MM-YYYY')}</div> : null}
                {total.exercise.die ? <div>{moment(total.exercise.die).format('DD-MM-YYYY')}</div> : null}
                {total.user.die ? <div>{total.user.die.format('DD-MM-YYYY')}</div> : null}
            </div>
        </ResultWrapper>
    );
};

export default ResultBlock;