import React from 'react';
import {useSelector} from "react-redux";
import BasicResult from "./basic-result/Basic";
import DoubleResult from "./double-result/Double";
import {totalsSelect} from "../../../../../../../store/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/tasks/setting/reducer";
import styled from "styled-components";

const ResultStyle = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom: 1rem;
  overflow-x: auto;
`;

interface ContainerProps {
    isDouble: boolean;
}

const ContainerStyle: React.FC<ContainerProps> = styled.div<ContainerProps>`
  > div {
    display: grid;
    grid-template-columns: ${props => props.isDouble ? '70px 100px 50px 215px 215px 1fr' : '70px 100px 215px 215px 1fr'};
    gap: 0 1rem;
    border-bottom: 1px solid ${props => props.theme.light_color_border};
    font-size: 30px;
    
    > div {
      padding: 0.5rem;
    }
    
    > div:not(.number):not(.exercises){
      text-align: center;
      justify-content: center;
    }
  }
  
  .header {
    color: ${props => props.theme.color_second};
    font-size: 16px;
  }
  
  .number {
    color: ${props => props.theme.color_second};
  }

  .exercises{
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    background: ${props => props.theme.color_border}33;
  }
  
  @media (max-width: 768px) {
    min-width: 500px;
      
    > div {
      grid-template-columns: ${props => props.isDouble ? '35px 50px 25px 105px 105px 1fr' : '35px 50px 105px 105px 1fr'};
      font-size: 16px; 
    }
    
    .header {
      font-size: 12px;
    }
  }
`;

const ResultBlock: React.FC = () => {
    const totals: any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const isMultiplication = setting.mode === 'divide' || setting.mode === 'multiply';
    const isDouble = setting.anzan === 'double';

    return <ResultStyle>
        <ContainerStyle isDouble={isDouble}>
            <div className="header">
                <div className="number">#</div>
                <div>Результат</div>
                {isDouble && <div/>}
                <div>Правильный ответ</div>
                <div>Ваш ответ</div>
                <div className="exercises">Задание</div>
            </div>
            {
                totals.map((total: any, key: number) =>
                    setting.anzan === 'double' ?
                        <DoubleResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                      keyExercise={key}/> :
                        <BasicResult total={total} setting={setting} isMultiplication={isMultiplication} key={key}
                                     keyExercise={key}/>)
            }
        </ContainerStyle>
    </ResultStyle>
};

export default ResultBlock;