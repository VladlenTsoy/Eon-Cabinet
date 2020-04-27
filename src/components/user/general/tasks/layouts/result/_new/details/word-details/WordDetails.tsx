import React from 'react';
import { TrophyOutlined } from '@ant-design/icons';

interface WordDetailsProps {
    user: string;
    keyExercise: number;
    answer: string;
    result: boolean;
}

const WordDetails: React.FC<WordDetailsProps> = ({keyExercise, user, answer, result}) => {
    return (
        <div className="card">
            <div className="number">
                #{keyExercise}
            </div>
            <div className={`trophy ${result ? 'success' : 'danger'}`}>
                <TrophyOutlined />
            </div>
            <div className="answer">
                {answer}
            </div>
            <div className={`user ${result ? 'success' : 'danger'}`}>
                {user || 'Пусто'}
            </div>
        </div>
    );
};

export default WordDetails;