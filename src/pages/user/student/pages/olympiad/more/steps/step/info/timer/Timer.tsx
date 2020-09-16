import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import Timer from "react-compound-timer";
import BlockWrapper from "../layouts/block/Block";

interface TimerProps {
    step: any;
}

const TimerBlock:React.FC<TimerProps> = ({step}) => {
    return (
        <BlockWrapper>
            <div>
                <div className="icon">
                    <ClockCircleOutlined />
                </div>
            </div>
            <div className="content">
                <span className="title">Осталось</span>
                <div className="timer">
                    {
                        moment(step.end_at).valueOf() > moment().valueOf() ?
                            <Timer
                                formatValue={(value: any) => value < 10 ? `0${value}` : value}
                                initialTime={moment(step.end_at).valueOf() - moment().valueOf()}
                                direction="backward"
                                checkpoints={[
                                    {
                                        time: 1000,
                                        callback: () => {
                                        },
                                    }
                                ]}
                            >
                                <Timer.Days/> д. <Timer.Hours/>:<Timer.Minutes/>:<Timer.Seconds/>
                            </Timer> :
                            'Завершенно'
                    }
                </div>
            </div>
        </BlockWrapper>
    );
};

export default TimerBlock;