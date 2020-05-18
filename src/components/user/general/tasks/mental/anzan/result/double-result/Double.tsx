import React from 'react';
import styled from "styled-components";
import {TrophyOutlined} from '@ant-design/icons';

const DoubleResultWrapper = styled.tr`
  .position{
    color: ${props => props.theme.light_color_border};
  }
`;

interface DoubleResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const DoubleResult: React.FC<DoubleResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    const result = total[0].result && total[1].result;
    return <>
        <DoubleResultWrapper>
            <td className="number" rowSpan={2}>
                {keyExercise + 1}
            </td>
            <td className={`trophy ${result ? 'warning' : 'second'}`} rowSpan={2}>
                <TrophyOutlined/>
            </td>
            <td className="position">Л</td>
            <td className="answer">
                {total[0].answer}
            </td>
            <td className={`user ${total[0].result ? 'success' : 'danger'}`}>
                {total[0].user !== undefined ? total.user : 'Пусто'}
            </td>
            <td className="exercises">
                {isMultiplication ?
                    total[0].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[0].exercise[1] :
                    total[0].exercise.join(', ')
                }
            </td>
        </DoubleResultWrapper>
        <DoubleResultWrapper>
            <td className="position">П</td>
            <td className="answer">
                {total[1].answer}
            </td>
            <td className={`user ${total[1].result ? 'success' : 'danger'}`}>
                {total[1].user !== undefined ? total.user : 'Пусто'}
            </td>
            <td className="exercises">
                {isMultiplication ?
                    total[1].exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total[1].exercise[1] :
                    total[1].exercise.join(', ')
                }
            </td>
        </DoubleResultWrapper>
    </>
};

export default DoubleResult;