import React from 'react';
import styled from "styled-components";
import {CardWrapper} from "../../../layouts/result/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";

const ResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    
    .flag{
      width: 200px;
      height: 130px;
      overflow: hidden;
      border-radius: 10px;
      margin-bottom: .5rem;
      box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
    
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
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
                    #{key}
                </div>
                <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                <div className="flag">
                    <img src={total.exercise.url_flag} alt={total.exercise.country}/>
                </div>
                <div className="answer">
                    {total.exercise.country} <br/>
                    {total.exercise.capital}
                </div>
                <div className={`user ${total.result ? 'success' : 'danger'}`}>
                    {total.user.country ? total.user.country : 'Пусто'}<br/>
                    {total.user.capital ? total.user.capital : 'Пусто'}
                </div>
            </div>
        </ResultWrapper>
    );
};

export default ResultBlock;