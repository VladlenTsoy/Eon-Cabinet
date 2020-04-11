import React, {useState} from 'react';
import {Card} from "lib";
import { FlagOutlined } from '@ant-design/icons';
import {Button, Modal} from "antd";
import Timer from "react-compound-timer";
import moment from "moment";
import styled from "styled-components";
import Fire from "../../../../../../../../lib/fire/Fire";
import {useSelector} from "react-redux";

const CardWrapper = styled(Card)`
  &.ant-card {
    .ant-card-body {
      text-align: center;
      
      .sub-title{
        padding: 0 1rem;
        font-size: 16px;
        margin-bottom: 2rem;
      }
      
      .timer-fire{
        position: relative;
        
        .timer{
          position: absolute;
          left: 0;
          right: 0;
          top: calc(50% - 22.5px);
          color: ${props => props.theme.color_black};
          font-size: 25px;
          font-weight: 900;
          text-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        }
      }
      
      .sub-text{
        color: ${props => props.theme.color_second};
      }
    }
  }
`;

interface CardPublicProps {
    olympiad: any;
    callback: () => void;
}

const CardPublic: React.FC<CardPublicProps> = ({olympiad, callback}) => {
    const {api} = useSelector((state: any) => (state));
    const currentTime = moment().valueOf();
    const [loading, setLoading] = useState(false);

    const clickParticipateHandler = async () => {
        setLoading(true);
        await api.user_general.post(`/student/olympiad/${olympiad.id}/participation`);
        setLoading(false);
        Modal.success({
            title: 'Поздравляем!',
            content: `Вы участвуюте в открытой олимпиаде (${olympiad.title}), желаем удачи!`,
            onOk() {
                alert(1);
            }
        });
    };

    return (
        <CardWrapper>
            <Card.Title title={olympiad.title} level={3}/>

            <p className="sub-title">
                {olympiad.is_current ? 'Осталось до завершения олимпиады:' : 'Идет набор'}
            </p>
            <div className="timer-fire">
                <Fire/>
                <div className="timer">
                    <Timer
                        formatValue={(value: any) => value < 10 ? `0${value}` : value}
                        initialTime={moment(olympiad.end_at).valueOf() - currentTime}
                        direction="backward"
                        checkpoints={[
                            {
                                time: 1000,
                                callback: callback,
                            }
                        ]}
                    >
                        <Timer.Days/> д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                    </Timer>
                </div>
            </div>
            <p className="sub-text">
                {olympiad.is_current ? 'Олипиада уже началась, поспешите' : 'Идет набор'}
            </p>
            <Button
                block
                loading={loading}
                icon={<FlagOutlined />}
                type="primary"
                onClick={clickParticipateHandler}
            >
                Участвовать
            </Button>
        </CardWrapper>
    );
};

export default CardPublic;