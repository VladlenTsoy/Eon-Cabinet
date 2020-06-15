import React from 'react';
import styled from "styled-components";
import {Tag} from "antd";
import {ButtonLink} from "../../../../../../../../../lib";
import Timer from "react-compound-timer";
import moment from "moment";

const OlympiadStyled = styled.div`

`;

interface CurrentsProps {
    olympiads: any[];
}

const Currents: React.FC<CurrentsProps> = ({olympiads}) => {
    return <>
        {olympiads.map((olympiad) =>
            <OlympiadStyled>
                <p>{olympiad.title}</p>
                <Timer
                    formatValue={(value: any) => value < 10 ? `0${value}` : value}
                    initialTime={moment(olympiad.current_step.end_at).valueOf() - moment().valueOf()}
                    direction="backward"
                    checkpoints={[
                        {
                            time: 1000,
                            callback: () => null,
                        }
                    ]}
                >
                    <Timer.Days/>д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                </Timer>
                <p>Этап: <span>{olympiad.current_step.step + 1} из {olympiad.steps_count}</span></p>
                <p>Доступ: {olympiad.access === 'public' ?
                    <Tag color="#5cb860">Открытый</Tag> :
                    olympiad.access === 'invite' ?
                        <Tag color="#ff9800">Запрос</Tag> :
                        <Tag color="#f55a4e">Закрытый</Tag>}
                </p>
                <p>Участвующих: <span>{olympiad.students_count}</span></p>
                <ButtonLink
                    block
                    type="default"
                    to={`olympiad/${olympiad.id}`}
                >
                    Подробнее
                </ButtonLink>
            </OlympiadStyled>
        )}
    </>;
};

export default Currents;