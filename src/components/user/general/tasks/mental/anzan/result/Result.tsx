import React from 'react';
import {useSelector} from "react-redux";
import BasicResult from "./basic-result/Basic";
import DoubleResult from "./double-result/Double";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import styled from "styled-components";

const ResultStyle = styled.div`
  > div {
    display: grid;
    grid-template-columns: 50px 100px 175px 175px 1fr;
    gap: 1rem;
    border-bottom: 1px solid ${props => props.theme.light_color_border};
    
    > div {
      padding: 0.5rem;
    }
    
    > div:not(:first-child):not(:last-child){
      text-align: center;
    }
  }
  
  .header {
    color: ${props => props.theme.color_second};
    font-size: 16px;
  }
  
  .warning { color: ${props => props.theme.color_warning}; }
  .success { color: ${props => props.theme.color_success}; }
  .danger { color: ${props => props.theme.color_danger}; }
`;

const ResultBlock: React.FC = () => {
    const totals: any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';

    return <ResultStyle>
        <div className="header">
            <div>#</div>
            <div>Результат</div>
            <div>Правильный ответ</div>
            <div>Ваш ответ</div>
            <div>Задание</div>
        </div>
        {
            totals.map((total: any, key: number) =>
                setting.anzan === 'double' ?
                    <DoubleResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                  keyExercise={key}/> :
                    <BasicResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                 keyExercise={key}/>)
        }
    </ResultStyle>
};

export default ResultBlock;