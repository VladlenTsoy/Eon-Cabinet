import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import {Card, LoadingBlock} from "lib";
import moment from "moment";
import Timer from "react-compound-timer";

interface NextStepProps {
    loading: boolean;
    resultData: any;
}

const NextStep:React.FC<NextStepProps> = ({loading, resultData}) => {
    return (
        <Card className="info">
            <div className="title">До следующего этапа</div>
            <div className="container">
                <div className="icon">
                    <ClockCircleOutlined />
                </div>
                {
                    loading ?
                        <LoadingBlock title={null}/> :
                        <div className="content timer">
                            {
                                moment(resultData.end_at).valueOf() > moment().valueOf() ?
                                    <Timer
                                        formatValue={(value: any) => value < 10 ? `0${value}` : value}
                                        initialTime={moment(resultData.end_at).valueOf() - moment().valueOf()}
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
                }
            </div>
        </Card>
    );
};

export default React.memo(NextStep);