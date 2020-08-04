import React from 'react';
import {CheckWrapper} from "../../layouts/check-wrapper.layout";
import styled from "styled-components";

const PeriodsWrapper = styled.div`
  margin-top: 1rem;
  //max-width: 400px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
  
  > div{
    border: 1px solid ${props => props.theme['@layout-body-background']};
    border-radius: 10px;
    text-align: center;
    padding: 1rem 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    
    &.active{
      position: relative;
      background: ${props => props.theme.color_warning};
          
      > p {
        color: #ffffff;
      }
      
      ::before{
        content: "✔";
        position: absolute;
        color: #ffffff40;
        font-size: 265px;
        z-index: 0;
        top: -115px;
        left: 0;
      }
    }
    
    :hover:not(.active){
      background: ${props => props.theme.color_warning}5c;
    }
        
    > p{
      position: relative;
      margin-bottom: 0.75rem;
      
      :last-child{
        margin: 0;
      }
    }
    
    .period{
      font-size: 14px;
      span{
        color: ${props => props.theme.color_danger};
      }
    }
    
    .cost {
      font-size: 20px;
      line-height: 1;
      font-weight: bolder;
      color: ${props => props.theme.color_black};
    }
    
    .desc{
      color: ${props => props.theme.color_success};
    }
    
    .desc-off{
      color: ${props => props.theme.color_second};
    }
  }
`;

const Account = () => {
    return <>
        <CheckWrapper>
            <thead>
            <tr>
                <th>
                    Название
                </th>
                <th>
                    Кол-во
                </th>
                <th>
                    Стоимость
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Аккаунт</td>
                <td>1</td>
                <td>
                    400 000 сум
                </td>
            </tr>
            <tr className="sub">
                <td colSpan={2}>Ментальная арифметика</td>
                <td>200 000 сум</td>
            </tr>
            <tr className="sub">
                <td colSpan={2}>Мнемотехника</td>
                <td>200 000 сум</td>
            </tr>
            </tbody>
        </CheckWrapper>
        <PeriodsWrapper>
            <div>
                <p className="period">Месяц</p>
                <p className="cost">400 000 сум</p>
                <p className="desc-off">без скидки</p>
            </div>
            <div>
                <p className="period">3-Месяца <span>-5%</span></p>
                <p className="cost">1 140 000 сум</p>
                <p className="desc">сэкономить 60 000 сум</p>
            </div>
            <div>
                <p className="period">Пол-года <span>-10%</span></p>
                <p className="cost">2 160 000 сум</p>
                <p className="desc">сэкономить 240 000 сум</p>
            </div>
            <div className="active">
                <p className="period">Год <span>-20%</span></p>
                <p className="cost">3 840 000 сум</p>
                <p className="desc">сэкономить 960 000 сум</p>
            </div>
        </PeriodsWrapper>
    </>;
};

export default Account;