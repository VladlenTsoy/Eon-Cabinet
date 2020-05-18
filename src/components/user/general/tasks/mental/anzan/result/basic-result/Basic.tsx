import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';

interface BasicResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const BasicResult: React.FC<BasicResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    return <tr>
        <td className="number">
            {keyExercise + 1}
        </td>
        <td className={`trophy ${total.result ? 'warning' : 'second'}`}>
            <TrophyOutlined/>
        </td>
        <td className="answer">
            {total.answer}
        </td>
        <td className={`user ${total.result ? 'success' : 'danger'}`}>
            {total.user !== undefined ? total.user : 'Пусто'}
        </td>
        <td className="exercises">
            {isMultiplication ?
                total.exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total.exercise[1] :
                total.exercise.join(', ')
            }
        </td>
    </tr>
};

export default BasicResult;