import React from 'react';
import moment from "moment";
import Timer from "react-compound-timer";

interface OlympiadTimerLeftProps {
    end: string;
    callback?: () => void;
}

const OlympiadTimerLeft: React.FC<OlympiadTimerLeftProps> = ({end, callback = () => null}) => {
    const formatAddZero = (value: any) => value < 10 ? `0${value}` : value;
    const initial = moment(end).valueOf() - moment().valueOf();
    const checkpoints = [{time: 1000, callback}];


    if (moment(end).subtract(1, 'days').isAfter())
        return <>
            <Timer
                initialTime={initial}
                direction="backward"
                checkpoints={checkpoints}
            >
                <Timer.Days/> дней
            </Timer>
        </>;

    return <>
        <Timer
            formatValue={formatAddZero}
            initialTime={initial}
            direction="backward"
            checkpoints={checkpoints}
        >
            <Timer.Hours/>
            <span className="space">:</span>
            <Timer.Minutes/><span
            className="space">:</span>
            <Timer.Seconds/>
        </Timer>
    </>
};

export default React.memo(OlympiadTimerLeft)