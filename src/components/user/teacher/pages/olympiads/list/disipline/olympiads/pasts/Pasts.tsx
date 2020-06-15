import React from 'react';
import {Tag} from "antd";
import {ButtonLink} from "../../../../../../../../../lib";

interface PastsProps {
    olympiads: any[];
}

const Pasts: React.FC<PastsProps> = ({olympiads}) => {
    return <>
        {olympiads.map((olympiad, key) =>
            <div key={key}>
                <p>{olympiad.title}</p>
                <p>Дата завершения: {olympiad.last_step.end_at}</p>
                <p>Участвовало: {olympiad.students_count}</p>
                <p>Чемпион: </p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Этапов : <span>{olympiad.steps_count}</span></p>
                <ButtonLink
                    block
                    type="default"
                    to={`olympiad/${olympiad.id}`}
                >
                    Подробнее
                </ButtonLink>
            </div>
        )}
    </>;
};

export default Pasts;