import React from 'react';
import {Tag} from "antd";
import {ButtonLink} from "../../../../../../../../../lib";

interface FuturesProps {
    olympiads: any[];
}

const Futures: React.FC<FuturesProps> = ({olympiads}) => {
    return <>
        {olympiads.map((olympiad) =>
            <>
                <p>{olympiad.title}</p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Дата начало: {olympiad.current_step.start_at}</p>
                <p>Этапов : <span>{olympiad.steps_count}</span></p>
                <ButtonLink
                    block
                    type="default"
                    to={`olympiad/${olympiad.id}`}
                >
                    Подробнее
                </ButtonLink>
            </>
        )}
    </>;
};

export default Futures;