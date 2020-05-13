import React from 'react';
import styled from "styled-components";
import {CardWrapper} from "../../../../layouts/result/homework/_new/details/card/Card";
import { TrophyOutlined } from '@ant-design/icons';

const DoubleResultWrapper = styled(CardWrapper)`
  .card{
    grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr;

    &.multi{
      grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    .exercises{
      font-size: 30px;
      grid-column-start: 1;
      grid-column-end: 5;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .exercises-multiplication{
      font-size: 50px;
    }
  }
`;

interface DoubleResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const DoubleResult: React.FC<DoubleResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    console.log(total);
    const result = total[0].result === total[1].result;
    return (
        <DoubleResultWrapper>
            <div className={`card ${isMultiplication ? 'multi' : ''}`}>
                <div className="number">
                    #{keyExercise}
                </div>
                <div className={`trophy ${result ? 'success' : 'danger'}`}>
                    <TrophyOutlined />
                </div>
                {isMultiplication ?
                    <div className="exercises-multiplication">
                        {total[0].exercise[0]}{setting.mode === 'multiply' ? ' * ' : ' / '}{total[0].exercise[1]}
                    </div> : null
                }
                <div className="answer">
                    {total[0].answer}
                </div>
                <div className={`user ${total[0].result ? 'success' : 'danger'}`}>
                    {total[0].user || 'Пусто'}
                </div>
                {isMultiplication ?
                    <div className="exercises-multiplication">
                        {total[1].exercise[0]}{setting.mode === 'multiply' ? ' * ' : ' / '}{total[1].exercise[1]}
                    </div> : null
                }
                <div className="answer">
                    {total[1].answer}
                </div>
                <div className={`user ${total[1].result ? 'success' : 'danger'}`}>
                    {total[1].user || 'Пусто'}
                </div>
                {!isMultiplication ?
                    <>
                        <div className="exercises">
                            {total[0].exercise.join(', ')}
                        </div>
                        <div className="exercises">
                            {total[1].exercise.join(', ')}
                        </div>
                    </> : null
                }
            </div>
        </DoubleResultWrapper>
    );

    // return <table>
    //     <tbody>
    //     <tr>
    //         <th colSpan={2}>Ваш ответ</th>
    //         <th colSpan={2}>Правильный ответ</th>
    //         <th>Урпажнение</th>
    //     </tr>
    //     <tr>
    //         <td className="answer">{total[0].user}</td>
    //         <td className="answer">{total[1].user}</td>
    //         <td className="answer">{total[0].answer}</td>
    //         <td className="answer">{total[1].answer}</td>
    //         <td>
    //             <div className="exercises">
    //                 <table>
    //                     <tbody>
    //                     {total[0].exercise.map((val: any, key: number) =>
    //                         <tr key={key}>
    //                             <td className="exercise">{val}</td>
    //                             <td className="exercise">{total[1].exercise[key]}</td>
    //                         </tr>
    //                     )}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </td>
    //     </tr>
    //     </tbody>
    // </table>
};

export default DoubleResult;