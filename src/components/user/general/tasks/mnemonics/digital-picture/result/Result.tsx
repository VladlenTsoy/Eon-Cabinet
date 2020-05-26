import React from 'react';
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";
import styled from "styled-components";
import {TrophyOutlined} from '@ant-design/icons';

const ImageStyle = styled.div`
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
`;

const Result = () => {
    const totals: any = useSelector(totalsSelect);

    return <ResultMoreLayout
        header={
            <tr>
                <td className="number">#</td>
                <td>Результат</td>
                <td/>
                <td>Правильный ответ</td>
                <td>Ваш ответ</td>
            </tr>
        }
        children={
            totals.map((total: any, key: number) =>
                <tr key={key}>
                    <td className="number">
                        {key + 1}
                    </td>
                    <td className={`trophy ${total.result ? 'warning' : 'second'}`}>
                        <TrophyOutlined/>
                    </td>
                    <td>
                        <ImageStyle>
                            <img src={total.exercise.url_picture} alt={total.exercise.number}/>
                        </ImageStyle>
                    </td>
                    <td className="answer">
                        {total.exercise.number}
                    </td>
                    <td className={`user ${total.result ? 'success' : 'danger'}`}>
                        {total.user?.number || 'Пусто'}
                    </td>
                </tr>)}
    />;
};

export default Result;