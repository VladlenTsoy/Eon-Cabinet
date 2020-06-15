import React from 'react';
import styled from "styled-components";
import {Tag, Typography} from "antd";
import {ButtonLink} from "../../../../../../../../../lib";
import Timer from "react-compound-timer";
import moment from "moment";

const {Title} = Typography;

const OlympiadsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const OlympiadStyled = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  background: ${props => props.theme['@component-background']};
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
  gap: 0 1rem;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;

  .info{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

interface CurrentsProps {
    olympiads: any[];
}

const Currents: React.FC<CurrentsProps> = ({olympiads}) => {
    return <OlympiadsStyled>
        {olympiads.map((olympiad) =>
            <OlympiadStyled>
                <div>
                    img
                </div>
                <div className="content">
                    <Title level={3}>
                        {olympiad.title}
                        {olympiad.access === 'public' ?
                            <Tag color="#5cb860">Открытый</Tag> :
                            olympiad.access === 'invite' ?
                                <Tag color="#ff9800">Запрос</Tag> :
                                <Tag color="#f55a4e">Закрытый</Tag>}
                    </Title>
                    <div className="info">
                        <div>Осталось</div>
                        <div>Этап</div>
                        <div>Участвующих</div>
                        <div>
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
                        </div>
                        <div>{olympiad.current_step.step + 1} из {olympiad.steps_count}</div>
                        <div>{olympiad.students_count}</div>
                    </div>
                    <ButtonLink
                        block
                        type="default"
                        to={`olympiad/${olympiad.id}`}
                    >
                        Подробнее
                    </ButtonLink>
                </div>
            </OlympiadStyled>
        )}
    </OlympiadsStyled>;
};

export default Currents;