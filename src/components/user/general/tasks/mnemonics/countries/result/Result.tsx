import React from 'react';
import styled from "styled-components";
import {TrophyOutlined} from '@ant-design/icons';
import {useSelector} from "react-redux";
import {totalsSelect} from "../../../../../../../store/reducers/common/tasks/totals/reducer";
import {settingAnzan} from "../../../../../../../store/reducers/common/tasks/setting/reducer";
import ResultMoreLayout from "../../../layouts/result/result-more/ResultMore.layout";

const FlagStyle = styled.div`
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

const ResultBlock = () => {
    const totals: any = useSelector(totalsSelect);
    const setting = useSelector(settingAnzan);
    const mode = Number(setting.mode);

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
                [
                    <tr key={key}>
                        <td className="number" rowSpan={mode > 1 ? 2 : 1}>
                            {key + 1}
                        </td>
                        <td className={`trophy ${total.result ? 'warning' : 'second'}`} rowSpan={mode > 1 ? 2 : 1}>
                            <TrophyOutlined/>
                        </td>
                        <td rowSpan={mode > 1 ? 2 : 1}>
                            <FlagStyle>
                                <img src={total.exercise.url_flag} alt={total.exercise.country}/>
                            </FlagStyle>
                        </td>
                        <td className="answer">
                            {total.exercise.country}
                        </td>
                        <td className={`user ${total.result ? 'success' : 'danger'}`}>
                            {total.user?.country ? total.user.country : 'Пусто'}
                        </td>
                    </tr>,
                    <tr key={key + '-two'}>
                        {total.exercise.capital &&
                        <td className="sub">{total.exercise.capital}</td>}
                        {total.exercise.capital &&
                        <td className="sub">
                            {total.user.capital ? total.user.capital : 'Пусто'}
                        </td>}
                    </tr>
                ]
            )
        }
    />

    // return totals.map((total: any, key: any) =>
    //     <ResultWrapper key={key}>
    //         <div className="card">
    //             <div className="number">
    //                 #{key}
    //             </div>
    //             <div className={`trophy ${total.result ? 'success' : 'danger'}`}>
    //                 <TrophyOutlined />
    //             </div>
    //             <div className="flag">
    //                 <img src={total.exercise.url_flag} alt={total.exercise.country}/>
    //             </div>
    //             <div className="answer">
    //                 {total.exercise.country} <br/>
    //                 {total.exercise.capital}
    //             </div>
    //             <div className={`user ${total.result ? 'success' : 'danger'}`}>
    //                 {total.user.country ? total.user.country : 'Пусто'}<br/>
    //                 {total.user.capital ? total.user.capital : 'Пусто'}
    //             </div>
    //         </div>
    //     </ResultWrapper>
    // );
};

export default ResultBlock;