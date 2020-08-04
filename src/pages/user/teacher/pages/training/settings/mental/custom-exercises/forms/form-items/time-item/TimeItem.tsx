import React from 'react';
import {FormItem} from "lib/components";
import Stepper from "lib/components/stepper/Stepper";

interface TimeItemProps {
    typeTask: string;
}

const TimeItem: React.FC<TimeItemProps> = ({typeTask}) => {
    return <FormItem
        label={`Время (${typeTask === 'basic' ? 'Секундах' : 'Минутах'})`}
        name="time"
        size="large"
        requiredMsg="Введите время!"
    >
        <Stepper min={typeTask === 'basic' ? 0.2 : 1} max={10} step={typeTask === 'basic' ? 0.1 : 1}/>
    </FormItem>;
};

export default React.memo(TimeItem);