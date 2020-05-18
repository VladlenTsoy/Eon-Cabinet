import React from 'react';
import {TrophyOutlined} from '@ant-design/icons';

interface BasicResultProps {
    total: any;
    setting: any;
    keyExercise: number;
    isMultiplication: boolean;
}

const BasicResult: React.FC<BasicResultProps> = ({total, isMultiplication, keyExercise, setting}) => {
    return <div>
        <div className="number">
            {keyExercise + 1}
        </div>
        <div className={`trophy ${total.result ? 'warning' : 'second'}`}>
            <TrophyOutlined/>
        </div>
        <div className="answer">
            {total.answer}
        </div>
        <div className={`user ${total.result ? 'success' : 'danger'}`}>
            {total.user !== undefined ? total.user : 'Пусто'}
        </div>
        <div className="exercises">
            {isMultiplication ?
                total.exercise[0] + (setting.mode === 'multiply' ? ' * ' : ' / ') + total.exercise[1] :
                total.exercise.join(', ')
            }
        </div>
    </div>
};

export default BasicResult;